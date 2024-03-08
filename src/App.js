import './App.css';
import { Input } from './components/Input/Input';
import { LocalParams } from './components/Local Params/LocalParams';
import { WeatherForecast } from './components/Weather Forecast/WeatherForecast';
import { getFormattedData } from './services/api';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './components/Loader/Loader';

  
const App = () => {
  const [query, setQuery] = useState({ q: 'Paris' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
 
 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
        try {
          const data = await getFormattedData({ ...query, units });
            setWeather(data);
            toast.success('Here is the weather');
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch weather data');
        } finally {
          setLoading(false)
        }
    };

    fetchData();
}, [query, units]);

  return (
    <div className='Container'>
      <Input setQuery={setQuery}
        units={units} setUnits={setUnits}
      />
      {loading && <Loader />}
      {weather && !loading &&(
      <>
          <LocalParams weather={weather} />
          <WeatherForecast weather={weather} />

      </>
      )}
      <ToastContainer autoClose={4000} theme="colored" newestOnTop={true} />
    </div>
  )
}
export default App;
