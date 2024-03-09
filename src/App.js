import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';


function App() {  
  const [thedata, setData] = useState([]);
  const [location, setLocation]  = useState('')

  useEffect(()=>{
    getSearch();
  })

    const getSearch = async (event) =>{
      if(event){
        if(event.key === 'Enter' && location){
          const url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
          const searched = await url.json()
          setData([searched])
          console.log(searched)
        }
      }
    }

  return (
      <div className="App">
        <h1>Weather App</h1>
        <Inputcontainer className='Inputbox'
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={(event) => getSearch(event)}
        placeholder='Enter Location'
      />
      {thedata.map((data)=>{
        return(
          <Divcontainer className='Divcontainer' key={data.id}>
          <h1>{data.name}</h1>
          <h3>{data.main.temp}°</h3>
          <h4>{data.weather[0].main}</h4>
          <img src ={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} 
         alt="wthr img" />
          <h4 className='Windspeed'>{data.wind.speed}</h4>
          </Divcontainer>
        )
      })}
    </div>
  );
}


const Divcontainer = styled.div`
  height: 400px;
  width: 500px;
  gap: 1.5rem;
  border-radius: 20px;
  background: #1363DF;
  animation: fadeInAnimation ease 3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  @keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
     }
  }
  
  h1{
    font-size: 25pt;
    display: flex;
    left: 10%;
    position: relative;
    top: 8%;
    color: #ffff;

  }

  h4{
    font-size: 20pt;
    display: flex;
    top: 35%;
    position: relative;
    left: 10%;
    color: #ffff;

  }
  h3{
    position: relative;
    top: 30%;
    left: 60%;
    font-size: 40pt;
    text-align: left;
    color: #ffff;
  }

  .Windspeed{
    font-size: 20pt;
    display: flex;
    top: 30%;
    position: relative;
    left: 10%;
  }

  img{
    height: 50px;
    top: 25%;
    width: auto;
    right: 15%;
    margin: 0;
    padding: 0;
    position: relative;
  }

`

const Inputcontainer = styled.input`
    border: none;
    height: 40px;
    width: 420px;
    font-size: 16pt;
    background-color: #EEEEEE;
    border: none;
    border-radius: 12px;
    margin-top: 20px;
`;

export default App;
