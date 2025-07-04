
import { Fragment } from 'react'
import './App.css'
import Weather from './components/weather';

function App() {
  return (
    <div className='weatherapp'>
        {/* <h2 style={{textAlign:"center",marginBottom:"0px"}}>Weather App </h2> */}
   
        <Weather/>
       
    

    </div>
    
  )
}

export default App;
