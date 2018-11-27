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

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { login, selectWallet } from 'modules/auth/actions';
import { navigate } from 'modules/engine/actions';
import { IWallet } from 'genesis/auth';
import { IWalletData } from 'genesis/api';
import { modalShow } from 'modules/modal/actions';

import WalletList from 'components/Auth/Login/WalletList';

const mapStateToProps = (state: IRootState) => ({
    wallets: state.storage.wallets.sort((a, b) => a.address > b.address ? 1 : -1).map(wallet => ({
        access: [],
        ...wallet,
        ...state.auth.wallets.find(l => l.id === wallet.id),
    })) as (IWallet & IWalletData)[],
    notifications: state.socket.notifications,
    activationEmail: state.engine.activationEmail
});

export default connect(mapStateToProps, {
    onRemove: (wallet: IWalletData) => modalShow({
        type: 'REMOVE_WALLET',
        params: {
            wallet
        }
    }),
    onLogin: login.started,
    onSelect: selectWallet,
    onCopy: (wallet: IWalletData) => modalShow({
        type: 'COPY_WALLET',
        params: {
            wallet
        }
    }),
    onRegister: (wallet: IWalletData, activationEmail: string) => modalShow({
        type: 'REGISTER_WALLET',
        params: {
            wallet,
            activationEmail
        }
    }),
    onCreate: () => navigate('/wallet')

}, (state, dispatch, props) => ({
    ...props,
    wallets: state.wallets,
    notifications: state.notifications,
    activationEnabled: !!state.activationEmail,
    onLogin: dispatch.onLogin,
    onSelect: dispatch.onSelect,
    onCopy: dispatch.onCopy,
    onCreate: dispatch.onCreate,
    onRemove: dispatch.onRemove,
    onRegister: (wallet: IWalletData) => dispatch.onRegister(wallet, state.activationEmail || '')

}))(WalletList);