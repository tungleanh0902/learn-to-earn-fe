import { create } from "zustand";
import { callApi } from "./helper"

export const createQuizzStore = create((set: any, get: any, next: any) => (
    {
        lesson: {},
        lessonForCampaign: {},
        getRandomLesson: async (token: String) => {
            await callApi('quizz/random_lesson', "GET", null, (res) => {
                console.log(res);
                set({ lesson: res.data })
            }, token)
        },

        answerQuizz: async (optionId: String, token: String) => {
            await callApi('quizz/answer', "POST", {
                optionId
            }, (res) => { }, token)
        },

        getRandomLessonForCampaign: async (token: String) => {
            await callApi('quizz/random_lesson_for_campaign', "GET", null, (res) => {
                console.log(res);
                set({ lessonForCampaign: res.data })
            }, token)
        },

        answerQuizzCampaign: async (optionId: String, token: String) => {
            await callApi('quizz/answer_campaign', "POST", {
                optionId
            }, (res) => { }, token)
        },
    }))