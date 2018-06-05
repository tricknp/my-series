import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})


export const getGenres = () => api.get('genres')        


const apis = {
   getGenres: getGenres

}

export default apis