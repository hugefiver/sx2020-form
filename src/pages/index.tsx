import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import {Helmet} from 'react-helmet';
import { Button } from '@material-ui/core';

import * as paths from '../utils/paths';
import client, {authHeader, Resp, respOk} from '../utils/client';
import * as apis from '../utils/apis';

const logout = () => {
    localStorage.removeItem('token');
    location.reload();
}


export function Index() {
    const router = useHistory();
    const token = localStorage.getItem('token');

    let [isLogged, setLogged] = useState<boolean>(false);

    useEffect(() => {
        if (!token) return;

        client.get(apis.check, {
            headers: {...authHeader(token)}
        }).then(({data}) => {
            if (respOk(data as Resp)) {
                const user = data.data.user;
                localStorage.setItem('id', user.id);
                localStorage.setItem('name', user.name)
                setLogged(true)
            }
        }).catch(()=>{})
    }, [token])


    return (
        <>
            <Helmet>
                <title>调查问卷 - 首页</title>
            </Helmet>
            <div>
                <Button color={'primary'} variant={'contained'}
                        style={{margin: 20}}
                        onClick={() => router.push(paths.register)}>
                    <span style={{padding: '0 10px'}}> 注册 </span>
                </Button>
                <Button color={'primary'} variant={'contained'}
                        style={{margin: 20}}
                        onClick={() => router.push(paths.login)}>
                    <span style={{padding: '0 10px'}}> 登录 </span>
                </Button>
                {isLogged ?
                    <Button color={'primary'} variant={'contained'}
                            style={{margin: 20}}
                            onClick={logout}>
                        <span style={{padding: '0 10px'}}> 退出登录 </span>
                    </Button> : <></>
                }
            </div>
            <div>
                <Button color={'inherit'} variant={'contained'}
                        style={{margin: 20}}
                        onClick={() => router.push(paths.form_design)}>
                    <span style={{padding: '0 10px'}}> 创建表单 </span>
                </Button>
                <Button color={'inherit'} variant={'contained'}
                        style={{margin: 20}}
                        onClick={() => router.push(paths.form_response('1'))}>
                    <span style={{padding: '0 10px'}}> 填写表单 </span>
                </Button>
            </div>
        </>
    )
}

export default Index
