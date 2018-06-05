import React, { Component } from 'react'
import api from '../Api'
import { Redirect } from 'react-router-dom'

 const statuses = {
    'watched'  :  'Assistido',
    'watching' :  'Assistindo',
    'toWatch'  :  'Assistir'
 }
 

 class NewSeries extends Component {

    constructor(props){
        super(props)
        
        this.state = {
          genres: [],
          isLoading: false,
          redirect: false
        }

        this.saveSeries = this.saveSeries.bind(this)
      }

      componentDidMount(){
        this.setState({ isLoading: true })
        api.getGenres()
           .then(res => {
              this.setState({
                isLoading: false,
                genres: res.data
              })
           })
      }

      saveSeries(){
        const newSeries = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            coments: this.refs.coments.value
        }
        api.saveSeries(newSeries).then(res => {
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
                <h1> Nova Série </h1>
                <form className="form">
                    <input type="text" ref="name" placeholder="nome" /> 
                    <input type="textarea" ref="coments" placeholder="comentario" />

                    <select ref="status">
                      { 
                          Object.keys(statuses)
                          .map( key => <option key={key} value={key}> {statuses[key]} </option> 
                          )
                        } 
                    </select>
                     
                    <select ref="genre"> { 
                        this.state.genres
                        .map( key => <option key={key} value={key}> {key} </option> 
                        )
                    } 
                    </select>
                    
                    <button onClick={this.saveSeries} type="button"> Salvar </button>
                </form>    
            </section>
        )
    }
 }

export default NewSeries
