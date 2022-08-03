import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Info} from "../Info/Info";
import {Form} from "../Form/Form";
import './App.css';

const mapWeatherConditions = (string) => {
    if (string === "Clouds") {
        return "Облачно"
    }
    return "";
}

function App() {

    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c64a374174e692bfd1fc25bb4d1ed61c&lang=ru&units=metric`

    useEffect(() => {
        console.log("UseEffect");
        navigator.geolocation.getCurrentPosition((position) => {
            getWeather(position.coords.latitude,
                position.coords.longitude)
        }, (err) => console.log(err.message));
    },[])

    const getWeather = (latitude, longitude) => {
        const urlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c64a374174e692bfd1fc25bb4d1ed61c&lang=ru&units=metric`
        axios.get(urlLocation).then((response) => {
            setData(response.data)
            console.log(response)
        })
    }

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(urlCity).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('')
        }
    }

    return (
        <div className="app">

            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyDown={searchLocation}
                    placeholder="Введите город"
                    type="text"
                />
            </div>

            <div className="container">

                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp.toFixed()}°</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{mapWeatherConditions(data.weather[0].main)}</p> : null}
                    </div>
                </div>

                {data.name !== undefined &&
                    <div className="bottom">
                        <div className="feels">
                            {data.main ? <p>{data.main.feels_like.toFixed()}°</p> : null}
                            <p>Ощущается как</p>
                        </div>
                        <div className="humidity">
                            {data.main ? <p>{data.main.humidity} %</p> : null}
                            <p>Влажность</p>
                        </div>
                        <div className="wind">
                            {data.wind ? <p>{data.wind.speed.toFixed()} м/с</p> : null}
                            <p>Скорость ветра</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
