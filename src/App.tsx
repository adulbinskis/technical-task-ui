import {FC, lazy, useContext, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import { Context } from './store/rootContextProvider';

const Header = lazy(() => import('./components/Header/Header'));
const MainBoard = lazy(() => import('./components/MainBoard/MainBoard'));
const Product = lazy(() => import('./components/Products/Product'));  


const App: FC =()=> {
  const { store } = useContext(Context);
  
  useEffect(() => {
    if(localStorage.getItem('token') ){
      store.checkAuth()
    }
     
  }, []);

  return (
    <div className='content-div'>
      <Router>
          <Header/>
          <Routes>
             <Route  path='/' element={ <MainBoard/> }/>
            <Route path='/product/:id' element={ <Product/> }/> 
          </Routes> 
      </Router>
    </div>
  );
}

export default observer(App)