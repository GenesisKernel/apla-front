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

import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { IWalletData } from 'genesis/api';
import { spacedHex, walletPublicData } from 'lib/format';
import QRCode from 'qrcode.react';
import CopyToClipboard from 'react-copy-to-clipboard';

import Modal, { IModalProps } from '../';

export interface ICopyWalletModalParams {
    wallet: IWalletData;
}

const CopyWalletModal: React.SFC<IModalProps<ICopyWalletModalParams>> = props => (
    <div>
        <Modal.Header>
            <FormattedMessage id="auth.wallet.share.long" defaultMessage="Share wallet" />
        </Modal.Header>
        <Modal.Body>
            <table className="table table-striped table-bordered table-hover preline mb0" style={{ maxWidth: 500 }}>
                <tbody>
                    <tr>
                        <td>
                            <FormattedMessage id="general.address" defaultMessage="Address" />
                        </td>
                        <td>{props.params.wallet.address}</td>
                    </tr>
                    <tr>
                        <td style={{ minWidth: 100 }}>
                            <FormattedMessage id="general.key.public" defaultMessage="Public key" />
                        </td>
                        <td>{spacedHex(props.params.wallet.publicKey)}</td>
                    </tr>
                    <tr>
                        <td>
                            <FormattedMessage id="auth.qrcode" defaultMessage="QR-Code" />
                        </td>
                        <td>
                            <div className="text-center">
                                <QRCode value={walletPublicData(props.params.wallet)} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="text-center">
                <CopyToClipboard text={walletPublicData(props.params.wallet)}>
                    <Button bsStyle="link">
                        <FormattedMessage id="general.clipboard.copy" defaultMessage="Copy to clipboard" />
                    </Button>
                </CopyToClipboard>
            </div>
        </Modal.Body>
        <Modal.Footer className="text-right">
            <Button type="button" bsStyle="primary" onClick={props.onClose}>
                <FormattedMessage id="close" defaultMessage="Close" />
            </Button>
        </Modal.Footer>
    </div>
);

export default CopyWalletModal;