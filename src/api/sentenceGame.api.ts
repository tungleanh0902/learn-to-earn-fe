import { create } from "zustand";
import { callApi } from "./helper"

export const createSentenceGameStore = create((set: any, get: any, next: any) => (
    {
        game: {},

        answerSentenceGame: async (taskId: String, token: String) => {
            let user
            await callApi('word/answer_match_meaning', "POST", {
                taskId,
            }, (res) => {
                console.log(res);
                user = res.data.user
            }, token)
            return user
        },

        getGame: async (token: String) => {
            await callApi('word/get_game_match_meaning', "POST", null, (res) => {
                console.log(res);
                set({ game: res.data })
            }, token)
        },
    }))