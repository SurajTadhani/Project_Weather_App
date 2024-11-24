import { Select, SelectItem } from "@nextui-org/react";
import SunRice from "../assets/icons/SunRice";
import WindIcon from "../assets/icons/WindIcon";
import AirIcon from "../assets/icons/AirIcon";
import AirQuality from "../assets/icons/AirQuality";
import Humidity from "../assets/icons/Humidity";
import Feels from "../assets/icons/Feels";
import Visibility from "../assets/icons/Visibility";
import Pressure from "../assets/icons/Pressure";
import SunSet from "../assets/icons/SunSet";
import Sun from "../assets/icons/Sun";
import TimeDays from "../assets/icons/time-and-weekdays-images.webp";
import MapIcon from "../assets/icons/MapIcon";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, subDays } from 'date-fns';





function Content({ stats,city }) {
  const animals = ["Rajkot", "Ahmedabad", "Surat", "Vadodara"];
  const [weatherData, setWeatherData] = useState([]);
 

  useEffect(() => {
    const fetchWeatherData = async () => {
      const today = new Date();
      const tempData = [];

      for (let i = 1; i <= 5; i++) {
        const date = format(subDays(today, i), 'yyyy-MM-dd');
        const url = `https://api.weatherapi.com/v1/history.json?key=48aaf386535449c785251922242505&q=${city}&dt=${date}`;
        try {
          const response = await axios.get(url);
          tempData.push(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }

      // Set the state after all data is fetched
      setWeatherData(tempData);
      // console.log(tempData)
    };

    fetchWeatherData();
  }, [city]);
  return (
    <>
      <div className="container bg-gray-200 space-y-16 p-5 rounded-xl">
        <div className="container  flex mt-5 lg:flex-row flex-col space-y-10 lg:space-y-0">
          <div className="lg:w-2/3  h-auto border-2 p-8 bg-white">
            <div className="flex justify-between md:flex-row flex-col space-y-5 sm:space-y-0  ">
              <div className="">
                Current Weather <br />
                <span className="font-bolder text-3xl">{stats.time}</span>
              </div>
              <div>
                <Select
                  label=""
                  placeholder="Select location for"
                  className="max-w-xs bg-white hidden md:block"
                >
                  {animals.map((animal) => (
                    <SelectItem
                      className="text-2xl"
                      key={animal.value}
                      value={animal.value}
                    >
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>

                <div className="flex space-x-2 text-xl  md:hidden">
                  <MapIcon />
                  <div className="">
                    {stats.location}&nbsp;<span>,</span>
                    {stats.country}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8 text-medium font-medium">
              <div className="flex md:flex-row flex-col space-y-5 sm:space-y-0  items-center space-x-7 pt-5">
                {stats.isDay != 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-20 h-20 text-yellow-400
      text-transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-16 h-16 text-slate-200
      text-transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                )}

                <h1 className="text-5xl font-bold">
                  {stats.temp}
                  <span>c°</span>
                </h1>
                <p>
                  {stats.condition} <br />
                  Feels Like {Math.round(stats.feellike)}%
                </p>
              </div>
              <div>
                There will be mostly sunny skies The High will be {stats.temp}°
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 border-2 p-3 bg-white">
            <div className="body">
              <div class="scroll-container">
                <div class="scroll-content space-y-5">
                  {weatherData.map((dayData, index) => (
                    <p className="rounded-xl days p-2">
                      <div className="flex justify-between items-center mx-4 space-y-4 ">
                        <div className="space-y-4">
                          <div key={index} className="space-y-4 text-start">
                            <h2 className="text-3xl font-bold">{dayData.forecast.forecastday[0].date}</h2>
                            <p className="text-xl">
                              Max Temp:{" "}
                              {dayData.forecast.forecastday[0].day.maxtemp_c}°C
                            </p>
                            <p className="text-xl">
                              Avg Temp:{" "}
                              {dayData.forecast.forecastday[0].day.avgtemp_c}°C
                            </p>
                            <p className="text-xl">
                              Min Temp:{" "}
                              {dayData.forecast.forecastday[0].day.mintemp_c}°C
                            </p>
                            <p className="text-xl">
                              Condition:{" "}
                              {
                                dayData.forecast.forecastday[0].day.condition
                                  .text
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </p>
                  ))}

                  {/* <p className="rounded-xl days p-2">
                    <div className="flex justify-between items-center mx-4 space-y-4 ">
                      <div className="space-y-4">
                        <div>
                          <Sun />
                        </div>
                        <div className="text-xl font-bold">{stats.time}</div>
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold">
                          25<span>c°</span>
                        </h1>
                      </div>
                    </div>
                  </p>
                  <p className="rounded-xl days p-2">
                    <div className="flex justify-between items-center mx-4 space-y-4 ">
                      <div className="space-y-4">
                        <div>
                          <Sun />
                        </div>
                        <div className="text-xl font-bold">20/05/2024</div>
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold">
                          25<span>c°</span>
                        </h1>
                      </div>
                    </div>
                  </p>
                  <p className="rounded-xl days p-2">
                    <div className="flex justify-between items-center mx-4 space-y-4 ">
                      <div className="space-y-4">
                        <div>
                          <Sun />
                        </div>
                        <div className="text-xl font-bold">20/05/2024</div>
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold">
                          25<span>c°</span>
                        </h1>
                      </div>
                    </div>
                  </p>
                  <p className="rounded-xl days p-2">
                    <div className="flex justify-between items-center mx-4 space-y-4 ">
                      <div className="space-y-4">
                        <div>
                          <Sun />
                        </div>
                        <div className="text-xl font-bold">20/05/2024</div>
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold">
                          25<span>c°</span>
                        </h1>
                      </div>
                    </div>
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-5/6 h-auto  md:ms-10  mt-10 space-y-16 ">
          <div className="flex space-x-3 rounded-xl justify-center gap-5 bg-white py-10 lg:flex-row flex-col md:space-y-0 space-y-8">
            <div className="">
              <div className="container">
                <div className="row flex space-x-5  px-5 py-3 bg-slate-200 rounded-xl">
                  <div className="col-md-2">
                    <AirIcon size="20" />
                  </div>
                  <div className="col-md-10 text-lg font-medium">
                    Air Quality <br />
                    <span className="text-5xl font-bold">
                      {Math.round(stats.airQualityValue)}
                    </span>
                    <span className="text-4xl md:px-2">co</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="container">
                <div className="row flex space-x-5 px-5 py-3 bg-slate-200 rounded-xl">
                  <div className="col-md-2">
                    <WindIcon size="20" />
                  </div>
                  <div className="col-md-10 text-lg font-medium">
                    Wind <br />
                    <span className="text-5xl font-bold p-0 m-0">
                      {Math.round(stats.windValue)}{" "}
                      <span className="text-4xl">mph</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="container">
                <div
                  className="row flex space-x-5 px-5 py-3 bg-slate-200
                 rounded-xl"
                >
                  <div className="col-md-2">
                    <Humidity size="20" />
                  </div>
                  <div className="col-md-10 text-lg font-medium">
                    Humidity <br />
                    <span className="text-5xl font-bold p-0 m-0">
                      {Math.round(stats.humidityValue)} <span>%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 rounded-xl justify-center gap-5 bg-white lg:flex-row flex-col lg:p-10 lg:space-y-0 space-y-8 py-10 ">
            <div className="">
              <div className="container">
                <div className="row flex space-x-4  px-5 py-3 bg-slate-200 rounded-xl">
                  <div className="col-md-2">
                    <Visibility />
                  </div>
                  <div className="col-md-10 text-lg font-medium">
                    Visibility <br />
                    <span className="text-5xl font-bold p-0 m-0">
                      {stats.visibilityValue}
                    </span>
                    <span className="text-3xl font-bold px-3">KM</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="container">
                <div className="row flex space-x-5 px-4 py-3 bg-slate-200 rounded-xl">
                  <div className="col-md-2">
                    <Pressure />
                  </div>
                  <div className="col-md-10 text-lg font-medium">
                    Pressure <br />
                    <span className="text-5xl font-bold p-0 m-0">
                      {Math.round(stats.pressureValueIn)}
                      <span className="text-3xl px-5">in</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="container">
                <div className="row flex space-x-5 px-5 py-3 bg-slate-200 rounded-xl">
                  <div className="col-md-2">
                    <Feels />
                  </div>
                  <div className="col-md-10 text-lg font-medium">
                    Feels_like <br />
                    <span className="text-5xl font-bold p-0 m-0">
                      {Math.round(stats.feellike)} <span>%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-5/6 h-auto border-2 p-8 rounded-xl md:ms-10 bg-white">
          <div className="flex justify-around ">
            <div>Sun And Moon Summary</div>
          </div>
          <div className="flex justify-around  items-center lg:flex-row flex-col space-y-14 lg:space-y-0 ">
            <div className="space-y-8 text-medium font-medium">
              <div className="flex items-center space-x-7 pt-5">
                <AirQuality size="20" />
                <div className="space-y-3">
                  <p className="text-3xl font-bold">Air Quality</p>
                  <p className="text-4xl font-bold">
                    {stats.airQualityValueno2}
                    <span className="px-2">
                      <sub className="font-bold text-3xl">no2</sub>
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-7 pt-7">
                <AirQuality size="20" />
                <div className="space-y-3">
                  <p className="text-3xl font-bold">Air Quality</p>
                  <p className="text-4xl font-bold">
                    {stats.airQualityValueo3}
                    <span className="px-2">
                      <sub className="font-bold text-3xl">o3</sub>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex md:space-x-16 items-center md:flex-row flex-col space-y-5 sm:space-y-0 ">
              <div className="text-center">
                <SunRice />

                <p className="text-xl">Sunrise</p>
                <p className="font-bold text-2xl">{stats.sunrisetime}</p>
              </div>
              <div>
                <img
                  className="md:h-32 opacity-70 rounded-xl w-auto md:text-center"
                  src={TimeDays}
                  alt=""
                />
              </div>
              <div className="text-center">
                <SunSet />
                <p className="text-xl">Sunset</p>
                <p className="font-bold text-2xl">{stats.sunsettime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
