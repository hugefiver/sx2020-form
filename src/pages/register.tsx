import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {CardContent, Grid, TextField, Typography, CardActionArea, Button, Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {fromJS, Set} from 'immutable';

import {Background} from '../components/background';
import MiddleCard from '../components/middle-card';

import * as paths from '../utils/paths';
import * as apis from '../utils/apis';
import client, {Resp, respOk} from '../utils/client';
import sa from '../utils/sa';

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

interface Result {
    msg: string;
}

class OK implements Result{
    private readonly _msg: string

    get msg(): string {
        return this._msg;
    }

    constructor(msg='') {
        this._msg = msg
    }
}

class NO implements Result{
    private readonly _msg: string
    get msg(): string {
        return this._msg
    }
    constructor(msg: string) {
        this._msg = msg
    }
}
const _ok = new OK();
const ok = (v=''): OK => new OK(v);
const no = (v: string): NO => new NO(v);

type CheckResult = OK | NO
const isOk = (c: CheckResult): boolean => typeof c == typeof _ok;

const namePatt = () => /^[\w\-]{5,20}$/g
const emailPatt = () => /^(.)+@([\w\-_]+\.)+([\w\-_]*\w)$/g
const passwordPatt = () => /^([\da-zA-Z]){6,16}$/g

const checkName = (p: string): CheckResult => (namePatt().test(p) ? ok()
    : no('用户名必须是5-20位数字、字母、"-"、"_"符号'));
const checkEmail = (p: string): CheckResult => (emailPatt().test(p) ? ok() : no('请输入正确的邮箱'));
const checkPassword = (p: string): CheckResult => (passwordPatt().test(p) ? ok()
    : no('密码必须是6-16位数字、大小写字母'));

function addToSet<T> (s: Set<T>, v: T): Set<T> {
    // return s.has(v) ? s : s.add(v);
    return s.add(v)
}

export const Register = () => {
    const s = useStyle();

    let [name, setName] = useState<string>('');
    let [email, setEmail] = useState<string>('');
    let [secret, setSecret] = useState<string>('');
    let [clicked, setClicked] = useState<Set<string>>(Set<string>())

    const do_register = () => {
        const data = {name, email, secret,}
        client.post(apis.register, data)
            .then(({data}) => {
                if (respOk(data as Resp)){
                    console.log(data)
                    localStorage.setItem('id', data.data.id);
                    sa.fire(
                        '注册成功',
                        '注册成功，快去登录吧',
                        'success'
                    ).then(() => router.push(paths.login))
                } else {
                    sa.fire(
                        '注册失败',
                        `服务器说 "${data.msg}"`,
                        'error'
                    ).finally()
                }
            })
    }

    const okName = clicked.has('name') ? checkName(name) : ok();
    const okEmail = clicked.has('email') ? checkEmail(email) : ok();
    const okPassword = clicked.has('password') ? checkPassword(secret) : ok();

    const router = useHistory();

    return (
        <>
            <Background />
            <MiddleCard maxWidth={'sm'}>
                <CardContent>
                    <Grid justify={'center'} container>
                        <Typography className={s.title} component={'span'}> 注册 </Typography>
                    </Grid>
                </CardContent>
                <CardContent>
                    <Grid justify={'center'} alignItems={'center'} container style={{padding: 20}} >
                        <TextField id={'name'} key={'name'} label={'用户名'} variant={'outlined'}
                                   className={s.textField} value={name} required
                                   onChange={(e) => setName(e.target.value)}
                                   onBlur={() => setClicked(addToSet(clicked, 'name'))}
                                   error={!isOk(okName)}
                                   helperText={okName.msg}
                        />
                        <TextField id={'email'} key={'email'} label={'邮箱'} variant={'outlined'}
                                   className={s.textField} value={email} required
                                   onChange={(e) => setEmail(e.target.value)}
                                   onBlur={() => setClicked(addToSet(clicked, 'email'))}
                                   error={!isOk(okEmail)}
                                   helperText={okEmail.msg}
                        />
                        <TextField id={'secret'} key={'secret'} label={'密码'} variant={'outlined'}
                                   className={s.textField} type={'password'} value={secret} required
                                   onChange={(e) => setSecret(e.target.value)}
                                   onBlur={() => setClicked(addToSet(clicked, 'password'))}
                                   error={!isOk(okPassword)}
                                   helperText={okPassword.msg}
                        />
                    </Grid>
                </CardContent>
                <CardContent>
                    <Grid justify={'center'} alignItems={'baseline'}
                          container direction={'row'} spacing={6}>
                        <Grid item xs={4}>
                            <Grid container justify={'center'}>
                                <Button color={'primary'} variant={'contained'} fullWidth
                                        onClick={do_register}>
                                    <span style={{padding: 10}}>注册</span>
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container justify={'center'}>
                                <Button color={'secondary'} variant={'outlined'} fullWidth
                                        onClick={() => router.push(paths.login)}>
                                    <span style={{padding: 10}}>登录</span>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </MiddleCard>
        </>
    )
}

export default Register
