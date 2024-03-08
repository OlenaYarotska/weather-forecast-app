import './LocalParams.css';
import { formatToLocalTime } from '../../services/api';


export const LocalParams = ({ weather: { dt, timezone, name, country } }) => {

    return (
        <div>
            <div className="container">
                <p className='date-text'>{formatToLocalTime(dt, timezone)}</p>
            </div>
            <div className="container">
                <p className='location-text'>{`${name}, ${country}`}</p>
            </div>
        </div>
    ) 
}