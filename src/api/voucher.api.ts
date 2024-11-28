import { create } from "zustand";
import { callApi } from "./helper"

export const createVoucherStore = create((set: any, get: any, next: any) => (
    {
        vouchers: [],
        
        buyVoucher: async (data, token) => {
            let bodyData
            await callApi('voucher/buy_voucher', "POST", data, (res) => {
                console.log(res);
                bodyData = res.data
            }, token)
            return bodyData
        },

        getVouchers: async (token) => {
            await callApi('voucher/get_vouchers', "POST", null, (res) => {
                console.log(res);
                set({ vouchers: res.data })
            }, token)
        },
    }))