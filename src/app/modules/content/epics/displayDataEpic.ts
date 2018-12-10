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
import { displayData } from 'modules/content/actions';
import { modalShow } from 'modules/modal/actions';
import urlJoin from 'url-join';
import { flatMap, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';

const displayDataEpic: Epic = (action$, store) => action$.ofAction(displayData.started).pipe(
    flatMap(action => {
        return ajax({
            url: urlJoin(store.value.auth.session.apiHost, 'api/v2', action.payload),
            responseType: 'text'

        }).pipe(
            flatMap(payload => of(
                modalShow({
                    type: 'INFO',
                    params: {
                        value: payload.response
                    }
                }),
                displayData.done({
                    params: action.payload,
                    result: payload.response
                })

            )),
            catchError(e => of(displayData.failed({
                params: action.payload,
                error: e
            })))
        );
    })
);

export default displayDataEpic;