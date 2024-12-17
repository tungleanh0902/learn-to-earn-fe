import React from 'react';
import { shortName } from '../api/helper';
import { useState } from 'react';
import { createUserStore } from "../api/user.api";
import { createSocialTaskStore } from "../api/socialTask.api";
import PointsPopUp from './Popups/PointsPopUp';
import addNotification from 'react-push-notification';

const CVForm = ({ currentItem, handleClose }) => {
    const createCvProfile = createSocialTaskStore(state => state.createCvProfile)
    const getActiveTask = createSocialTaskStore(state => state.getActiveTasks)
    const token = createUserStore(state => state.token)
    const updateUserInfo = createUserStore(state => state.updateUserInfo)

    const [isActive, setIsActive] = useState(false);
    const [newPoint, setNewPoint] = useState(0);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [link, setLink] = useState("")

    const handleSubmit = async () => {
        try {
            if (link.includes("https://www.facebook.com/") == false && link.includes("https://www.linkedin.com/in") == false) {
                throw addNotification({
                    message: 'Invalid link',
                    theme: 'red',
                  }) 
            }
            let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!emailPattern.test(email)) {
                throw addNotification({
                    message: 'Invalid email',
                    theme: 'red',
                  }) 
            }
            let data = await createCvProfile(name, email, link, currentItem, token)
            console.log(data);
            setNewPoint(data.points)
            updateUserInfo(data.user) 
            setIsActive(true)
            setTimeout(() => {
                setIsActive(false)
                setNewPoint(0)
            }, 2000)
            await getActiveTask(token)
            addNotification({
                title: 'Success',
                message: "Submit info successfully",
                theme: 'darkblue',
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div class="absolute fixed p-10 w-full max-h-full z-50 top-10">
            <div class="relative rounded-lg shadow bg-white">
                {
                    isActive ?
                        <PointsPopUp className="flex-none"
                            points={newPoint}
                            isActive={isActive}
                            isTon={false}
                        />
                        :
                        <></>
                }
                <div className="justify-between p-4">
                    <h3 className="text-4xl text-[#3367D5] font-semibold">
                        Mazii Job
                    </h3>
                    <p className='text-[#3367D5]'>Top Japanese Job Search Platform</p>
                    <form>
                        <div class="space-y-12">
                            <div class="border-b border-gray-900/10 pb-12">
                                <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                    <div class="sm:col-span-4">
                                        <label className="block font-medium text-left text-gray-900">Full name</label>
                                        <div class="mt-2">
                                            <div class="flex rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                <input value={name} type="text" onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setName(e.target.value)
                                                }} class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                        <label className="block font-medium text-left text-gray-900">Email</label>
                                        <div class="mt-2">
                                            <div class="flex rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                <input value={email} onChange={(e) => setEmail(e.target.value)}  type="text" class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                        <label className="block font-medium text-left text-gray-900">Facebook/Linkedln</label>
                                        <div class="mt-2">
                                            <div class="flex rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                <input value={link} onChange={(e) => setLink(e.target.value)} type="text" class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-end gap-x-6">
                            <button onClick={handleClose} type="button" className="text-sm/6 font-semibold text-gray-900">Back</button>
                            <button onClick={handleSubmit} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CVForm;