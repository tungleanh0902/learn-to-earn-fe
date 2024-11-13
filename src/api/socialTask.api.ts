import { create } from "zustand";
import { callApi } from "./helper"

export const createSocialTaskStore = create((set: any, get: any, next: any) => (
    {
        activeTasks: [],

        claimSocialTask: async (taskId: String, token: String) => {
            let user
            await callApi('social_task/claim', "POST", {
                taskId,
            }, (res) => {
                user = res.data.user
            }, token)
            return user
        },

        getActiveTasks: async (token: String) => {
            await callApi('social_task/all_active', "POST", null, (res) => {
                console.log(res);
                set({ activeTasks: res.data })
            }, token)
        },
    }))