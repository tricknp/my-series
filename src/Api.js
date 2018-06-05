import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})

export const getGenres = () => api.get('genres')    
export const getSeriesByGenre = (genre) => api.get('series?genre='+genre) 
export const getSeriesById = (id) => api.get('series/'+id)
export const saveSeries = (newSeries) => api.post('series', newSeries)
export const updateSeries = (series) => api.put('series/'+series.id, series)
export const deleteSeries = (id) => api.delete('series/'+id)

const apis = {
   getGenres,
   saveSeries,
   getSeriesByGenre,
   deleteSeries,
   getSeriesById,
   updateSeries
}

export default apis