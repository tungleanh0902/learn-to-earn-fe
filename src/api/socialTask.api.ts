import { create } from "zustand";
import { callApi } from "./helper"

export const createSocialTaskStore = create((set: any, get: any, next: any) => (
    {
        activeTasks: {},

        claimSocialTask: async (taskId: String, token: String) => {
            await callApi('social_task/claim', "POST", {
                taskId,
            }, (res) => {
                console.log(res);
            }, token)
        },

        getActiveTasks: async (token: String) => {
            await callApi('social_task/all_active', "POST", null, (res) => {
                console.log(res);
                set({ activeTasks: res.data })
            }, token)
        },
    }))