import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MenuIcon from '@mui/icons-material/Menu';
import Dropdown from 'react-bootstrap/Dropdown';
import movie from "../assets/movie.png"
import search from "../assets/search.png"

function HEADER() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [namemovie, setnamemovie] = useState("")
  const navigate = useNavigate("")


  function inputchange(e) {
    setnamemovie(e.target.value)
    console.log(e.target.value)
  }

  function searchmovie() {
    if (namemovie.length > 0) {
      navigate(`/Search/${namemovie}`)
    }

    else {
      return
    }
  }

  function Enter(e){
   if(e.code == "Enter"){
      navigate(`/Search/${namemovie}`)
   }
  }

  return (



    <>

      <header className=' m-0 p-0 sticky-top'>
        <nav className='navbar navbar-expand-lg list-unstyled  '>
    

            <div style={{width:"50%"}} className=" collapse navbar-collapse   " >
              <ul  className="navbar-nav w-100   ">

                <li style={{marginLeft:"20%"}} className="nav-item" >
                 <img id='movie' src={movie}></img>
                </li>
                <li className="nav-item  ms-3 ">
                  <a onClick={() => navigate("/")} className="nav-link text-white" >POPULAR </a>
                </li>
                <li className="nav-item ">
                  <a onClick={() => navigate(`/TopRated`)} className="nav-link text-white   ">TOP RATED</a>
                </li>
                <li className="nav-item">
                  <a onClick={() => navigate(`/Upcoming`)} className="nav-link text-white " >UP COMING</a>
                </li>
                <li className='nav-item'>
                 <a>   <Button variant=" btn btn-warning   text-center rounded-2 Menu " className='d-md-none ' onClick={handleShow}>
              <MenuIcon className='d-md-none' onClick={handleShow} />
            </Button>

            <Dropdown>
              <Dropdown.Toggle variant=''  id="dropdown-basic" className=' ms-2 text-bg-warning   '>
                Category
              </Dropdown.Toggle>

              <Dropdown.Menu className=' dropdown-menu-dark text-center'>
                <Dropdown.Item onClick={() => navigate(`/Genres/28`)}>Action</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(`/Genres/80`)}>Crime</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(`/Genres/16`)} >Animation</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(`/Genres/12`)}>Adventure</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(`/Genres/35`)}>Comedy</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(`/Genres/99`)}>Documentary</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(`/Genres/18`)}>Drama</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(`/Genres/14`)}>Family</Dropdown.Item>
                 <Dropdown.Item onClick={() => navigate(`/Genres/27`)}>Horror</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown></a>

                </li>
              </ul>
            </div>

      

          <div  id='mobilediv' className=' d-flex  '>


            <Offcanvas  show={show} style={{ width: '50%', background: " rgba(0, 0, 0, 1)" }} onHide={handleClose}>

              <Offcanvas.Header   style={{  background: " #d69b0fff", color: "red"}} closeButton  >

                <Offcanvas.Title className=" ms-5 rounded-2 text-black" >menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='text-center'>

                <ul className="navbar-nav p-0 m-0 ">
                   
                  <li className="nav-item">
                    <a onClick={()=>{ return navigate(`/`) , setShow(false) } } className="nav-link text-white me-4" >POPULAR</a>
                  </li>
                   
                  <li className="nav-item">
                    <a onClick={()=>{ return navigate(`/TopRated`) , setShow(false) } } className="nav-link text-white me-4" >TOP RATED</a>
                  </li>
                   
                  <li className="nav-item">
                    <a onClick={()=>{ return navigate(`/Upcoming`) , setShow(false) } } className="nav-link text-white me-4" >UPCOMING</a>
                  </li>
                  
                  <li className="nav-item">
                    <a onClick={()=>{ return navigate(`/Genres/28`) , setShow(false) } } className="nav-link text-white me-4" >ACTION</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={()=>{ return navigate(`/Genres/80`) , setShow(false) } } className="nav-link text-white me-4" >CRIME</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={()=>{ return navigate(`/Genres/16`) , setShow(false) } } className="nav-link text-white me-4" >ANIMATION</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={()=>{ return navigate(`/Genres/12`) , setShow(false) } } className="nav-link text-white me-4" >ADVENTURE</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={()=>{ return navigate(`/Genres/35`) , setShow(false) } } className="nav-link text-white me-4" >COMEDY</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={()=>{ return navigate(`/Genres/99`) , setShow(false) } } className="nav-link text-white me-4">DOCUMENTARY</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={()=>{ return navigate(`/Genres/18`) , setShow(false) } } className="nav-link text-white me-4">DRAMA</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={()=>{ return navigate(`/Genres/14`) , setShow(false) } } className="nav-link text-white me-4">FAMILY</a>
                  </li>
             
                  <li className="nav-item">
                    <a onClick={()=>{ return navigate(`/Genres/27`) , setShow(false) } } className="nav-link text-white me-4" >HORROR</a>
                  </li>

                </ul>

              </Offcanvas.Body>
            </Offcanvas>


            <Button variant=" btn btn-warning  ms-1  text-center rounded-2 Menu " className='d-lg-none' onClick={handleShow}>
              <MenuIcon className='d-lg-none' onClick={handleShow} />
            </Button>

   

            <input   type='text' className=' form text-white rounded-2' required onKeyDown={(e)=> Enter(e) } onChange={inputchange}/>
            <button id='search' className='btn btn-warning me-1  '  onClick={searchmovie} ><img  id="searchimg" src={search} alt="search" /></button>

          </div>



        </nav>

      </header>
    </>
  )
}

export default HEADER
