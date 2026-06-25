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
  }

  function searchmovie() {
    if (namemovie.length > 0) {
      navigate(`/Search/${namemovie}`)
    }

    else {
      return ""
    }
  }

  function Enter(e) {
    if (e.code == "Enter") {
      navigate(`/Search/${namemovie}`)
    }
  }

  return (

    <>
      <header className=' m-0 p-0 sticky-top'>
        <nav  className='navbar navbar-expand-sm list-unstyled  '>
          <div className=" collapse navbar-collapse " >
            <ul className="navbar-nav  ">

             <img id='movie' src={movie}></img>

              <li className="nav-item  ms-3 ">
                <a onClick={() => navigate("/")} className="nav-link " >HOME</a>
              </li>
              <li className="nav-item ">
                <a onClick={() => navigate(`/TopRated`)} className="nav-link   ">TOP RATED</a>
              </li>
              <li className="nav-item">
                <a onClick={() => navigate(`/Upcoming`)} className="nav-link " >UP COMING</a>
              </li>
              <li className='nav-item'>
              </li>
            </ul>
            <div>
              <input type='text' className=' text-white ' required onKeyDown={(e) => Enter(e)} onChange={inputchange} />
              <button id='search-icon' className='btn  search ' onClick={searchmovie} ><img id="searching" src={search} alt="search" /></button>
            </div>
          </div>

          <div className=' d-flex w-100  d-sm-none '>

            <Button variant=" btn text-center rounded-2 Menu "
              className='d-lg-none' onClick={handleShow}>
              <MenuIcon className='d-lg-none' onClick={handleShow} />
            </Button>

            <input id='input-mobile' type='text' className='  text-white ' required onKeyDown={(e) => Enter(e)} onChange={inputchange} />
            <button id='searching-mobile' className='btn btn-warning search ' onClick={searchmovie} ><img id="search-icon-mobile" src={search} alt="search" /></button>

            <Offcanvas show={show} style={{ width: '50%', background: " rgba(0, 0, 0, 1)" }} onHide={handleClose}>

              <Offcanvas.Header style={{ background: " #d69b0fff", color: "red" }} closeButton  >

                <Offcanvas.Title className=" ms-auto rounded-2 text-black" >menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='text-center'>

                <ul className="navbar-nav p-0 m-0 ">

                  <li className="nav-item">
                    <a onClick={() => { return navigate(`/`), setShow(false) }} className="nav-link text-white me-4" >HOME</a>
                  </li>

                  <li className="nav-item">
                    <a onClick={() => { return navigate(`/TopRated`), setShow(false) }} className="nav-link text-white me-4" >TOP RATED</a>
                  </li>

                  <li className="nav-item">
                    <a onClick={() => { return navigate(`/Upcoming`), setShow(false) }} className="nav-link text-white me-4" >UPCOMING</a>
                  </li>

                  <li className="nav-item">
                    <a onClick={() => { return navigate(`/Genres/28`), setShow(false) }} className="nav-link text-white me-4" >ACTION</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => { return navigate(`/Genres/80`), setShow(false) }} className="nav-link text-white me-4" >CRIME</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => { return navigate(`/Genres/16`), setShow(false) }} className="nav-link text-white me-4" >ANIMATION</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => { return navigate(`/Genres/12`), setShow(false) }} className="nav-link text-white me-4" >ADVENTURE</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => { return navigate(`/Genres/35`), setShow(false) }} className="nav-link text-white me-4" >COMEDY</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => { return navigate(`/Genres/99`), setShow(false) }} className="nav-link text-white me-4">DOCUMENTARY</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => { return navigate(`/Genres/18`), setShow(false) }} className="nav-link text-white me-4">DRAMA</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => { return navigate(`/Genres/14`), setShow(false) }} className="nav-link text-white me-4">FAMILY</a>
                  </li>

                  <li className="nav-item">
                    <a onClick={() => { return navigate(`/Genres/27`), setShow(false) }} className="nav-link text-white me-4" >HORROR</a>
                  </li>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </nav>

      </header>
    </>
  )
}

export default HEADER
