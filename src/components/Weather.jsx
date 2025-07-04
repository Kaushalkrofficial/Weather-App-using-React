import './Weather.css';
import search_icon from '../assets/search_icon.png'
import sun from '../assets/sun.png'
import cloudy from '../assets/cloudy.png'
import weather from '../assets/weather.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'
import rain from '../assets/heavy-rain.png'
import drizzle from '../assets/drizzle.png'
import snow from '../assets/snowflake.png'

import { useEffect, useRef, useState } from 'react';
function Weather() {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": sun,
        "01n": sun,
        "02d": cloudy,
        "03d": cloudy,
        "03n": cloudy,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,

    }

    const search = async (city) => {
        if (city == "") {
            alert("Enter city name ");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=61227014f6ba879482340c4791143e4f`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || sun;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            })
        }
        catch (error) {
            setWeatherData(false);
            console.log("Error in fetching weather data");
        }

    }

    useEffect(() => {
        search("london");
    }, [])
    return (
        <div className="app">
            <div className="searchbar">
                <input ref={inputRef} type="text" placeholder="Enter.." />
                <img src={search_icon} alt="searchbtn" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ?<>
            
            <img src={weatherData.icon} alt="sunicon" className='weather-icon'/>
            <p className='temperature'>{weatherData.temperature}°c</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
            <div className="col">
                <img src={humidity} alt="humidity" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind} alt="windicon" />
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
            </div>
            </> : <></>}
        </div>
    )
}

export default Weather;