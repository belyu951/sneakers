import { Routes, Route } from 'react-router-dom';
 


//импорт компонентов
import Basket from './components/headerBasket/basket/Basket';
import Home from './components/homePage/Home';
import LoginIn from './components/loginIn/LoginIn';


//импорт стили
import './resetStyles.scss'


function App() {



  return (
    <>
      <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/basketPurchase' element={<Basket/>}/>
            <Route path='/loginIn' element={<LoginIn/>}/>
        </Routes>
      </>
  );
}

export default App;



