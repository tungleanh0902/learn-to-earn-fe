import { create } from "zustand";
import { callApi } from "./helper"

export const createMeanMatchingGameStore = create((set: any, get: any, next: any) => (
    {
        game: {},

        answerMeanMatchingGame: async (data: any, token: String) => {
            let bodyData
            await callApi('word/answer_match_meaning', "POST",
                data
            , (res) => {
                console.log(res);
                bodyData = res.data
            }, token)
            return bodyData
        },

        getGame: async (token: String) => {
            let game
            await callApi('word/get_game_match_meaning', "POST", null, (res) => {
                console.log(res);
                set({ game: res.data })
                game = res.data
            }, token)
            return game
        },
    }))