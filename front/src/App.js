import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Inicio from './components/Inicio';
import Predecir from './components/Predecir';
import Metricas from './components/Metricas';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/predecir' element={<Predecir />} />
          <Route path='/metricas' element={<Metricas />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
