import React, {ReactChildren, ReactNode} from 'react';
import {Card, CardContent, Container, Grid, Typography, withStyles} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {GridJustification, GridItemsAlignment, GridDirection} from '@material-ui/core/Grid/Grid';

type Props = {
    children: ReactNode,
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false,
    justify?: GridJustification,
    alignItems?: GridItemsAlignment,
    fullScreen?: boolean,
    direction?: GridDirection
}

const _style = makeStyles({
    card: {
        position: 'relative',
        padding: 15,
    }
});

const MiddleCard = ({children, maxWidth, justify='center', alignItems='center',
                        fullScreen=true, direction='row'}: Props) => {
    const s = _style();
    return <Grid container justify={justify} alignItems={alignItems} direction={direction}
                 {...(fullScreen ? {style: {height: '100vh'}} : {})}>
        <Container maxWidth={maxWidth}>
            <Card className={s.card} style={{paddingBottom: 20}}>
                {children}
            </Card>
        </Container>
    </Grid>
};

export default MiddleCard;
