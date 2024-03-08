import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';
import './Input.css';
import { useState } from 'react';

export const Input = ({ setQuery, units, setUnits }) => {
    const [input, setInput] = useState('');

    const handleSearch = () => {
        if (input !== "") {
            setQuery({q:input})
        }
        setInput("")
    }
    const handleInput = (e) => {
        setInput(e.currentTarget.value)  
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    
    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                setQuery({lat, lon})
            })
        }
    }
    const handleUnits = (e) => {
        const selectedUnit = e.currentTarget.name;
        if (units !== selectedUnit) {
            setUnits(selectedUnit)
        }
    }
    return (
        <div className='container'>
            <div className='wrapper'>
                <input
                    type='text'
                    className='location-input'
                    placeholder='search for location'
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleInput}
                />
                <UilSearch size={25} className='search-icons'
                    onClick={handleSearch}
                />
                <UilLocationPoint size={25} className='search-icons'
                    onClick={handleLocation} />
            </div>
            <div className='temp-scale-section'>
                <button
                    name='metric'
                    className='temp-scale-button'
                    onClick={handleUnits}
                >°C</button>
                <p className='temp-scale'>|</p>
                <button
                    name='imperial'
                    className='temp-scale-button'
                    onClick={handleUnits}
                >°F</button>
            </div>
        </div>
    )
}