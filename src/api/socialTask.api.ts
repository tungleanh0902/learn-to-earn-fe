import { create } from "zustand";
import { callApi } from "./helper"

export const createSocialTaskStore = create((set: any, get: any, next: any) => (
    {
        activeTasks: [],

        claimSocialTask: async (taskId: String, token: String) => {
            let data
            await callApi('social_task/claim', "POST", {
                taskId,
            }, (res) => {
                data = res.data
            }, token)
            return data
        },

        getActiveTasks: async (token: String) => {
            await callApi('social_task/all_active', "POST", null, (res) => {
                set({ activeTasks: res.data })
            }, token)
        },
    }
))