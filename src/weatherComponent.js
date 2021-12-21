import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
// import styles from './Weather.module.css';

export default function Weather() {

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [loading, setLoadingState] = useState(true);

  const [country, setCountry] = useState('Default Country');
  const [city, setCity] = useState('Default City');
  const [temperature, setTemperature] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [shortWeather, setShortWeather] = useState('Normal')
  
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [minTemp, setMinTemp] = useState(0);

  const [feelsLike, setFeeslLike] = useState(0);
  const [expectedWeather, setExpWeather] = useState('Normal Sky');

  useEffect(() => {
    async function getWeather() {
      //API DOC https://www.codegrepper.com/code-examples/javascript/weather+api+without+key
      //CSS Gradients https://cssgradient.io/gradient-backgrounds/

      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      setDate(date);
      setTime(time);

      const location = {
        lat: '9.931233',
        lon: '76.267303'
      }

      const res = await fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${location.lat}&lon=${location.lon}`);
      const data = await res.json();
      if(res)
      setLoadingState(false)

      setCountry(data.sys.country)
      setCity(data.name);
      setTemperature(data.main.temp);
      setFeeslLike(data.main.feels_like);
      setShortWeather(data.weather[0].main)

      setHumidity(data.main.humidity);
      setPressure(data.main.pressure);
      setWind(data.wind.speed);
      setVisibility(data.visibility);
      setMaxTemp(data.main.temp_max);
      setMinTemp(data.main.temp_min);
      setExpWeather(data.weather[0].description)
    }
    getWeather();
  }, []);

    if(loading) {
      const loadingText = <h2 style={{color: '#fff'}}>Loading Data...</h2>
      return loadingText
    } else {
      return (
        <div>
          <div style={{width: '600px', height: 'max-content', margin: '0 auto', padding: '16px', borderRadius: '12px', backgroundImage: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)', color: 'white', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px' }}>
            <p style={{textTransform: 'uppercase', marginBottom: '0'}}><strong>Current Weather @ {city}, {country}</strong></p>
            <small style={{textTransform: 'uppercase'}}>{date} {time}</small>

            <div style={{display: 'flex', flexDirection: 'row', margin: '12px 0'}}>
            <div style={{display: 'flex', width: 'max-content', alignItems: 'center', justifyContent: 'start'}}>
              <div style={{width: '60px', height: '60px', borderRadius: '50%', backgroundImage: temperature > 7 ? 'linear-gradient(to right, #f9d423 0%, #ff4e50 100%)':'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)', marginRight: '10px', backgroundColor: '#FFE400'}} />
              <p style={{fontSize: '36px', margin: 0}}>{temperature}<sup>℃</sup></p>
            </div>
            <div style={{marginLeft: '20px'}}>
                <p style={{margin: 0, textTransform: 'uppercase'}}><b>{shortWeather}</b></p>
                <p style={{margin: 0}}>Feels Like &nbsp;&nbsp;{feelsLike}<sup>℃</sup></p>
            </div>
            </div>

            <p style={{textTransform: 'unset'}}>Expect {expectedWeather}. The high will be {maxTemp}<sup>℃</sup>.</p>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '46px', textTransform: 'uppercase'}}>
            
            <div style={{width: '33.33%'}}>
                <p style={{margin: 0}}>Wind</p>
                <small style={{fontSize: '12px'}}>{wind} km/h</small>
            </div>
            <div style={{width: '33.33%'}}>
                <p style={{margin: 0}}>Humidity</p>
                <small style={{fontSize: '12px'}}>{humidity}%</small>
            </div>
            <div style={{width: '33.33%'}}>
                <p style={{margin: 0}}>Visibility</p>
                <small style={{fontSize: '12px'}}>{visibility} KM</small>
            </div>
            <div style={{width: '33.33%'}}>
            <p style={{margin: 0}}>Pressure</p>
            <small style={{fontSize: '12px'}}>{pressure} mb</small>
            </div>
            <div style={{width: '33.33%'}}>
            <p style={{margin: 0}}>Min Temp</p>
                <small style={{fontSize: '12px'}}>{minTemp}<sup>℃</sup></small>
            </div>

            </div>
          </div>
        </div>
      )
    }
}