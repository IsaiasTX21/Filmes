import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HEADER from './HEADER';
import Carousel from 'react-bootstrap/Carousel';

function TOPRATED() {
  const [movie, setMovie] = useState([]);
   const [loader, setloader] = useState(true)
   const navigate = useNavigate()

   console.log(movie)
 
     function handleGoToDetails(id) {
    sessionStorage.setItem("scrollPosition", window.scrollY);  // mesma chave!
    navigate(`/Details/${id}`);
  }
  +
  useEffect(() => {
    if (!loader) {
      const scrollPos = sessionStorage.getItem('scrollPosition');
      if (scrollPos) {
        window.scrollTo(0, parseInt(scrollPos));
        sessionStorage.removeItem('scrollPosition');
      }

      
    }
  }, [loader]);


  useEffect(() => {
    async function TOPRATED() {
    try{ 
      const api = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`)
        .then((data) => data.json())
        .then((data) =>setMovie(data.results));
       
    } catch(error){
      console.log(error)
    }
    finally{
     setloader(false)
    }
    }
    TOPRATED()

  }, []);



  if(loader){

    return  <div className='bg-black min-vh-100 d-flex justify-content-center align-items-center '>  <div class=" mt-auto mb-auto spinner-border  text-warning" role="status">
    <span class="visually-hidden ">Loading...</span>
    </div>
    </div>
      }

  return (
    <div className='containermovie  bg-black'> 
        <HEADER />

        <Carousel>
      <Carousel.Item>
            <div style={{height:"700px",width:"100%", backgroundPositionY:"28%",backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundImage:`url(https:image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg`}}></div>
        <Carousel.Caption>
          <h3 className='gold'>{movie[10].title}</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
       
      <Carousel.Item>
          <div style={{height:"700px",width:"100%",  backgroundPositionY:"20%",backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundImage:"url(https:image.tmdb.org/t/p/original/43c1efKzA1kigNzY0HBzeoXp8LR.jpg"}}></div>
        <Carousel.Caption>
          <h3 className='gold'>{movie[2].title} </h3>
         
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
            <div style={{height:"700px",width:"100%",  backgroundPositionY:"12%", backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundImage:`url(https:image.tmdb.org/t/p/original/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg)`}}></div>
             
        <Carousel.Caption>
          <h3 className='gold' >{movie[5].title}</h3>

        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  
        <div className="row m-auto mt-5 ">
         
          {movie.map((element) => {
            return (
              <div key={element.id} className=" col-md-6 col-lg-4 col-xl-3 col-xxl-2">
                {/* Cada card */}
                <div style={{backgroundColor:"rgb(0, 0, 0)"}} className="card img-fluid justify-content-center text-center anime">
                <img onClick={()=> handleGoToDetails(element.id)} src={`https://image.tmdb.org/t/p/w500${element.poster_path}`} className="movie card-img-top img-fluid" alt="" />
                  <div className="card-body card-space ">
                  <h5 className="card-title text-white">{element.title}</h5>
                  <p className="card-text position-relative"> </p>
                  
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
     
  );
}

export default TOPRATED;
