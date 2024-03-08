import { formatToLocalTime, fiveDaysDate } from '../../services/api';
import './WeatherForecast.css';
import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset
} from '@iconscout/react-unicons';

export const WeatherForecast = ({ weather: {fiveDay, timezone,icon, temp, temp_min, temp_max, sunrise, sunset, humidity, feels_like, title } }) => {
    return (
        <div>
            <div className='weather-forecast-container'>
                <div className='temperature-char'>
                        <p className='forecast-date-time'>{title}</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                            alt=""
                            className='weather-condition-image'
                            size={10}
                        />
                        <p className='temperature'>{`${temp.toFixed()}°`}</p>
                        <div className='temp-info-details'>
                             <div className='temp-info-details-item'>
                        <UilTemperature size={18} className='temp-details-icons' />
                         Real feel:
                         <span className='temp-info-details-unit'>{`${feels_like.toFixed()}°`}</span>
                     </div>
                     <div className='temp-info-details-item'>
                        <UilTear size={18} className='temp-details-icons' />
                        Humidity:
                        <span className='temp-info-details-unit'>{`${humidity.toFixed()}%`}</span>
                    </div>
                     <div className='temp-info-details-item'>
                         <UilWind size={18} className='temp-details-icons' />
                        Wind speed:
                        <span className='temp-info-details-unit'>{`${temp.toFixed()}km/h`}</span>
                     </div>
                        </div>
                    </div>
            </div>
            <div className='sun-details'>
                 <UilSun className="sun-icons" />
                 <p className='sun-details-items'>Rise:
                     <span className='sun-details-item'>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span></p>
                 <p className='sun-details-items'>|</p>
                 <UilSunset className="sun-icons"/>
                <p className='sun-details-items'>Set:
                     <span className='sun-details-item'>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span></p>
                 <p className='sun-details-items'>|</p>
                <UilSun className="sun-icons"/>
                 <p className='sun-details-items'>High:
                     <span className='sun-details-item'>{`${temp_max.toFixed()}°`}</span></p>
                 <p className='sun-details-items'>|</p>
                 <UilSun className="sun-icons"/>
                 <p className='sun-details-items'>Low:
                     <span className='sun-details-item'>{`${temp_min.toFixed()}°`}</span></p>
            </div>
            <div className='weather-forecast-container'>
                {fiveDay && fiveDay?.slice(0,5).map((fiveDayData, index) => (
                    <div key={index} className='temperature-char'>
                        <p className='forecast-date-time'>{fiveDaysDate()[index]}</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${fiveDayData.icon}@2x.png`}
                            alt=""
                            className='weather-condition-image'
                            size={10}
                        />
                        <p className='temperature'>{`${fiveDayData.temp.toFixed()}°`}</p>

                        <div className='temp-info-details'>
                             <div className='temp-info-details-item'>
                        <UilTemperature size={18} className='temp-details-icons' />
                         Real feel:
                         <span className='temp-info-details-unit'>{`${fiveDayData.feels_like.toFixed()}°`}</span>
                     </div>
                     <div className='temp-info-details-item'>
                        <UilTear size={18} className='temp-details-icons' />
                        Humidity:
                        <span className='temp-info-details-unit'>{`${fiveDayData.humidity.toFixed()}%`}</span>
                    </div>
                     <div className='temp-info-details-item'>
                         <UilWind size={18} className='temp-details-icons' />
                        Wind speed:
                        <span className='temp-info-details-unit'>{`${fiveDayData.wind_speed.toFixed()}km/h`}</span>
                     </div>
                        </div> 
                    </div>
                ))}
            </div>
        </div>
    );
};



// export const TempInfo = ({weather:{ details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, daily, timezone}}) => {
//     return (
//         <div>
//             <div className="weather-conditions">
//                 <p className='weather-conditions-text'>{details}</p>
//             </div>
//             <div className='temperature-char'>
//                 {/* <img src={iconURL(icon)}
//                     alt="" className='weather-condition-image'
//                     size={10}
//                 /> */}
//                 {/* <img
//                     src={`${BASE_URL}/img/wn/${icon}.png?appid=${API_KEY}`}
//                     alt=""
//                     className='weather-condition-image'
//                     size={10}
//                 /> */}
//                 <img
//                     src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
//                     alt=""
//                     className='weather-condition-image'
//                     size={10}
//                 />

//                 <p className='temperature'>{`${temp.toFixed()}°`}</p>
//                 <div className='temp-info-details'>
//                     <div className='temp-info-details-item'>
//                         <UilTemperature size={18} className='temp-details-icons' />
//                         Real feel:
//                         <span className='temp-info-details-unit'>{`${feels_like.toFixed()}°`}</span>
//                     </div>
//                     <div className='temp-info-details-item'>
//                         <UilTear size={18} className='temp-details-icons' />
//                         Humidity:
//                         <span className='temp-info-details-unit'>{`${humidity.toFixed()}%`}</span>
//                     </div>
//                     <div className='temp-info-details-item'>
//                         <UilWind size={18} className='temp-details-icons' />
//                         Wind speed:
//                         <span className='temp-info-details-unit'>{`${temp.toFixed()}km/h`}</span>
//                     </div>
//                 </div>
//             </div>
//             <div className='sun-details'>
//                 <UilSun className="sun-icons" />
//                 <p className='sun-details-items'>Rise:
//                     <span className='sun-details-item'>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span></p>
//                 <p className='sun-details-items'>|</p>
//                 <UilSunset className="sun-icons"/>
//                 <p className='sun-details-items'>Set:
//                     <span className='sun-details-item'>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span></p>
//                 <p className='sun-details-items'>|</p>
//                 <UilSun className="sun-icons"/>
//                 <p className='sun-details-items'>High:
//                     <span className='sun-details-item'>{`${temp_max.toFixed()}°`}</span></p>
//                 <p className='sun-details-items'>|</p>
//                 <UilSun className="sun-icons"/>
//                 <p className='sun-details-items'>Low:
//                     <span className='sun-details-item'>{`${temp_min.toFixed()}°`}</span></p>
//             </div>
//         </div>
//     )
// }  

