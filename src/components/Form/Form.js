import React from 'react';
import './Form.css';

export const Form = ({location, setLocation,searchLocation }) => {
    return (
        <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyDown={searchLocation}
                    placeholder="Введите город"
                    type="text"
                />
            </div>

    )
}