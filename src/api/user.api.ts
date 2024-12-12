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

        loginEvm: async (evmAddress: string) => {
            await callApi('user/login_evm', "POST", {
                evmAddress,
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

        getUserInfo: async (userId: string) => {
            let data
            await callApi('user/user_info', "POST", { userId: userId }, (res) => {
                data = res.data.user
            }, get().token)
            return data
        },

        saveStreak: async (data) => {
            await callApi('user/save_streak', "POST", data, (res) => { 
                set({ userInfo: res.data.user }) 
            }, get().token)
        },

        saveStreakEvm: async (data) => {
            await callApi('user/save_streak_kaia', "POST", data, (res) => { 
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
                set({ leaderboard: res.data })
            }, get().token)
        },

        connectWallet: async (data) => {
            await callApi('user/connect_wallet', "POST", data, (res) => {
            }, get().token)
        },

        connectWalletEvm: async (data) => {
            await callApi('user/connect_evm_wallet', "POST", data, (res) => {
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

        buyMoreQuizzEvm: async (data) => {
            await callApi('user/buy_more_quizz_kaia', "POST", data, (res) => {
                set({ userInfo: res.data.user })
            }, get().token)
        },

        checkTop10: async () => {
            let bodyData
            await callApi('user/check_current_rank', "POST", null, (res) => {
                bodyData = res.data.userRank
            }, get().token)
            return bodyData
        },

        withdrawTon: async (data) => {
            await callApi('user/withdraw_ton', "POST", data, (res) => {
                set({ userInfo: res.user })
            }, get().token)
        },
    }
))