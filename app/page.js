'use client'

import {useState} from "react";
import {loginReq, registerReq} from "@/utils/api";
import Cookies from 'js-cookie';

const Home = () => {
    const [inputState, setInputState] = useState({
        username: '',
        password: '',
        email: ''
    })
    const [register, setRegister] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async () => {
        try {
            const res = await loginReq(inputState)

            if (res.data.data.token) {
                Cookies.set("bts_token", token)
                window.location.href = '/todo'
            } else {
                setError('Invalid username or password')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleRegister = async () => {
        try {
            const res = await registerReq(inputState)

            if (res.response.data.errorMessage) {
                setError(res.response.data.errorMessage)
            } else {
                setRegister(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2">
                <button onClick={() => setRegister(false)} className="bg-blue-500 text-white py-2 w-full">LOGIN</button>
                <button onClick={() => setRegister(true)} className="bg-green-500 text-white py-2 w-full">REGISTER
                </button>
            </div>
            {
                register && (
                    <div className="space-y-2">
                        <label className="block">Email:</label>
                        <input
                            type="text"
                            className="bg-gray-200 py-1 px-2 border w-full"
                            value={inputState.email}
                            onChange={(e) => setInputState({...inputState, email: e.target.value})}
                        />
                    </div>
                )
            }
            <div className="space-y-2">
                <label className="block">Username:</label>
                <input
                    type="text"
                    className="bg-gray-200 py-1 px-2 border w-full"
                    value={inputState.username}
                    onChange={(e) => setInputState({...inputState, username: e.target.value})}
                />
            </div>
            <div className="space-y-2">
                <label className="block">Password</label>
                <input
                    type="password"
                    className="bg-gray-200 py-1 px-2 border w-full"
                    value={inputState.password}
                    onChange={(e) => setInputState({...inputState, password: e.target.value})}
                />
            </div>

            <button onClick={() => register ? handleRegister() : handleLogin()}
                    className="w-full text-white bg-blue-500 py-2">Submit
            </button>
            {
                error && (
                    <div className="text-red-500">{error}</div>
                )
            }
        </div>
    )
}

export default Home