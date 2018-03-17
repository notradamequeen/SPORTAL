import swal from 'sweetalert';
import { spmfcloudFunctionUrl } from '../../actions/salesforces';


export default null;

export const login = async (username, password, siteToken) => {
    const json = await fetch(`${spmfcloudFunctionUrl}/login`, {
        mode: 'cors',
        body: JSON.stringify({
            username,
            password,
        }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': siteToken,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
    if (json.status === 200) {
        return {
            type: 'LOGGED_IN',
            payload: json.user,
        };
    }
    swal({
        title: 'USER NOT FOUND',
        text: 'Your username or password combination is wrong.',
    });
    return {
        type: 'LOGGED_IN',
        payload: null,
    };
};
