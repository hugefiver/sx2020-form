import React, {useState} from 'react';
import {
    Button,
    CardContent,
    Grid,
    RadioGroup,
    TextField,
    Typography,
    FormControl,
    FormControlLabel, Radio
} from '@material-ui/core';
import {useHistory} from 'react-router';

import {Background} from '../components/background';
import MiddleCard from '../components/middle-card';
import * as paths from '../utils/paths';
import {makeStyles} from '@material-ui/styles';

const useStyle = makeStyles({
    title: {
        fontSize: 'xx-large'
    },
    question: {
        paddingLeft: 20,
        fontSize: 'large'
    },
    sm: {
        padding: '2px 20px'
    }
});

export const FormDesign = () => {
    const router = useHistory()
    const s = useStyle();

    let [v1, setV1] = useState<String>('');

    return (
        <>
            <Background />
            <Grid container direction={'column'} spacing={2}>
                <Grid item>
                    <MiddleCard maxWidth={'md'} fullScreen={false}>
                        <CardContent>
                            <Grid justify={'center'} container>
                                <Typography className={s.title} component={'span'}> 关于关于关于关于明天几点吃饭的问卷的问卷的问卷的问卷 </Typography>
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
                                    <RadioGroup value={'v1'} onChange={(e) => setV1(e.target.value)}>
                                        <FormControlLabel label={'A. 答案 1'} control={<Radio />} value={'A'} />
                                        <FormControlLabel label={'B. 答案 2'} control={<Radio />} value={'B'} />
                                        <FormControlLabel label={'C. 答案 3'} control={<Radio />} value={'C'} />
                                        <FormControlLabel label={'D. 答案 4'} control={<Radio />} value={'D'} />
                                    </RadioGroup>
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

export default FormDesign
