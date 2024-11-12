import { create } from "zustand";
import { callApi } from "./helper"

export const createQuizzStore = create((set: any, get: any, next: any) => (
    {
        lesson: {},
        lessonForCampaign: {},
        getRandomLesson: async (token: String) => {
            await callApi('quizz/random_lesson', "POST", null, (res) => {
                console.log(res);
                set({ lesson: res.data[0] })
            }, token)
        },

        answerQuizz: async (optionId: String, token: String) => {
            let user
            await callApi('quizz/answer', "POST", {
                optionId
            }, (res) => {
                user = res.data.user
            }, token)
            return user
        },

        answerSpecialQuizz: async (optionId: String, token: String) => {
            let user
            await callApi('quizz/answer_special_quizz', "POST", {
                optionId
            }, (res) => {
                user = res.data.user
            }, token)
            return user
        },

        getRandomLessonForCampaign: async (token: String) => {
            await callApi('quizz/random_lesson_for_campaign', "POST", null, (res) => {
                console.log(res);
                set({ lessonForCampaign: res.data })
            }, token)
        },

        answerQuizzCampaign: async (optionId: String, token: String) => {
            let user
            await callApi('quizz/answer_campaign', "POST", {
                optionId
            }, (res) => { 
                user = res.data.user
            }, token)
            return user
        },
    }))