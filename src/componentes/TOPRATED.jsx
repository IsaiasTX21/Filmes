import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HEADER from './HEADER';
import Carousel from 'react-bootstrap/Carousel';
import four from "../assets/four.jpg"
import five from "../assets/five.png"
import six from "../assets/six.jpg"

import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

function TOPRATED() {
  const [movie, setMovie] = useState([]);
   const [loader, setloader] = useState(true)
   const navigate = useNavigate()


 
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
 
        <Carousel interval={2000} prevIcon={<GrPrevious/>} nextIcon={<GrNext />}>
       
       <Carousel.Item>
      <a href='https://movie-12i6-546x5ta4l-isaias-projects-00c8c77d.vercel.app/Details/803796'> <div className='imgcarrossel' style={{height:"27vw",width:"100%", backgroundPosition:"center",
        backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundImage:`url(${five})`}}> </div></a>
        <Carousel.Caption>
           <h3 style={{color:"whitesmoke"}}>KPop Demon Hunters</h3>
         
        </Carousel.Caption>
      </Carousel.Item>

           <Carousel.Item>
      <a href='https://movie-12i6-546x5ta4l-isaias-projects-00c8c77d.vercel.app/Details/155'><div className='imgcarrossel' style={{height:"27vw",width:"100%", backgroundPosition:"center",
        backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundImage:`url(${six})`}}> </div> </a>
        <Carousel.Caption>
                 <h3 style={{color:"whitesmoke"}}>The Dark Knight</h3>
        
        </Carousel.Caption>
      </Carousel.Item>
        

      <Carousel.Item>
          <a href='https://movie-12i6-546x5ta4l-isaias-projects-00c8c77d.vercel.app/Details/429'> <div className='imgcarrossel' style={{height:"27vw",width:"100%", backgroundPositionY:"22.5%",
              backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundImage:`url(${four})`}}> </div> </a>
        <Carousel.Caption>
       
          
        </Carousel.Caption>
      </Carousel.Item>
     
  

 

    </Carousel>

  
        <div className="row m-auto mt-5 ">
         
          {movie.map((element) => {
            return (
              <div key={element.id} className=" col-md-6 col-lg-4 col-xl-3 col-xxl-2">
            
                <div style={{backgroundColor:"rgb(0, 0, 0)"}} className="card img-fluid justify-content-center text-center anime">
                <img    style={{cursor:"pointer"}} onClick={()=> handleGoToDetails(element.id)} src={`https://image.tmdb.org/t/p/w500${element.poster_path}`} className="movie divimg card-img-top img-fluid" alt="" />
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
