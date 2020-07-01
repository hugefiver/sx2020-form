import React, { ReactChildren } from 'react';
import '../public/styles/center.scss';
import '@fluentui/react'

type Props = {
    children: ReactChildren
}

export const MiddleCenterCard = ({children}: Props) => (
    <div className={'horizontal-center vertical-center'}>
        {children}
    </div>
);

export const LargeCenterCard = ({children}: Props) => (
    <div className={'horizontal-center vertical-center'}>
        {children}
    </div>
);
