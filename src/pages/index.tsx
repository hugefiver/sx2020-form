import React from 'react';
import {useHistory} from 'react-router';
import {Helmet} from 'react-helmet';
import { Button } from '@material-ui/core';

import * as paths from '../utils/paths';

export function Index() {
    const router = useHistory();
    return (
        <>
            <Helmet>
                <title>调查问卷 - 首页</title>
            </Helmet>
            <div>
                <Button color={'primary'} variant={'contained'}
                        onClick={() => router.push(paths.register)}>
                    <span style={{padding: '0 10px'}}> 注册 </span>
                </Button>
                <Button color={'primary'} variant={'contained'}
                        onClick={() => router.push(paths.login)}>
                    <span style={{padding: '0 10px'}}> 登录 </span>
                </Button>
            </div>
        </>
    )
}

export default Index
