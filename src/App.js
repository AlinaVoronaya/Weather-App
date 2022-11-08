import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Info} from "./components/Info/Info";
import {Form} from "./components/Form/Form";
import './App.css';
import {Footer} from "./components/Footer/Footer";

const mapWeatherConditions = (string) => {
    if (string === "Clouds") {
        return "Облачно"
    } else if (string === "Clear") {
        return "Ясно"
    } else if (string === "Thunderstorm") {
        return "Гроза"
    } else if (string === "Drizzle") {
        return "Морось"
    } else if (string === "Rain") {
        return "Дождь"
    } else if (string === "Snow") {
        return "Снег"
    } else if (string === "Rain") {
        return "Дождь"
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
    }, [])

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
            <Form
                location={location}
                setLocation={setLocation}
                searchLocation={searchLocation}
            />
            <div className="container">
                <Info
                    data={data}
                    mapWeatherConditions={mapWeatherConditions}
                />
                <Footer
                    data={data}
                />

            </div>
        </div>
    );
}

export default App;
