import {join as path_join} from 'path';
import compileStreaming = WebAssembly.compileStreaming;

export const base_url = 'http://127.0.0.1:8080/api'

export const get_api = (path: string): string => path_join(base_url, path)

// Auth
export const login = '/auth/login'
export const register = '/auth/register'
