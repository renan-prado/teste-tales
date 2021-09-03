import React, { useState } from 'react';
import { WiSunset,WiSunrise,WiHumidity } from 'react-icons/wi';
import { FaTemperatureHigh,FaTemperatureLow } from 'react-icons/fa';

const api = {
  key: "b6b6e7d11ae746c9671f28d753112dfb",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  //Busca ao Apertar Enter
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }


  //Ajuste para data atual
  const dataAtual = (d) =>{

    let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sabádo"];
    
    let dia = dias[d.getDay()];
    let data = d.getDate();
    let mes = meses[d.getMonth()];
    let ano = d.getFullYear();
  
    return `${dia}, ${data} ${mes} ${ano}`  
  }

  //Formatação da Segundos para hora
  const formatDuration = (seconds) =>{
    return new Date(seconds * 1000).toISOString().substr(11, 8) ;
  }

  return (
    <div className="app">
      <main>
        <div className="header-text"><h2>Como esta o clima?</h2></div>
        
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Pesquise sua cidade..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div className="result-box">
          <div className="local-box">
            <div className="local">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dataAtual(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              <p>Agora </p>
              {Math.round(weather.main.temp)}°c
              <span className="sensacao">Sensação termica de: {Math.round(weather.main.feels_like)}°c</span>
            </div>
            <div className="weather-infos w-max"> {Math.round(weather.main.temp_max)}°c <span><FaTemperatureHigh /> Máxima </span></div>
            <div className="weather-infos w-min">{Math.round(weather.main.temp_min)}°c <span><FaTemperatureLow /> Minima</span></div>
            
            
           
          </div>
          <div className="sub-infos">
              <div className="weather-infos">{Math.round(weather.main.humidity)}%  <span>Umidade</span><WiHumidity /></div>
              <div className="weather-infos"> {formatDuration(weather.sys.sunrise)}  <span>Nascer do Sol </span><WiSunrise /></div>
              <div className="weather-infos">{formatDuration(weather.sys.sunset)}  <span>Por do Sol</span><WiSunset /></div>
            </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;