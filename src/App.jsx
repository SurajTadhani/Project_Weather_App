import Navigation from "./components/Navigation";
import Content from "./components/Content";
import { useState, useEffect } from "react";
import Spinner from "./components/Spinner";

function App() {
  const currentDate = new Date();
  const [city, setCity] = useState("ahmedabad");

  const [datetime, setDateTime] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [sunData, setsunData] = useState(null);
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=48aaf386535449c785251922242505&q=${city}&aqi=yes`;
  const urlApi = `https://api.weatherapi.com/v1/astronomy.json?key=48aaf386535449c785251922242505&q=${city}&dt=${datetime}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Data fetch error");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setWeatherData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);

  useEffect(() => {
    fetch(urlApi)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Data fetch error");
        }
        return response.json();
      })
      .then((data) => {
        setsunData(data);
        setDateTime(currentDate);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);

  // console.log(weatherData)

  return (
    <>
      {weatherData ? (
        <>
          <Navigation
            setCity={setCity}
            stats={{
              location: weatherData.location.name,
              country: weatherData.location.country,
              time: weatherData.location.localtime,
            }}
          />
          <Content
            city={city}
            stats={{
              time: weatherData.location.localtime,
              temp: weatherData.current.temp_c,
              humidityValue: weatherData.current.humidity,
              windValue: weatherData.current.wind_mph,
              feellike: weatherData.current.feelslike_c,
              pressureValueIn: weatherData.current.pressure_in,
              isDay: weatherData.current.is_day,
              visibilityValue: weatherData.current.vis_miles,
              airQualityValue: weatherData.current.air_quality.co,
              airQualityValueno2: weatherData.current.air_quality.no2,
              airQualityValueo3: weatherData.current.air_quality.o3,
              sunsettime: sunData.astronomy.astro.sunset,
              sunrisetime: sunData.astronomy.astro.sunrise,
              location: weatherData.location.name,
              country: weatherData.location.country,
              condition: weatherData.current.condition.text,
            }}
          />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default App;
