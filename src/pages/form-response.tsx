import {Background} from '../components/background';
import {
    Button,
    CardContent,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@material-ui/core';
import MiddleCard from '../components/middle-card';
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import {useHistory} from 'react-router';

const useStyle = makeStyles({
    title: {
        fontSize: 'xx-large'
    },
    question: {
        paddingLeft: 20,
        fontSize: 'large'
    },
    sm: {
        padding: '5px 20px'
    }
});

export const FormResponse = () => {
    const s = useStyle();
    const router = useHistory();

    let [v1, setV1] = useState<String>('');

    return (
        <>
            <Background />
            <Grid container direction={'column'} spacing={2}>
                <Grid item>
                    <MiddleCard maxWidth={'md'} fullScreen={false}>
                        <CardContent>
                            <Grid justify={'center'} container>
                                <TextField value={v1} label={'问卷标题'}
                                           onChange={(e) => setV1(e.target.value)} />
                            </Grid>
                        </CardContent>
                    </MiddleCard>
                </Grid>
                <Grid item>
                    <MiddleCard maxWidth={'md'} fullScreen={false}>
                        <CardContent className={s.sm}>
                            <Grid justify={'flex-start'} container >
                                <Typography variant={'inherit'} className={s.question}><p>
                                    <span>1. </span> <span>第一题</span>
                                </p></Typography>
                            </Grid>
                        </CardContent>
                        <CardContent className={s.sm}>
                            <Grid justify={'flex-start'} container style={{padding: 20}} >
                                <FormControl >
                                        <FormControlLabel value={'A'} control={<TextField />} />
                                        <FormControlLabel value={'B'} control={<TextField />} />
                                        <FormControlLabel value={'C'} control={<TextField />} />
                                        <FormControlLabel value={'D'} control={<TextField />} />
                                </FormControl>
                            </Grid>
                        </CardContent>
                    </MiddleCard>
                </Grid>
                <Grid item>
                    <MiddleCard maxWidth={'md'} fullScreen={false}
                                alignItems={'center'} >
                        <CardContent className={s.sm}>
                            <Button color={'primary'} variant={'contained'}>
                                <span>提交</span>
                            </Button>
                        </CardContent>

                    </MiddleCard>
                </Grid>
            </Grid>
        </>
    )
}
