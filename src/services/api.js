import { DateTime } from "luxon";
export const API_KEY = 'bc4085c78743adb50c4a4113c266b067';
export const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getData = (infoType, searchParams) => {
    const url = new URL(`${BASE_URL}/${infoType}`);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY }).toString();  

    return fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
};

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, temp_min, temp_max, humidity, feels_like },
        name,
        dt,
        sys: { country, sunrise, sunset },
        wind: { speed },
    } = data;

    const { main: details, icon } = data.weather[0];

    return {
        lat,
        lon,
        temp,
        temp_min,
        temp_max,
        feels_like,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed,
    };
};

const formatForecastWeather = (data) => {
    const { timezone } = data;

    const dailyForecast = data.list.slice(0, 1).map((item) => ({
        title: formatToLocalTime(item.dt, timezone, 'ccc hh:mm a'),
        temp: item.main.temp,
        icon: item.weather[0].icon,
    }));
        const fiveDayForecast = data.list.filter(reading => reading.dt_txt.includes("18:00:00")).map((item) => ({
        title: formatToLocalTime(item.dt, timezone, 'ccc hh:mm a'),
        temp: item.main.temp,
        icon: item.weather[0].icon,
        feels_like: item.main.feels_like,
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
        
        }));

//  console.log(fiveDayForecast);
    return { timezone, daily: dailyForecast, fiveDay: fiveDayForecast };
   
};

export const getFormattedData = async (searchParams) => {
    try {
        const currentWeather = await getData('weather', searchParams).then(formatCurrentWeather);

        if (!currentWeather) {
            throw new Error('Failed to fetch current weather data');
        }

        const { lat, lon } = currentWeather;

        const forecastWeather = await getData('forecast', {
            lat,
            lon,
            units: searchParams.units,
            cnt: 40,
        }).then(formatForecastWeather);
        if (!forecastWeather) {
            throw new Error('Failed to fetch forecast weather data');
        }
        return { ...currentWeather, ...forecastWeather };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}; 
export const formatToLocalTime = (secs, zone, format = "ccc, dd, LLL' | Local time: 'hh:mm a") =>
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export const fiveDaysDate = () => {
    const currentDate = DateTime.local();
    const nextDate = Array.from({ length: 5 }, (_, index) =>
        currentDate.plus({ days: index + 1 }))
    const dates = nextDate.map(date => date.toFormat('MMM dd, ccc'));
    return dates;
}
export const iconURL = code => `http://openweathermap.org/img/wn/${code}@2x.png`;