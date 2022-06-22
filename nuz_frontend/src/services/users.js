import axios from "axios";

const baseUrl = 'http://localhost:3001/api/users'

const getOne = async ({ id }) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const methods = { getOne }

export default methods