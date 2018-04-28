import {
    AUTH_GET_PERMISSIONS,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_ERROR,
    AUTH_CHECK,
} from 'admin-on-rest'; // eslint-disable-line import/no-unresolved

// TODO: - remove this
const URL = "http://localhost:3000"

// Authenticatd by default
const authClientFactory = (apiUrl) => {
    return (type, params) => {
        if (type === AUTH_LOGIN) {
            const { username, password } = params;
            const request = new Request(`${apiUrl}/api/signin`, {
                method: 'POST',
                body: JSON.stringify({
                    data: {
                        type: "email_credentials",
                        attributes: {
                            email: username,
                            password: password,
                        }
                    }
                }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            })
            return fetch(request)
                .then(response => {
                    if (response.status < 200 || response.status >= 300) {
                        return response.json().then((body) => {
                            if (body.error) {
                                throw new Error(body.error);
                            }
                            throw new Error(response.statusText);
                        });
                    }
                    return response.json();
                })
                .then((response) => {
                    localStorage.setItem('token', response.data.id);
                });
        }
        return Promise.resolve();
    };
};

export default authClientFactory(URL);