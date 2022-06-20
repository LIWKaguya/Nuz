import axios from "axios";

const baseUrl = 'http://localhost:3001/api/posts'

let token = null

const setToken = newToken => {
    token = `using ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const upload = async (post) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, post, config)
    return response.data
}

const terminatePost = async ({ id }) => {
    const config = {
        headers: { Authorization: token }
    }

    await axios.delete(`${baseUrl}/${id}`, config)
}

const likePost = async ({ id }) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.put(`${baseUrl}/${id}/likes`, config)
    return response.data
}

const methods = { getAll, setToken, upload, terminatePost, likePost }

export default methods