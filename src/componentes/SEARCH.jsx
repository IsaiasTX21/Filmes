import HEADER from "./HEADER";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


function SEARCH() {
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
        `https://api.themoviedb.org/3/search/movie?${import.meta.env.VITE_API_KEY}&query=${id}`
      )
        .then((data) => data.json())
        .then((data) => setMovie(data.results));
     
      } catch(error){
       console.log(error)
      }
    finally{
    setloader(false)
    }}
     
    search();
  }, [id]);


  useEffect(()=>{
    if(!loader){  
   const  scrollPos = sessionStorage.getItem("scrollPosition")
   if(scrollPos){
   window.scrollTo(0,parseInt(scrollPos))
   sessionStorage.removeItem("scrollPosition")
   }}})

  if(loader){

    return  <div className='bg-black min-vh-100 d-flex justify-content-center align-items-center '>  <div class=" mt-auto mb-auto spinner-border text-warning" role="status">
    <span class="visually-hidden ">Loading...</span>
    </div>
    </div>
      }

  return (
   <> 
   
      <HEADER />

      <div className='bg-black'> 
   <div className="container ">
        {/* Usando a classe 'row' aqui para agrupar os cards */}
        <div className="row ">
          {   console.log(movie)}
          {movie.map((element) => {
            return (
              <div key={element.id} className=" col-md-6 col-lg-4 col-xl-3 ">
                {/* Cada card */}
                <div style={{backgroundColor:"rgb(0, 0, 0)"}} className="card mt-5 img-fluid justify-content-center text-center anime">
                <img onClick={()=> handleGoToDetails(element.id)} src={`https://image.tmdb.org/t/p/w500${element.poster_path}`} style={{  height:"450px "}} className="movie card-img-top im-g-fluid" alt="" />
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
      </div>
      </>
   
  );
}

export default SEARCH;
