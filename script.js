const apiKey = "6b66e765bffa2781b5c12a6d1b9b2aab";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const getWeather = async (cityName = "kathmandu", countryCode = "NP") => {
  try {
    const response = await fetch(
      `${apiUrl}${cityName},${countryCode}&APPID=${apiKey}`
    );
    console.log(cityName, countryCode);
    console.log(`${apiUrl}${cityName},${countryCode}&APPID=${apiKey}`);
    const data = await response.json();
    const tempInKelvin = data.main.temp; // default temp is in kelvin
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    const country = data.sys.country;
    const city = data.name;
    const visibility = (data.visibility / 1000).toFixed(2);
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const tempInCelsius = (tempInKelvin - 273.15).toFixed(1); // converting temp in kelvin to celsius
    const milesToKm = 1.60934;
    const windSpeed = (data.wind.speed * milesToKm).toFixed(2);
    const windDirection = data.wind.deg;
    const myDate = new Date();
    const currentDate = myDate.toString().slice(0, 24);
    console.log(windSpeed, windDirection);
    console.log(data);
    console.log(secondsToDateTime(sunrise));
    console.log(secondsToDateTime(sunset));
    document.getElementById("date-time").innerHTML = `${currentDate}`;
    document.getElementById("temperature").innerHTML = ` ${tempInCelsius}°C`;
    document.getElementById("humidity").innerHTML = ` ${humidity}%`;
    document.getElementById("pressure").innerHTML = ` ${pressure}hPa`;
    document.getElementById("wind-speed").innerHTML = ` ${windSpeed}km/h`;
    document.getElementById("wind-direction").innerHTML = ` ${windDirection}°`;
    document.getElementById("visibility").innerHTML = ` ${visibility}km`;
    document.getElementById(
      "weather-description"
    ).innerHTML = `${weatherDescription}`;
    document.getElementById(
      "weather-icon"
    ).src = `https://openweathermap.org/img/w/${weatherIcon}.png`;
    document.getElementById("address").innerHTML = `${city}, ${country
      .toString()
      .toLowerCase()}`;
    document.getElementById("sunrise-text").innerHTML = `${secondsToDateTime(
      sunrise
    )}`;
    document.getElementById("sunset-text").innerHTML = `${secondsToDateTime(
      sunset
    )}`;
  } catch (err) {
    console.error(`Error =  ${err}`);
  }
};

let cities = [];
let selectedCity = {};

const searchCity = () => {
  fetch("./model/cities.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      data.forEach((place) => {
        cities.push({ city: place.name, countryCode: place.country });
      });
    });
};

document.addEventListener("DOMContentLoaded", () => {
  searchCity();

  const searchResult = document.querySelector(".search-result");
  const inputBox = document.getElementById("input-search");

  inputBox.onkeyup = function () {
    let result = [];
    let input = inputBox.value;
    if (input.length) {
      result = cities.filter((keyword) => {
        return keyword.city.toLowerCase().includes(input.toLowerCase());
      });
      //   console.log(result);
    }
    displaySearchResult(result);
    if (!result.length) {
      searchResult.innerHTML = "";
    }
  };

  function displaySearchResult(result) {
    const content = result.map((list) => {
      return `<li onclick="selectInput(this)"> ${list.city}, ${list.countryCode} </li>`;
    });
    searchResult.innerHTML = `<ul> ${content.join("")} </ul>`;
  }

  window.selectInput = function (list) {
    inputBox.value = list.innerHTML;
    const [cityName, countryCode] = inputBox.value
      .toString()
      .split(",")
      .map((item) => item.trim());
    console.log(cityName);
    console.log(countryCode);
    getWeather(cityName, countryCode);
    document.querySelector(".search-result").innerHTML = "";
  };
});

const secondsToDateTime = (time) => {
  const utcDate = new Date(time * 1000);
  const gmt545Date = new Date(utcDate.getTime());
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const year = utcDate.getFullYear();
  const month = utcDate.getMonth();
  const date = utcDate.getDate();
  const day = utcDate.getDay();
  const hour = utcDate.getHours();
  const minute = utcDate.getMinutes();
  const second = utcDate.getSeconds();
  return `${weekday[day].substring(0, 3)}, ${year}/${
    month + 1
  }/${date} ${hour}:${minute}:${second}`; // Format to 'Weekday, YYYY-MM-DD HH:mm:ss'
};

function searchByCity() {
  getWeather(document.getElementById("input-search").value);
  console.log("Hello world");
}

getWeather();
