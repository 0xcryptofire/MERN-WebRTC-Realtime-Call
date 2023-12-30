import './App.css';
import { BrowserRouter,
        Routes,
        Route
       } from "react-router-dom";
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
