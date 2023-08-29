const ForCastData = ({ weatherData }) => {
  return (
    <div className="forecast-card">
      <div className="date">
        <span className="days">
          {new Date(weatherData.dt_txt).toLocaleDateString("en-US", {
            weekday: "long",
          })}
        </span>
        <span className="forecast-date"></span>
      </div>
      <div className="weather">
        <span className="forecast-weather-condition">
          {weatherData?.weather[0]?.description}
        </span>
        <img className="forecast-image-data" src="./Assets/rain.png" alt="" />
      </div>
      <div className="temp">
        <span>Average Temp</span>
        <div>
          <span className="forecast-temp-data">{weatherData?.main?.temp}</span>
          <span>&deg;C</span>
        </div>
      </div>
      <p className="rain">
        <span>Wind Status</span>
        <span className="forecast-rain-data">{weatherData?.wind?.speed}</span>
      </p>
      <div className="humidity">
        <span>Humidity</span>
        <div>
          <span className="forecast-humidity-data">
            {weatherData?.main?.humidity}
          </span>
          <span>%</span>
        </div>
      </div>
    </div>
  );
};

export default ForCastData;
