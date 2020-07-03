export const base = 'http://127.0.0.1:8081'

export const index = '/'

export const register = '/register'
export const login = '/login'

export const form_design = '/design'
export const form_response = (id: string) => `/form/${id}`
export const form_result = (id: string) => `/result/${id}`
