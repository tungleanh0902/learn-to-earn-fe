import addNotification from 'react-push-notification';
import axios from "axios";

export const callApi = async (url, method, data, callback, token) => {
    return axios({
        url: `${import.meta.env.VITE_URL_API}/${url}`,
        method: method,
        data,
        headers: { Authorization: token },
    })
        .then(function (res) {
            callback(res.data)
            // if (typeof res.data?.points == "number") {
            //     addNotification({
            //         title: 'Success',
            //         message: res.data?.points,
            //         theme: 'light',
            //     })
            // } else {
            //     // success("Success")
            // }
        })
        .catch(function (err) {
            console.log(err);
            if (err) {
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                ) {
                    return addNotification({
                        title: 'Error',
                        message: err.response.data.message,
                        theme: 'red',
                    })
                } else if (err.response) {
                    return addNotification({
                        title: 'Error',
                        message: err.response.statusText,
                        theme: 'red',
                    })
                }
            }
        });
};

export const createTransaction = (receiver: string, amount: string, payload: string) => {
    console.log(payload);
    return {
        // The transaction is valid for 10 minutes from now, in unix epoch seconds.
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
            {
                // The receiver's address.
                address: receiver,
                // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
                amount: amount,
                // (optional) State initialization in boc base64 format.
                //   stateInit:
                //   "te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==",
                // (optional) Payload in boc base64 format.
                payload,
            },
        ],
    };
}