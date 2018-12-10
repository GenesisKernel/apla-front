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

import { Epic } from 'modules';
import { from, empty } from 'rxjs';
import { flatMap, map, catchError } from 'rxjs/operators';
import { modalShow } from 'modules/modal/actions';
import { debugContract } from '../actions';

const debugContractEpic: Epic = (action$, store, { api }) => action$.ofAction(debugContract).pipe(
    flatMap(action => {
        const client = api(store.value.auth.session);
        return from(client.getContract({ name: action.payload })).pipe(
            map(contract => modalShow({
                type: 'DEBUG_CONTRACT',
                params: {
                    contract: action.payload,
                    fields: contract.fields
                }
            })),
            catchError(() => empty())
        );
    })
);

export default debugContractEpic;