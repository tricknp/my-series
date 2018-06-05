import React, { Component } from 'react'
import { Link } from 'react-router-dom' 

import api from '../Api'

class Home extends Component{
    
    constructor(props){
        super(props)
        
        this.state = {
          genres: [],
          isLoading: false,
        }
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
    
      renderGenreLink(genre){
        return(
          <span key={genre}>
            <Link to={`/series/${genre}`}> { genre } </Link>
          </span>  
        )
      }
    
    render(){
        return(
            <div> 
                <section id="intro" className="intro-section">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 center">
                        <h1><img src="images/logo.png" /></h1>
                        <p className="text-logo">
                            Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.
                        </p>
                    </div>
                    </div>
                </div>
                </section> 

                <section className="container-genres"> 
                { 
                    this.state.isLoading &&
                    <span> Carregando... </span> 
                }
                
                {
                    !this.state.isLoading &&
                    <div className="genres">
                        <a className="genres-names"> { this.state.genres.map(this.renderGenreLink) } </a> 
                    </div>
                }
                </section>       
            </div>
        )
    }
}

export default Home