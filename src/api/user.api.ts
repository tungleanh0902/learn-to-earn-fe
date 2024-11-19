import { create } from "zustand";
import { callApi } from "./helper"

export const createUserStore = create((set: any, get: any, next: any) => (
    {
        token: String,
        userInfo: {},
        checkedToday: Boolean,
        checkedYesterday: Boolean,
        leaderboard: {},
        isApiLoading: Boolean,
        setApiLoading: async (isLoading: Boolean) => {
            set({ isApiLoading: isLoading })
        },
        updateUserInfo: async (user: any) => {
            set({ userInfo: user })
        },

        login: async (telegramUserId: string, username: string) => {
            await callApi('user/login', "POST", {
                telegramUserId,
                username
            }, (res) => {
                set({ token: res.token })
                set({ userInfo: res.user })
            }, null)
            return get().token
        },

        checkIn: async () => {
            let user
            await callApi('user/daily', "POST", null, (res) => {
                set({ checkedToday: true })
                set({ userInfo: res.data.user })
                user = res.data.user
            }, get().token)
            return user
        },

        addRef: async (userId: string, token) => {
            console.log(userId);
            await callApi('user/doRef', "POST", { ref: userId }, (res) => {
            }, token)
        },

        saveStreak: async (data) => {
            await callApi('user/save_streak', "POST", data, (res) => { 
                set({ userInfo: res.data.user }) 
            }, get().token)
        },

        checkCheckinDaily: async () => {
            await callApi('user/check_daily', "POST", null, (res) => {
                set({ checkedToday: res.data })
            }, get().token)
        },

        checkCheckInYesterday: async () => {
            await callApi('user/check_yesterday', "POST", null, (res) => {
                set({ checkedYesterday: res.data })
            }, get().token)
        },

        getLeaderBoard: async () => {
            await callApi('user/leaderboard', "POST", null, (res) => {
                set({ Leaderboard: res.data })
            }, get().token)
        },

        connectWallet: async (data) => {
            await callApi('user/connect_wallet', "POST", data, (res) => {
            }, get().token)
        },

        getMintBodyData: async (data) => {
            let bodyData
            await callApi('user/mint_body_data', "POST", data, (res) => {
                bodyData = res.data.body_data
            }, get().token)
            return bodyData
        },

        buyMoreQuizz: async (data) => {
            await callApi('user/buy_more_quizz', "POST", data, (res) => {
                set({ userInfo: res.data.user })
            }, get().token)
        },
    }
))