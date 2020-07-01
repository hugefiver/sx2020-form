import React, {useState} from "react";
import {Stack, IStackTokens, IStackStyles} from '@fluentui/react/lib/Stack';
import {TextField} from '@fluentui/react/lib-commonjs/TextField';

import {Background} from "../components/background";

export default function Register() {
    let [name, setName] = useState<string>();

    return (
        <>
            <Background />
            <Stack verticalAlign='center'
                   horizontalAlign='center'
                   style={{maxWidth: '443px', maxHeight: '60vh'}}>
                <Stack.Item align='center'>
                    <TextField label='用户名' placeholder='用户名'
                               onChange={(_, v) => setName(v)}/>
                </Stack.Item>
            </Stack>
        </>
    )
}
