import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import {Button, CardContent, Grid, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {Background} from '../components/background';
import MiddleCard from '../components/middle-card';
import * as paths from '../utils/paths';
import * as apis from '../utils/apis';
import client, {authHeader, Resp, respOk} from '../utils/client';
import sa from '../utils/sa';
import {index} from '../utils/paths';


const useStyle = makeStyles({
    container: {
        padding: 20,
        position: 'relative',
    },
    title: {
        fontSize: 'xx-large'
    },
    textField: {
        width: '80%',
        margin: '15px 0',
    }
});

export const Login = () => {
    const s = useStyle();
    const router = useHistory();

    // check if logged
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return;
        client.get(apis.check, {
            headers: {
                ...authHeader()
            }
        }).then(({data}) => {
            if (respOk(data as Resp)) {
                const user = data.data.user;
                localStorage.setItem('id', user.id);
                localStorage.setItem('name', user.name)
                sa.fire(
                    '已登录',
                    '您已登录，马上就跳转到首页',
                    'info'
                ).then(() => {
                    router.push(index)
                })
            }
        }).catch(() => {})
    }, [])



    let [name, setName] = useState<string>('');
    let [password, setPassword] = useState<string>('');


    const do_login = () => {
        if (name === '' || password === '') {
            sa.fire(
                '输入错误',
                '用户名、密码不能为空',
                'error'
            ).finally()
            return
        }
        client.post(apis.login, {name, password}).then(({data}) => {
            if (respOk(data as Resp)) {
                const user = data.data.user;
                const token = data.data.token;
                localStorage.setItem('token', token)
                localStorage.setItem('id', user.id)
                localStorage.setItem('name', user.name)
                sa.fire(
                    '登录成功',
                    '即将跳转到首页',
                    'success'
                ).then(() => router.push(index))
            } else {
                sa.fire(
                    '登录失败',
                    `服务器说 "${data.msg}"`,
                    'error'
                ).finally()
            }
        })
    }

    return (
        <>
            <Background />
            <MiddleCard maxWidth={'sm'}>
                <CardContent>
                    <Grid justify={'center'} container>
                        <Typography className={s.title} component={'span'}> 登录 </Typography>
                    </Grid>
                </CardContent>
                <CardContent>
                    <form>
                        <Grid justify={'center'} alignItems={'center'} container style={{padding: 20}} >
                            <TextField id={'name'} key={'name'} label={'用户名'} variant={'outlined'}
                                       className={s.textField} value={name} required
                                       onChange={(e) => setName(e.target.value)}
                            />
                            <TextField id={'password'} key={'password'} label={'密码'} variant={'outlined'}
                                       className={s.textField} type={'password'} value={password} required
                                       onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </form>
                </CardContent>
                <CardContent>
                    <Grid justify={'center'} alignItems={'baseline'}
                          container direction={'row'} spacing={6}>
                        <Grid item xs={4}>
                            <Grid container justify={'center'}>
                                <Button color={'primary'} variant={'contained'} fullWidth
                                        onClick={do_login}>
                                    <span style={{padding: 10}}>登录</span>
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container justify={'center'}>
                                <Button color={'secondary'} variant={'outlined'} fullWidth
                                        onClick={() => router.push(paths.register)}>
                                    <span style={{padding: 10}}>注册</span>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </MiddleCard>
        </>
    )
}

export default Login