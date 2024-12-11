import { create } from "zustand";
import { callApi } from "./helper";

export const createWordFillingGameStore = create((set: any, get: any, next: any) => (
    {
        game: {},

        answerWordFillingGame: async (data: any, token: String) => {
            let bodyData
            await callApi('word/answer_word_filling', "POST",
                data
            , (res) => {
                console.log(res);
                bodyData = res.data
            }, token)
            return bodyData
        },

        getGame: async (token: String) => {
            let game
            await callApi('word/get_game_word_filling', "POST", null, (res) => {
                console.log(res);
                set({ game: res.data })
                game = res.data
            }, token)
            return game
        },
    }))