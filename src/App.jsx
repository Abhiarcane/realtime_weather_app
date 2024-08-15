import { HiSearch } from "react-icons/hi";
import drizzle from "../src/assets/drizzle.png";
import clear from "../src/assets/clear.png";
import cloud from "../src/assets/cloud.png";
import rain from "../src/assets/rain.png";
import celsius from "../src/assets/celsius.png";
import humidity_logo from "../src/assets/humidity.png";
import wind_logo from "../src/assets/wind.png";
import { useState, useEffect } from "react";

function App() {
  const api_key = "75a324764c96f89bf5d372bb7f9f6ad6";
  const [input, setInput] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [name, setName] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState("");

  const handleClick = () => {
    if (!input) {
      setError("Please enter a city name.");
      return;
    }
    setError("");

    const fetching = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api_key}`
        );
        const data = await response.json();
        if (data.cod === 200) {
          setFlag(true);
          setTemperature(data.main.temp);
          setName(data.name);
          setHumidity(data.main.humidity);
          setSpeed(data.wind.speed);
          setWeather(data.weather[0].main);
        } else {
          setError(data.message);
          setFlag(false);
        }
      } catch (error) {
        setError("Failed to fetch weather data.");
        setFlag(false);
      }
    };
    fetching();
  };

  useEffect(() => {
    if (weather === "Haze" || weather === "Mist" || weather === "Clouds") {
      setWeather(cloud);
    } else if (weather === "Clear") {
      setWeather(clear);
    } else if (weather === "Rain") {
      setWeather(rain);
    }
  }, [weather]);

  return (
    <div className="bg-white h-screen flex items-center justify-center p-4">
      <div className="bg-gray-600 w-full max-w-md rounded-xl p-6">
        <div className="flex items-center justify-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search the city....."
            className="flex-grow pl-4 pb-2 pt-2 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
          />
          <button
            onClick={handleClick}
            className="bg-white rounded-full p-3 text-2xl text-gray-500 hover:outline-none hover:ring-2 hover:ring-amber-300 focus:ring-offset-2"
          >
            <HiSearch />
          </button>
        </div>
        {!flag && (
          <div className="text-white mt-8 text-center">
            <p className="text-3xl font-medium">Welcome!</p>
            <p className="text-xl p-4">
              Search any city you want to know the weather of.
            </p>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center mt-4 text-xl font-medium">
            {error}
          </div>
        )}
        {flag && !error && (
          <>
            <div className="flex items-center justify-center mt-12">
              <img src={weather} alt="" className="w-40" />
            </div>
            <div className="flex items-center justify-center text-white gap-4 mt-4">
              <div className="relative w-20">
                <p className="text-5xl font-medium">{`${(
                  temperature - 273.15
                ).toFixed(0)}`}</p>
                <div className="absolute top-0 right-0">
                  <img src={celsius} alt="" className="w-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-medium">{name}</div>
            </div>
            <div className="text-xl text-white font-medium flex flex-col sm:flex-row gap-8 sm:gap-36 mt-12 justify-center">
              <div className="flex flex-col items-center">
                <img src={humidity_logo} alt="" className="w-6 mb-2" />
                <div className="text-xl">{`${humidity}`}</div>
                <p className="text-base mt-2 text-center">Humidity</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={wind_logo} alt="" className="w-6 mb-2" />
                <div className="text-xl">{`${speed} Km/hr`}</div>
                <p className="text-base mt-2 text-center">Wind Speed</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
