import axios from 'axios';
import * as apis from './apis';
import Dict = NodeJS.Dict;

export type Resp = {
    status: number,
    data: Dict<any>,
    msg: string
}
export const respOk = (d: Resp): boolean => d.status >= 0;

const client = axios.create({baseURL: apis.base_url});

export const authHeader = (tk: string | null | undefined) => {
    const token = tk || localStorage.getItem('token');
    return token ? `Bearer ${token}` : '';
}

export default client
