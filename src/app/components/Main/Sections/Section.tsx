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
import { IPage } from 'genesis/content';

import Page from 'components/Main/Page';
import Stack from 'components/Animation/Stack';
import Breadcrumbs from 'components/Main/Sections/Breadcrumbs';
import themed from 'components/Theme/themed';

export interface ISectionProps {
    name: string;
    pages: IPage[];
}
const StyledContent = themed.section`
    && { background: ${props => props.theme.contentBackground}; }
    color: ${props => props.theme.contentForeground};
    transition: none !important;
    display: flex;
    flex-direction: column;
    flex: 1;

    .content-page {
        background: #fff;
        height: 100%;
        flex-direction: column;
    }
`;

const Section: React.SFC<ISectionProps> = (props) => (
    <div className="fullscreen">
        <StyledContent>
            <Breadcrumbs pages={props.pages} />
            <div className="flex-stretch" style={{ position: 'relative' }}>
                <Stack
                    items={(props.pages || []).map(page => (
                        <div key={page.location.key} className="content-page">
                            <Page value={page} section={props.name} />
                        </div>
                    ))}
                />
            </div>
        </StyledContent>
    </div>
);

export default Section;