import React from 'react';
import './Footer.css';

export const Footer = ({data}) => {
    return (
        <>
            {data.name !== undefined &&
                <div className="footer">
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
        </>
    )
}