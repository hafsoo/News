import React,{Component}from 'react'
import './App.css';
import Navbar from './components/Navbar.js';
import News from './components/News';
import {
  HashRouter ,
  Routes,
  Route,
} from "react-router-dom";
export default class App extends Component{
 render(){
    return (
      <div>
        <HashRouter>
          <Navbar />
          
          <Routes>
            
            <Route path='/business'  element={<News key='business'  pageSize={5} country='in' category='business' />}></Route>
            <Route path='/entertainment'  element={<News key='entertainment'  pageSize={5} country='in' category='entertainment' />}></Route>
            <Route path='/health' element={<News key='health' pageSize={5} country='in' category='health' />}></Route>
            <Route path='/science' element={<News key='science'  pageSize={5} country='in' category='science' />}></Route>
            <Route path='/sports'  element={<News key='sports'  pageSize={5} country='in' category='sports' />}></Route>
            <Route path='/technology'  element={<News key='technology'  pageSize={5} country='in' category='technology' />}></Route>
          </Routes>
        </HashRouter>
      </div>
    )
  
}
}



    
    
    
    