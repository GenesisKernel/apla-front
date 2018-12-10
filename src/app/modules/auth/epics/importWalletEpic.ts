// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { Action } from 'redux';
import { Epic } from 'modules';
import { importWallet } from '../actions';
import { navigate } from 'modules/engine/actions';
import { address, addressString } from 'lib/crypto';
import keyring from 'lib/keyring';
import { flatMap } from 'rxjs/operators';
import { of } from 'rxjs';

const importWalletEpic: Epic = (action$) => action$.ofAction(importWallet.started).pipe(
    flatMap(action => {
        if (!action.payload.backup || action.payload.backup.length !== keyring.KEY_LENGTH) {
            return of(importWallet.failed({
                params: action.payload,
                error: 'E_INVALID_KEY'
            }));
        }

        const privateKey = action.payload.backup;
        const publicKey = keyring.generatePublicKey(action.payload.backup);
        const encKey = keyring.encryptAES(privateKey, action.payload.password);
        const keyID = address(publicKey);

        return of<Action>(
            importWallet.done({
                params: action.payload,
                result: {
                    id: keyID,
                    encKey,
                    publicKey,
                    address: addressString(keyID),
                    settings: {}
                }
            }),
            navigate('/')
        );
    })
);

export default importWalletEpic;