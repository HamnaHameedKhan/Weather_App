import { useEffect, useRef, useState } from 'react'
import './App.css'
import search from './assets/search.png'
import clear from './assets/clear.png'
import humidity from './assets/humidity.png'
import wind from './assets/wind.png'
import cloud from './assets/cloud.png'
import drizzle from './assets/drizzle.png'
import snow from './assets/snow.png'
import rain from './assets/rain.png'



function App() {
  const [weatherData, setWeatherData] = useState(false)

  const inputRef = useRef()

  const allIcon = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,

  }
  const Search = async (city) => {
    if (city === '') {

      document.getElementById('city_error').classList.remove('hidden')

    }
    else {
      document.getElementById('city_error').classList.add('hidden')

    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_URL}`

      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        document.getElementById('no_city').classList.remove('hidden')
      }
      else {
        document.getElementById('no_city').classList.add('hidden')

      }
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        temperature: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        location: data.name,
        icon: allIcon[data.weather[0].icon] || clear
      })
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>

      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-blue-950" >
        <h1 className='uppercase text-5xl text-white font-sans font-bold mb-5'>Weather App</h1>
        <div className="flex flex-col mx-auto p-3 text-center bg-gradient-to-r from-sky-500 to-indigo-500 h-auto max-w-md justify-center items-center rounded-lg font-mono">
          <div className='flex flex-row gap-5 mt-5'>

            <input type='text' placeholder='Search City' className='rounded-3xl px-5 outline-none bg-white w-60'
              ref={inputRef}
            />
            <img src={search} alt='search' className='bg-white rounded-full p-3' onClick={() => Search(inputRef.current.value)} />
          </div>
          <p className='hidden text-red-500 text-xl font-bold' id='city_error'>Please Enter City Name</p>
          <p className='hidden text-red-500 text-xl font-bold' id='no_city'>City Not Found</p>
          {weatherData ? <>
            <div>
              <img src={weatherData.icon} alt='weather' />
              <p className='text-white text-7xl font-mono'>{weatherData.temperature}<sup>o</sup>c</p>
              <p className='text-white text-3xl'>{weatherData.location}</p>
            </div>


            <div className='flex flex-row gap-20 mt-10 p-3 '>
              <div className='flex flex-row gap-3'>

                <img src={humidity} alt='humidity' className='h-10' />
                <div className='text-white text-xl'>
                  <p className='text-left text-2xl'>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>

              </div>

              <div className='flex flex-row gap-3'>

                <img src={wind} alt='wind' className='h-10' />
                <div className='text-white text-xl'>
                  <p className='text-left text-2xl'>{weatherData.windSpeed}Km/h</p>
                  <span>Wind Speed</span>
                </div>

              </div>
            </div>
          </> : <></>}

        </div>
      </div>
    </>
  )
}

export default App
