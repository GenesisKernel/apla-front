// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import { Validator } from './Validators';
import * as propTypes from 'prop-types';
import { readBinaryFile } from 'lib/fs';

import ImageEditor from 'containers/Widgets/ImageEditor';
import ValidatedForm, { IValidatedControl } from './ValidatedForm';

export interface IValidatedImageProps {
    format: 'png' | 'jpg' | 'jpeg';
    name: string;
    value?: string;
    aspectRatio?: number;
    width?: number;
    validators?: Validator[];
}

interface IValidatedImageState {
    value: string;
    filename: string;
}

export default class ValidatedImage extends React.Component<IValidatedImageProps, IValidatedImageState> implements IValidatedControl {
    private _inputRef: HTMLInputElement = null;
    private _value: string = '';

    constructor(props: IValidatedImageProps) {
        super(props);
        this.state = {
            value: '',
            filename: ''
        };
    }

    componentDidMount() {
        if (this.context.form) {
            (this.context.form as ValidatedForm)._registerElement(this.props.name, this);
        }
    }

    componentWillUnmount() {
        if (this.context.form) {
            (this.context.form as ValidatedForm)._unregisterElement(this.props.name);
        }
    }

    componentWillReceiveProps(props: IValidatedImageProps) {
        if (this.props.value !== props.value) {
            this.setState({
                value: props.value as string,
                filename: props.value ? this.state.filename : ''
            });
            (this.context.form as ValidatedForm).updateState(props.name, props.value);
        }
    }

    getValue() {
        return this._value;
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files.length) {
            const file = e.target.files[0];
            readBinaryFile(file).then(r => {
                this.setState({
                    value: r,
                    filename: file.name
                });
            });
        }
        e.target.value = '';
    }

    onBrowse() {
        this._inputRef.click();
    }

    onBlur(e: React.FocusEvent<FormControl>) {
        (this.context.form as ValidatedForm).updateState(this.props.name);
    }

    onResult(data: string) {
        this._value = data;
    }

    resolveMIME() {
        switch (this.props.format) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';

            default:
                return 'image/png';
        }
    }

    render() {
        return (
            <div className="input-group">
                <ImageEditor
                    mime={this.resolveMIME()}
                    data={this.state.value}
                    aspectRatio={this.props.aspectRatio}
                    width={this.props.width}
                    onResult={this.onResult.bind(this)}
                />
                <FormControl
                    className="hidden"
                    onChange={this.onChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    inputRef={ref => this._inputRef = ref}
                    type="file"
                    noValidate
                />
                <input type="text" className="form-control" readOnly value={this.state.filename} />
                <div className="group-span-filestyle input-group-btn">
                    <button className="btn btn-default" style={{ border: 'solid 1px #dde6e9' }} type="button" onClick={this.onBrowse.bind(this)}>
                        <span className="text-muted icon-span-filestyle glyphicon glyphicon-folder-open" />
                        <span className="buttonText" />
                    </button>
                </div>
            </div>
        );
    }
}

(ValidatedImage as React.ComponentClass).contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};