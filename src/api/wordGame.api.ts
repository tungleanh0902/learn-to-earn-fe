import { create } from "zustand";
import { callApi } from "./helper"

export const createWordGameStore = create((set: any, get: any, next: any) => (
    {
        game: {},

        answerWordGame: async (taskId: String, token: String) => {
            await callApi('word/answer', "POST", {
                taskId,
            }, (res) => {
                console.log(res);
            }, token)
        },

        getGame: async (token: String) => {
            await callApi('word/get_game', "GET", null, (res) => {
                console.log(res);
                set({ game: res.data })
            }, token)
        },
    }))