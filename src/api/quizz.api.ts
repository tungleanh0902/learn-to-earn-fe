import { create } from "zustand";
import { callApi } from "./helper"

export const createQuizzStore = create((set: any, get: any, next: any) => (
    {
        lesson: [],
        lessonForCampaign: [],
        questionIdx: 0,
        doIncreaseIndex: async (idx: number) => {
            set({ questionIdx: idx })
        },

        getRandomLesson: async (token: String) => {
            try {
                await callApi('quizz/random_lesson', "POST", null, (res) => {
                    console.log(res);
                    set({ lesson: res.data[0] })
                }, token)
            } catch (error) {
                set({ lesson: [] })
            }
        },

        answerQuizz: async (optionId: String, token: String) => {
            try {
                let user
                let point 
                await callApi('quizz/answer', "POST", {
                    optionId
                }, (res) => {
                    user = res.data.user
                    point = res.data.point
                }, token)
                // return [user, point]
                return user
            } catch (error) {
                set({ lesson: [] })
            }
        },

        answerSpecialQuizz: async (optionId: String, token: String) => {
            try {
                let user
                await callApi('quizz/answer_special_quizz', "POST", {
                    optionId
                }, (res) => {
                    user = res.data.user
                }, token)
                return user
            } catch (error) {
                set({ lesson: [] })
            }
        },

        getRandomLessonForCampaign: async (token: String) => {
            try {
                await callApi('quizz/random_lesson_for_campaign', "POST", null, (res) => {
                    console.log(res);
                    set({ lessonForCampaign: res.data[0] })
                }, token)
            } catch (error) {
                set({ lessonForCampaign: [] })
            }
        },

        answerQuizzCampaign: async (optionId: String, token: String) => {
            try {
                let user
                await callApi('quizz/answer_campaign', "POST", {
                    optionId
                }, (res) => { 
                    user = res.data.user
                }, token)
                return user
            } catch (error) {
                set({ lessonForCampaign: [] })
            }
        },
    }))