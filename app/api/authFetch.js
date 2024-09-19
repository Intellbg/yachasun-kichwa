import { getToken } from '../lib/getToken';

const authFetch = async (url, options = {}) => {
    const token = getToken();
    if (!options.headers) {
        options.headers = new Headers();
    }
    options.headers.set('authorization', token);
    return await fetch(url, options);
};

export default authFetch;
