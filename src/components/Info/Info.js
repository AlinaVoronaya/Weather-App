import React from 'react';
import './Info.css';

export const Info = ({data, mapWeatherConditions}) => {
    return (
        <div className="info">
            <div>
                <p>{data.name}</p>
            </div>
            <div className="info__temp">
                {data.main ? <h1>{data.main.temp.toFixed()}°</h1> : null}
            </div>
            <div className="info__description">
                {data.weather ? <p>{mapWeatherConditions(data.weather[0].main)}</p> : null}
            </div>
        </div>
    )
}