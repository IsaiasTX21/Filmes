import HEADER from "./HEADER";
import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function GENRES() {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
   const [loader, setloader] = useState(true)
  const navigate = useNavigate()

   function handleGoToDetails(id) {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    navigate(`/Details/${id}`);
  }

  useEffect(() => {
    async function search() {
      try{
       const api = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${id}`
      )
        .then((data) => data.json())
        .then((data) => setMovie(data.results));
       
      }catch(error){
      console.log(error)
      }
    finally{
     setloader(false)
    }
    
    }
    search();
  }, [id]);

    useEffect(() => {
    if (!loader) {
      const scrollPos = sessionStorage.getItem('scrollPosition');
      if (scrollPos) {
        window.scrollTo(0, parseInt(scrollPos));
        sessionStorage.removeItem('scrollPosition');
      }
    }
  }, [loader]);


  if(loader){

    return  <div className='bg-black min-vh-100 d-flex justify-content-center align-items-center '> 
     <div class=" mt-auto mb-auto spinner-border  text-warning" role="status">
    <span class="visually-hidden ">Loading...</span>
    </div>
    </div>
      }

  return (
   <> 
   
    <div className='containermovie bg-black'> 

       <HEADER/>
        <div className="row m-auto">
       
          {movie.map((element) => {
            return (
              <div key={element.id} className="  col-md-6 col-lg-4 col-xl-3 col-xxl-2  ">
     
                <div style={{backgroundColor:"rgb(0, 0, 0)"}} className="card img-fluid justify-content-center text-center anime">
                <img onClick={()=> handleGoToDetails(element.id)} src={`https://image.tmdb.org/t/p/w500${element.poster_path}`} 
                className="movie divimg card-img-top im-g-fluid" alt="" /> 
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
      
      </>
   
  );
}

export default GENRES;
