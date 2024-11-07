import { create } from "zustand";
import { callApi } from "./helper"

export const createWordGameStore = create((set: any, get: any, next: any) => (
    {
        game: {},

        answerWordGame: async (taskId: String, token: String) => {
            let user
            await callApi('word/answer', "POST", {
                taskId,
            }, (res) => {
                console.log(res);
                user = res.data.user
            }, token)
            return user
        },

        getGame: async (token: String) => {
            await callApi('word/get_game', "POST", null, (res) => {
                console.log(res);
                set({ game: res.data })
            }, token)
        },
    }))