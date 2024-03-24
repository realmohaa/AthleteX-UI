
// API Constants
export const API_URL = 'http://192.168.0.165:3000';
export const API_TIMEOUT = 10000;
export const API_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    };
    
export const API_VERSION = 'v1';

const API_FULL = `${API_URL}/api/${API_VERSION}`;

export const LOGIN_ENDPOINT = `${API_FULL}/auth/login`;