import { success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

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
            if (typeof res.data == "number") {
                success(`${res.data} points`)
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
                    error({
                        title: "Error",
                        text: err.response.data.message,
                        destroy: true,
                        delay: 3000
                    });
                } else if (err.response) {
                    error({
                        title: "Error",
                        text: err.response.statusText,
                        destroy: true,
                        delay: 3000
                    });
                }
            }
        });
};