import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import api from '../Api'

 const statuses = {
    'watched'  :  'Assistido',
    'watching' :  'Assistindo',
    'toWatch'  :  'Assistir'
 }
 

 class EditSeries extends Component {

    constructor(props){
        super(props)
        
        this.state = {
          genres: [],
          isLoading: false,
          redirect: false,
          series: {}
        }

        this.updateSeries = this.updateSeries.bind(this)
      }

      componentDidMount(){
        this.setState({ isLoading: true })

        api.getSeriesById(this.props.match.params.id).then(res => {
            this.setState({ 
                series: res.data
            })
            console.log(res.data) 
            this.refs.name.value = this.state.series.name
            this.refs.genre.value = this.state.series.genre
            this.refs.coments.value = this.state.series.coments
            this.refs.status.value = this.state.series.status
        })

        api.getGenres()
           .then(res => {
              this.setState({
                isLoading: false,
                genres: res.data
              })
           })
      }

      updateSeries(){
        const newSeries = {
            id: this.props.match.params.id,
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            coments: this.refs.coments.value
        }
        console.log(newSeries)
        api.updateSeries(newSeries).then(res => {
            this.setState({
                redirect: `/series/${this.refs.genre.value}`
            })
        })

      }

    render(){
        return(
            <section className="intro-section">  
                {
                 this.state.redirect && 
                 <Redirect to={this.state.redirect} /> 
                }
                <h1> Editar Série </h1>
                <p> {JSON.stringify(this.state)} </p>
                <form>
                    <input type="text" ref="name" placeholder="nome" /> 

                    Status: 
                    <select ref="status">
                      { 
                          Object.keys(statuses)
                          .map( key => <option key={key} value={key}> {statuses[key]} </option> 
                          )
                        } 
                    </select>
                    Generos: 
                    <select ref="genre"> { 
                        this.state.genres
                        .map( key => <option key={key} value={key}> {key} </option> 
                        )
                    } 
                    </select>
                    
                    <input type="textarea" ref="coments" placeholder="comentario" />
                    <button onClick={this.updateSeries} type="button"> Salvar </button>
                </form>    
            </section>
        )
    }
 }

export default EditSeries
