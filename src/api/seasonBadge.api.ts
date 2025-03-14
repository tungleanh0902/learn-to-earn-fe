import { create } from "zustand";
import { callApi } from "./helper"

export const createSeasonBadgeStore = create((set: any, get: any, next: any) => (
    {
        seasonBadge: {},
        checkBoughtSeasonBadge: false,
        itemAddress: String,
        tokenId: String,

        buyNft: async (
            data,
            token: String,
        ) => {
            await callApi('badge/buy_nft', "POST", data, (res) => {
                set({ checkBoughtSeasonBadge: true })
                set({ userInfo: res.data.user })
            }, token)
        },

        buyNftEvm: async (
            data,
            token: String,
        ) => {
            await callApi('badge/buy_nft_kaia', "POST", data, (res) => {
                set({ checkBoughtSeasonBadge: true })
                set({ userInfo: res.data.user })
            }, token)
        },

        checkThisSeasonBadge: async (token: String) => {
            let result
            await callApi('badge/check_badge', "POST", null, (res) => {
                set({ checkBoughtSeasonBadge: res.data.itemAddress != null ? true : false})
                set({ itemAddress: res.data.itemAddress})
                set({ tokenId: res.data.tokenId})
                result = res.data
            }, token)
            return result
        },

        currentSeasonBadge: async () => {
            let badge
            await callApi('badge/current_badge', "POST", null, (res) => {
                console.log(res);
                badge = res.data
                set({ seasonBadge: res.data })
            }, null)
            return badge
        },
    }))