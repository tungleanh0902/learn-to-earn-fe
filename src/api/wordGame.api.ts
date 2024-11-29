import { create } from "zustand";
import { callApi } from "./helper"

export const createWordGameStore = create((set: any, get: any, next: any) => (
    {
        game: {},

        answerWordGame: async (choosenWordIds: string, topicId: string, token: string) => {
            let data
            await callApi('word/answer', "POST", {
                choosenWordIds,
                topicId
            }, (res) => {
                console.log(res);
                data = res.data
            }, token)
            return data
        },

        getGame: async (token: string) => {
            let game
            await callApi('word/get_game', "POST", null, (res) => {
                console.log(res);
                set({ game: res.data })
                game = res.data
            }, token)
            return game
        },
    }))