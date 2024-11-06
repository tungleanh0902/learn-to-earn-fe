import { create } from "zustand";
import { callApi } from "./helper"

export const createSeasonBadgeStore = create((set: any, get: any, next: any) => (
    {
        seasonBadge: {},
        checkBoughtSeasonBadge: Boolean,

        buyNft: async (badgeId: String, tokenId: String, tx: String, itemAddress: String, explorerUrl: String, token: String) => {
            await callApi('quizz/buy_nft', "POST", {
                badgeId,
                tokenId,
                tx,
                itemAddress,
                explorerUrl
            }, (res) => {
                console.log(res);
                set({ checkBoughtSeasonBadge: true })
            }, token)
        },

        checkThisSeasonBadge: async (token: String) => {
            await callApi('quizz/check_badge', "GET", null, (res) => {
                console.log(res);
                set({ checkBoughtSeasonBadge: res.data })
            }, token)
        },

        currentSeasonBadge: async () => {
            await callApi('quizz/current_badge', "GET", null, (res) => {
                console.log(res);
                set({ seasonBadge: res.data })
            }, null)
        },
    }))