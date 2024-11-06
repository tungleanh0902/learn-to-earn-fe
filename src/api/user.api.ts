import { create } from "zustand";
import { callApi } from "./helper"

export const createUserStore = create((set: any, get: any, next: any) => (
    {
        token: String,
        userInfo: {},
        checkedToday: Boolean,
        checkedYesterday: Boolean,
        leaderboard: {},
        login: async (telegramUserId: String) => {
            await callApi('user/login', "POST", {
                telegramUserId
            }, (res) => {
                console.log(res);
                set({ token: res.token })
                set({ userInfo: res.user })
            }, null)
            return get().token
        },

        checkIn: async () => {
            await callApi('user/daily', "POST", null, (res) => { }, get().token)
        },

        addRef: async (refCode: String) => {
            await callApi('user/doRef', "POST", { ref: refCode }, (res) => { }, get().token)
        },

        saveStreak: async (tx: String) => {
            await callApi('user/save_streak', "POST", { tx }, (res) => { }, get().token)
        },

        checkCheckinDaily: async () => {
            await callApi('user/check_daily', "GET", null, (res) => {
                console.log(res);
                set({ checkedToday: res.data })
            }, get().token)
        },

        checkCheckInYesterday: async () => {
            await callApi('user/check_yesterday', "GET", null, (res) => {
                console.log(res);
                set({ checkedToday: res.data })
            }, get().token)
        },

        getLeaderBoard: async () => {
            await callApi('user/leaderboard', "GET", null, (res) => {
                console.log(res);
                set({ Leaderboard: res.data })
            }, get().token)
        },

        connectWallet: async (data, token) => {
            await callApi('user/connect_wallet', "POST", data, (res) => {
                console.log(res);
            }, token)
        },
    }
))