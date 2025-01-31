import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import POPULAR from './componentes/POPULAR';
import SEARCH from './componentes/SEARCH';
import DETAILS from './componentes/INFORMATION';
import TOPRATED from './componentes/TOPRATED';
import UPCOMING from './componentes/UPCAMING';
import { Dimension } from './componentes/DIMENSION';
import GENRES from './componentes/GENRES';



function App() {


  return (
<>

<BrowserRouter>
<Routes>

  <Route path='' Component={POPULAR} />
  <Route path='Genres/:id' Component={GENRES} />
  <Route path='Search/:id' Component={SEARCH} />
  <Route path='TopRated' Component={TOPRATED} />
  <Route path='Upcoming' Component={UPCOMING} />
  <Route path="Details/:id" element={<Dimension><DETAILS /></Dimension>} />
</Routes>
</BrowserRouter>
</>
  )
};

export default App;
