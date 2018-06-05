import React, { Component } from 'react'
import api from '../Api'

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
        }

        this.saveSeries = this.saveSeries.bind(this)
      }

      componentWillMount(){
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
            console.log(res)
        })

      }

    render(){
        return(
            <section className="intro-section">  
                <h1> Nova Série </h1>
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
                    <button onClick={this.saveSeries} type="button"> Salvar </button>
                </form>    
            </section>
        )
    }
 }

export default NewSeries
