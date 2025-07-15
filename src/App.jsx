import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import POPULAR from './componentes/POPULAR';
import SEARCH from './componentes/SEARCH';
import DETAILS from './componentes/INFORMATION';
import TOPRATED from './componentes/TOPRATED';
import UPCOMING from './componentes/UPCAMING';
import GENRES from './componentes/GENRES';

function App() {
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path='' element={<POPULAR />} />
        <Route path='Genres/:id' element={<GENRES />} />
        <Route path='Search/:moviesearch' element={<SEARCH />} />
        <Route path='TopRated' element={<TOPRATED />} />
        <Route path='Upcoming' element={<UPCOMING />} />
        <Route path='Details/:id' element={<DETAILS />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
