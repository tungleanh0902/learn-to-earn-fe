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
            if (typeof res.data?.points == "number") {
                addNotification({
                    title: 'Success',
                    message: res.data?.points,
                    theme: 'light',
                })
            } else {
                // success("Success")
            }
        })
        .catch(function (err) {
            console.log(err);
            if (err) {
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                ) {
                    addNotification({
                        title: 'Error',
                        message: err.response.data.message,
                        theme: 'red',
                    })
                } else if (err.response) {
                    addNotification({
                        title: 'Error',
                        message: err.response.statusText,
                        theme: 'red',
                    })
                }
            }
        });
};