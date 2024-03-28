'use client'

import {useState} from "react";
import {loginReq} from "@/utils/api";
import Cookies from 'js-cookie';

const Home = () => {
    const [inputState, setInputState] = useState({
        username: '',
        password: ''
    })

    const handleLogin = async () => {
        try {
            const res = await loginReq(inputState)

            const token = res.data.data.token

            if (token) {
                Cookies.set("bts_token", token)
                window.location.href = '/todo'
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <input
                type="text"
                value={inputState.username}
                onChange={(e) => setInputState({...inputState, username: e.target.value})}
            />
            <input
                type="password"
                value={inputState.password}
                onChange={(e) => setInputState({...inputState, password: e.target.value})}
            />

            <button onClick={() => handleLogin()}>Submit</button>
        </div>
    )
}

export default Home