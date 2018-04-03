// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import { Action } from 'redux';
import { Epic } from 'redux-observable';
import * as actions from '../actions';
import { IRootState } from 'modules';
import { Observable } from 'rxjs';

const saveConstructorHistoryEpic: Epic<Action, IRootState> =
    (action$, store, { }) => action$.ofAction(actions.saveConstructorHistory.started)
        .flatMap(action => {
            const state = store.getState().editor;
            const tab = state.tabs[state.tabIndex].designer;
            const tabData = tab && tab.data || null;
            const tabHistory = tab && tab.history || null;

            // do not save history if template was not modified
            // if (tabData && tabData.pageTemplate === state.tabs[state.tabIndex].value) {
            //    return Observable.empty();
            // }

            let historyData = tabHistory && tabHistory.data || [];
            const jsonData = tabData && tabData.jsonData || [];

            const position = tabHistory && tabHistory.position || 0;

            if (position < historyData.length) {
                historyData = [...historyData.slice(0, position)];
            }

            const canUndo = position > 0;
            const canRedo = false;

            return Observable.of(actions.saveConstructorHistory.done({
                params: action.payload,
                result: {
                    data: historyData.concat([jsonData]),
                    position: position + 1,
                    canUndo,
                    canRedo
                }
            }));
        });

export default saveConstructorHistoryEpic;