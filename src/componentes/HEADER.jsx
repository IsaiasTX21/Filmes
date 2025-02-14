import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MenuIcon from '@mui/icons-material/Menu';
import Dropdown from 'react-bootstrap/Dropdown';

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

  return (
    <>

      <header>
        <nav className='navbar  justify-content-center sticky-top navbar-expand-md list-unstyled  '>
          <nav className="navbar ">
            <div className="collapse navbar-collapse  " >
              <ul className="navbar-nav">

                <li className="nav-item ">
                  <img width="60" height="40" style={{ right: "10%", position: "relative" }} src="https://img.icons8.com/?size=100&id=0A7EJpuEDaux&format=png&color=ff0000" />
                </li>
                <li className="nav-item">
                  <a onClick={() => navigate("/")} className="nav-link text-white me-1" >POPULAR </a>
                </li>
                <li className="nav-item">
                  <a onClick={() => navigate(`/TopRated`)} className="nav-link text-white me-1 ">TOP RATED</a>
                </li>
                <li className="nav-item">
                  <a onClick={() => navigate(`/Upcoming`)} className="nav-link text-white me-1" >UP COMING</a>
                </li>
              </ul>
            </div>
          </nav>

          <div className='d-flex'>


            <Offcanvas show={show} style={{ width: '50%', background: " rgb(0, 0, 0)" }} onHide={handleClose}>

              <Offcanvas.Header className='button d-flex text-center ' style={{ width: '90%', background: " rgb(161, 12, 12)", color: "red", left: "5%" }} closeButton  >

                <Offcanvas.Title className='text-white m-auto d-flex'>Responsive</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='text-center'>

                <ul className="navbar-nav ">


                  <li className="nav-item">
                    <a onClick={() => navigate("/")} className="nav-link text-white me-4" >POPULAR</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => navigate(`/TopRated`)} className="nav-link text-white me-4" >TOP RATED</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => navigate(`/Upcoming`)} className="nav-link text-white me-4" >UP COMING</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => navigate(`/Genres/28`)} className="nav-link text-white me-4" >ACTION</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => navigate(`/Genres/80`)} className="nav-link text-white me-4" >CRIME</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => navigate(`/Genres/12`)} className="nav-link text-white me-4" >ANIMATION</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => navigate(`/Genres/12`)} className="nav-link text-white me-4" >ADVENTURE</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => navigate(`/Genres/35`)} className="nav-link text-white me-4" >COMEDY</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => navigate(`/Genres/99`)} className="nav-link text-white me-4">DOCUMENTARY</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => navigate(`/Genres/18`)} className="nav-link text-white me-4">DRAMA</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => navigate(`/Genres/14`)} className="nav-link text-white me-4">FAMILY</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => navigate(`/Genres/16`)} className="nav-link text-white me-4" >HISTORY</a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => navigate(`/Genres/27`)} className="nav-link text-white me-4" >HORROR</a>
                  </li>

                </ul>

              </Offcanvas.Body>
            </Offcanvas>


            <Button variant=" btn btn-outline-danger  text-center rounded-0 Menu " className='d-md-none ' onClick={handleShow}>
              <MenuIcon className='d-md-none' onClick={handleShow} />
            </Button>

            <Dropdown>
              <Dropdown.Toggle variant='' style={{ "backgroundColor": " rgb(31, 28, 28)" }} id="dropdown-basic" className='me-2 text-light  '>
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
                <Dropdown.Item onClick={() => navigate(`/Genres/16`)}>History</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(`/Genres/27`)}>Horror</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <input className='form-control rounded-0 border-0 ' required onChange={inputchange}></input>
            <button className='btn btn-outline-danger ms-1 text-center rounded-0' onClick={searchmovie} >Search</button>

          </div>



        </nav>

      </header>
    </>
  )
}

export default HEADER
