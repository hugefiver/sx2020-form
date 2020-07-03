import React, {ReactChildren, ReactNode} from 'react';
import {Card, CardContent, Container, Grid, Typography, withStyles} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

type Props = {
    children: ReactNode,
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false,
}

const _style = makeStyles({
    card: {
        position: 'relative',
        padding: 15,
    }
});

const MiddleCard = ({children, maxWidth}: Props) => {
    const s = _style();
    return <Grid container justify={'center'} alignItems={'center'} style={{height: '100vh'}}>
        <Container maxWidth={maxWidth}>
            <Card className={s.card} style={{paddingBottom: 20}}>
                {children}
            </Card>
        </Container>
    </Grid>
};

export default MiddleCard;
