import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})

export const getGenres = () => api.get('genres')        
export const saveSeries = (newSeries) => api.post('series', newSeries)
export const getSeriesByGenre = (genre) => api.get('series?genre='+genre) 

const apis = {
   getGenres  : getGenres,
   saveSeries : saveSeries,
   getSeriesByGenre: getSeriesByGenre
}

export default apis