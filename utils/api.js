import axios from "axios";
import Cookies from "js-cookie";

const apiHost = process.env.NEXT_PUBLIC_API_HOST;
const token = Cookies.get('bts_token')

export const registerReq = async (inputState) => {
    try {
        const res = await axios.post(`${apiHost}/register`, inputState)

        return res
    } catch (e) {
        return e
    }

}

export const loginReq = async (inputState) => {
    try {
        const res = await axios.post(`${apiHost}/login`, inputState)

        return res
    } catch (e) {
        console.log(e)
    }
}

export const getChecklistsReq = async () => {
    try {
        const token = Cookies.get('bts_token')

        const res = await axios.get(`${apiHost}/checklist`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res
    } catch (e) {
        console.log(e)
    }
}

export const addChecklistsReq = async (inputState) => {
    try {
        const res = await axios.post(`${apiHost}/checklist`, inputState, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res
    } catch (e) {
        console.log(e)
    }
}

export const deleteChecklistReq = async (id) => {
    try {
        const res = await axios.delete(`${apiHost}/checklist/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res
    } catch (e) {
        console.log(e)
    }
}

export const getItemsReq = async (id) => {
    try {
        const res = await axios.get(`${apiHost}/checklist/${id}/item`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res
    } catch (e) {
        console.log(e)
    }
}

export const addItemReq = async (id, inputState) => {
    try {
        const res = await axios.post(`${apiHost}/checklist/${id}/item`, inputState, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res
    } catch (e) {
        console.log(e)
    }
}

export const deleteItemReq = async (checklistId, itemId) => {
    try {
        const res = await axios.delete(`${apiHost}/checklist/${checklistId}/item/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res
    } catch (e) {
        console.log(e)
    }
}

export const updateItemReq = async (checklistId, itemId) => {
    try {
        const res = await axios.put(`${apiHost}/checklist/${checklistId}/item/${itemId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res
    } catch (e) {
        console.log(e)
    }
}

export const renameItemReq = async (checklistId, itemId, inputState) => {
    try {
        const res = await axios.put(`${apiHost}/checklist/${checklistId}/item/rename/${itemId}`, inputState, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res
    } catch (e) {
        console.log(e)
    }
}