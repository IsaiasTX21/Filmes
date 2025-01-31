import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Rating } from '@mui/material';
import { MeuContexto } from './DIMENSION'; // Importando o contexto

function DETAILS() {
  // Usando o contexto para acessar o valor de "width"
  const height = useContext(MeuContexto);
  const [view, setview] = useState("100%")


function heigh (){
  
 if(height > 520) {
  setview("100vh")
}}



  // Verifique se o valor de width está sendo acessado corretamente


  const [movies, setMovies] = useState([]);
  const chave = "api_key=34eb4921b3be3ffb5436c69d930287bb";
  const { id } = useParams();

  async function api() {
    const api = await fetch(`https://api.themoviedb.org/3/movie/${id}?${chave}`)
      .then((data) => data.json())
      .then((data) => setMovies(data));
  }

  useEffect(() => {
  
    api();
    heigh()
  },[]);

  const renderCountries = () => {
    if (movies.production_countries) {
      return movies.production_countries.map((country, index) => (
        <span key={index}>{country.name}{index < movies.production_countries.length - 1 && ', '}</span>
      ));
    }
    return "Informação não disponível";
  };

  const rendergenres = () => {
    if (movies.genres) {
      return movies.genres.map((genre, index) => (
        <span className='me-2' key={index}>{genre.name} {index < movies.genres.length - 1 && ', '}</span>
      ));
    }
    return "Informação não disponível";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
 

   

      <div className='d-flex  ' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movies.backdrop_path})`, backgroundRepeat: "no-repeat", backgroundSize: "cover",backgroundPosition:"center", "height":view }}>
        <div className='container align-content-center mb-5 ' >
          <div className="row det justify-content-center  " >
      
            <div className="card info" >
            
              <div className="card-body text-center " >
      
                <h5 className="card-title" style={{color:"red"}}>{movies.title}</h5>
                <p className="card-text text-white" >{movies.overview}</p>
                <Rating
                  name="half-rating-read"
                  value={movies.vote_average / 2}
                  readOnly
                />
                
                <p> <span style={{color:"red"}}> Country </span>: {renderCountries()}</p>
                <p> <span style={{color:"red"}}>Genres </span> {rendergenres()}</p>

                <button className="btn btn-danger" onClick={handleGoBack}>
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default DETAILS;
