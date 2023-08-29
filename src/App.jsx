import { useState, useEffect } from "react";
import "./style.css";
import searchIcon from "./Assets/search.png";
import rainyDay from "./Assets/rainy-day.png";
import googleMapIcon from "./Assets/google-maps.png";
import pressureIcon from "./Assets/pressure.png";
import windIcon from "./Assets/wind.png";
import sunrise from "./Assets/sunrise.png";
import sunset from "./Assets/sunset.png";
import humidity from "./Assets/humidity.png";
import haze from "./Assets/haze.png";
import feels from "./Assets/weather.png";
import ForCastData from "./components/forecastData";

const API_END_POINT = "http://api.openweathermap.org/data/2.5/forecast";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [inputValue, setInputValue] = useState("");

  //  USE TO INITIAL RENDER/FIRST RENDER
  useEffect(() => {
    fetchWeatherData(
      "q=London&appid=c2fee0b072e78bbdc330954556c679a3&units=metric"
    );
  }, []);

  // IT WILL FETCH DATA FROM API
  const fetchWeatherData = async (query) => {
    const response = await fetch(`${API_END_POINT}?${query}`);
    const data = await response.json();
    data.list = data?.list?.filter((item, index) => {
      if (index % 8 === 0) {
        return item;
      }
    });
    setWeatherData(data);
    console.log(weatherData);
  };

  // IT WILL HANDEL SEARCH INPUT
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // IT WILL HANDEL USER SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputValue) {
      alert("Please Enter City Name");
      return;
    }
    fetchWeatherData(
      `q=${inputValue}&appid=c2fee0b072e78bbdc330954556c679a3&units=metric`
    );
  };

  return (
    <div className="wrapper-container">
      <section className="upper-section">
        <p className="current-weather-heading">Current Weather</p>
        <div className="upper-containers">
          <div className="weather-card">
            <form className="search-container" onSubmit={handleSubmit}>
              <input
                name="search"
                id="search"
                placeholder="Enter City Name"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
              <img src={searchIcon} alt="search-icon" />
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>
            <img src={rainyDay} alt="" className="weather-icon" />
            <p className="weather-temp">
              <span className="curr-temp">30</span>
              <span>&deg;</span>
              <span>C</span>
            </p>
            <p className="weather-status">
              {weatherData && weatherData.list[1].weather[0].main}
            </p>
            <div className="location">
              <img src={googleMapIcon} alt="" />
              <span className="city">
                {weatherData && weatherData.city.name}
              </span>
              <span>,&nbsp;</span>
              <span className="country">India</span>
            </div>
          </div>
          <div className="weather-highlight-container">
            <h2 className="highlight-heading">Today's highlights</h2>
            <div className="highlight-cards">
              <div className="card card-uv">
                <span>Pressure</span>
                <img src={pressureIcon} alt="" />
                <span className="uv-data">
                  {weatherData && weatherData?.list[1]?.main?.pressure}
                </span>
              </div>
              <div className="card card-wind">
                <span>Wind Status</span>
                <img src={windIcon} alt="" />
                <span className="wind-data">
                  {weatherData && weatherData?.list[1]?.wind?.speed}
                  <span>km/h</span>
                </span>
              </div>
              <div className="card card-sun">
                <span>Sunrise & Sunset</span>
                <div className="sunrise">
                  <img src={sunrise} alt="" />
                  <span>
                    {weatherData &&
                      new Date(weatherData?.city?.sunrise).toLocaleTimeString()}
                  </span>
                </div>
                <div className="sunset">
                  <img src={sunset} alt="" />
                  <span>
                    {weatherData &&
                      new Date(weatherData?.city?.sunset).toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <div className="card card-humidity">
                <span>Humidity</span>
                <img src={humidity} alt="" />
                <span>
                  <span className="humidity-data">
                    {weatherData && weatherData.list[1]?.main?.humidity}
                  </span>
                  <span>%</span>
                </span>
              </div>
              <div className="card card-visibility">
                <span>Visibility</span>
                <img src={haze} alt="" />
                <span>
                  <span className="visibility-data">
                    {weatherData && weatherData?.list[1]?.visibility}
                  </span>
                  <span>m</span>
                </span>
              </div>
              <div className="card card-feels-like">
                <span>Feels Like</span>
                <img src={feels} alt="" />
                <span>
                  <span className="feels-like-data">
                    {weatherData && weatherData?.list[1]?.main?.feels_like}
                  </span>
                  <span>&deg;C</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="lower-section">
        <div className="forecast-container">
          <h2 className="forecast-heading">5-Day Forecast</h2>
          {weatherData?.list?.map((item) => (
            <ForCastData key={`${item.dt}`} weatherData={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
