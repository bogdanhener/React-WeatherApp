import React, {useState} from 'react';
import AddIcon from "@material-ui/icons/Add";
import Fab from '@material-ui/core/Fab';


const api ={
  key: "19badfd866d42c91f3be8356564fbb15",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query, setQuery] =useState("");
  const [weather, setWeather] =useState({});

  const search = event => {
    if(event.key === "Enter"){
     searchClick()
    }
  }

  function searchClick(){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery("")
        setWeather(result)
      });
  }

 

  const dateBuilder =(d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day= days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return ` ${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined")
     ? ((weather.main.temp > 16 && weather.main.temp  < 20) 
        ? 'app spring' 
        : (weather.main.temp > 20)
        ? 'app summer'
        :(weather.main.temp > 10 && weather.main.temp < 16) 
        ? 'app autumn' 
        : (weather.main.temp > 0 && weather.main.temp < 10)? 'app winter': "app") 
     : 'app '}>
    <main>
      <div className="search-box">
        <input 
          type="text"
          className="search-bar"
          placeholder="Enter city.."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
        
        <Fab size="small" aria-label="add" onClick={searchClick}>
           <AddIcon className="addbtn"/>
        </Fab>
        
      </div>
      {(typeof weather.main != "undefined") ? (
        <div>
        <div className="location-box">
           <div className="location">{weather.name}, {weather.sys.country}</div>
           <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
         <div className="temp">
          {Math.round(weather.main.temp)}°c
         </div>
         <div className="weather">
          {weather.weather[0].main}
        </div>
        </div>
      </div>
      ) : ('')}
    </main>
     
    </div>
  );
}

export default App;
