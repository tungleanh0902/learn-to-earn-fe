import { create } from "zustand";
import { callApi } from "./helper"

export const createVoucherStore = create((set: any, get: any, next: any) => (
    {
        vouchers: [],
        availableVoucher: 0,
        listing: [],
        
        buyVoucher: async (data, token) => {
            let bodyData
            await callApi('voucher/buy_voucher', "POST", data, (res) => {
                console.log(res);
                bodyData = res.data
            }, token)
            return bodyData
        },

        buyVoucherEvm: async (data, token) => {
            let bodyData
            await callApi('voucher/buy_voucher_kaia', "POST", data, (res) => {
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

        getAvailableVouchers: async (token) => {
            await callApi('voucher/get_available_vouchers', "POST", null, (res) => {
                set({ availableVoucher: res.data.vouchers.length })
            }, token)
        },

        doGetTxs: async () => {
            let data
            await callApi('voucher/get_voucher_tx', "POST", null, (res) => {
                data = res.data               
            }, null)
            return data
        },

        doGetListing: async (token) => {
            await callApi('voucher/get_listing', "POST", null, (res) => {
                set({listing: res.data})       
            }, token)
        },

        doCancelListing: async (data, token) => {
            await callApi('voucher/cancel_listing', "POST", data, (res) => {
                set({listing: res.data.sellingLicense})
                set({vouchers: res.data.voucherHistory}) 
            }, token)
        },

        doListLicense: async (data, token) => {
            await callApi('voucher/list_for_sale', "POST", data, (res) => {
                set({listing: res.data.sellingLicense})
                set({vouchers: res.data.voucherHistory})            
            }, token)
        }
    }))