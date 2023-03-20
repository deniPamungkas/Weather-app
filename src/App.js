import "./App.scss";
import React, { useState } from "react";
import axios from "axios";
import sun from "./bc/sun.jpg";
import rain from "./bc/rain.jpg";
import cloud1 from "./bc/01cloud.jpg";
import cloud2 from "./bc/02cloud.jpg";

function App() {
  const [datan, setDatan] = useState({});
  const [city, setCity] = useState("");
  const key = "b6d68ece3515ef2975e60deb754af423";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  const getData = (event) => {
    if (event.key === "Enter") {
      console.log("getdata");
      axios.get(url).then((response) => {
        const data = response.data;
        const result = {
          kota: data.name,
          suhu: Math.floor(data.main.temp) - 273,
          hum: data.main.humidity,
          desc: data.weather[0].description,
          feel: Math.floor(data.main.feels_like) - 273,
          wind: data.wind.speed,
        }
        setDatan(result);
        setCity("");
      });
    }
  };
  const change = (e) => {
    console.log("change");
    setCity(e.target.value);
  };
  const getBackground = (e) => {
    console.log("background");
    if (e === "scattered clouds" || e === "broken clouds") {
      return cloud1;
    } else if (e === "overcast clouds") {
      return cloud2;
    } else if (e === "rain") {
      return rain;
    } else {
      return sun;
    }
  };
  return (
    <div className="App">
      <img className="background" src={getBackground(datan.desc)} alt="background" />
      <div className="container">
        <div className="top">
          <input
            value={city}
            onKeyPress={getData}
            onChange={change}
            className="input"
            placeholder="type city"
          />
          <div className="data">
            <h2>{datan.kota}</h2>
            <h5>{datan.suhu}^ C</h5>
            <div className="des">
              <h2>{datan.desc}</h2>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="cont-bottom">
            <div className="value">
              <h1>{datan.hum}%</h1>
              <h3>Humidity</h3>
            </div>
            <div className="value">
              <h1>{datan.feel}</h1>
              <h3>Feels Like</h3>
            </div>
            <div className="value">
              <h1>{datan.wind}</h1>
              <h3>Wind</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
