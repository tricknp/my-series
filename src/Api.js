import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})


export const getGenres = () => api.get('genres')        
export const saveSeries = (newSeries) => api.post('series', newSeries)

const apis = {
   getGenres  : getGenres,
   saveSeries : saveSeries
}

export default apis