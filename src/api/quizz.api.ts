import { create } from "zustand";
import { callApi } from "./helper"

export const createQuizzStore = create((set: any, get: any, next: any) => (
    {
        lesson: [],
        lessonForCampaign: [],
        questionIdx: 0,
        wrongStreak: 0,
        quizzSummary: {},
        answers: 0,

        doIncreaseWrongStreak: async (val: number) => {
            set({ wrongStreak: val })
        },
        doIncreaseIndex: async (idx: number) => {
            set({ questionIdx: idx })
        },

        getRandomLesson: async (token: String) => {
            try {
                await callApi('quizz/random_lesson', "POST", null, (res) => {
                    set({ 
                        lesson: res.data.lessons[0],
                        answers: res.data.answers
                    })
                }, token)
            } catch (error) {
                set({ lesson: [] })
            }
        },

        answerQuizz: async (optionId: String, token: String) => {
            try {
                let data
                await callApi('quizz/answer', "POST", {
                    optionId
                }, (res) => {
                    data = res.data
                    set({ answers: data.answers })
                }, token)
                return data
            } catch (error) {
                set({ lesson: [] })
            }
        },

        answerSpecialQuizz: async (optionId: String, token: String) => {
            try {
                let data
                await callApi('quizz/answer_special_quizz', "POST", {
                    optionId
                }, (res) => {
                    data = res.data
                }, token)
                return data
            } catch (error) {
                set({ lesson: [] })
            }
        },

        getRandomLessonForCampaign: async (token: String) => {
            try {
                await callApi('quizz/random_lesson_for_campaign', "POST", null, (res) => {
                    set({ lessonForCampaign: res.data[0] })
                }, token)
            } catch (error) {
                set({ lessonForCampaign: [] })
            }
        },

        answerQuizzCampaign: async (optionId: String, token: String) => {
            try {
                let data
                await callApi('quizz/answer_campaign', "POST", {
                    optionId
                }, (res) => { 
                    data = res.data
                }, token)
                return data
            } catch (error) {
                set({ lessonForCampaign: [] })
            }
        },

        doSummaryQuizzDaily: async (token: String) => {
            let data
            await callApi('quizz/summary', "POST", null, (res) => { 
                data = res.data
                set({ quizzSummary: res.data })
            }, token)
            return data
        },
    }))