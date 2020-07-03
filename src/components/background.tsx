import React from "react";

import '../public/styles/backgound.scss';

type BgProps = {
    url?: string
};

export const Background = ({url}: BgProps) => {
    return (
        <div className={'background'} style={url ? {backgroundImage: `url(${url})`} : {}}>
        </div>
    )
}