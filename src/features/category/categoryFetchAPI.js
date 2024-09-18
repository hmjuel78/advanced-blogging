
const BASE_URL = 'http://localhost:3000/catagories'

export const getCategory = async () => {
    const response = await fetch(BASE_URL, {

    }).json()
    return response.json()
}