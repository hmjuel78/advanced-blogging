
const BASE_URL = 'http://localhost:3000/authors'

export const getAuthor = async () => {
    const response = await fetch(BASE_URL)
    return response.json()
}