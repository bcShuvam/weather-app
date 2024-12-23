const getWeather = async (cityName, countryCode) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        cityName == "" ? "Biratnagar" : cityName
      },${
        countryCode == "" ? "NP" : countryCode
      }&APPID=6b66e765bffa2781b5c12a6d1b9b2aab`
    );
    const data = await response.json();
    const tempInKelvin = data.main.temp;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const weatherDescription = data.weather[0].description;
    const country = data.sys.country;
    const city = data.name;
    const visibility = (data.visibility / 1000).toFixed(2);
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const tempInCelsius = (tempInKelvin - 273.15).toFixed(1);
    console.log(data);
    console.log(secondsToDateTime(sunrise));
    console.log(secondsToDateTime(sunset));
    document.getElementById("temperature").innerHTML = ` ${tempInCelsius}°C`;
    document.getElementById("humidity").innerHTML = ` ${humidity}%`;
    document.getElementById("pressure").innerHTML = ` ${pressure}hPa`;
    document.getElementById("visibility").innerHTML = ` ${visibility}km`;
    document.getElementById(
      "weather-description"
    ).innerHTML = `${weatherDescription}`;
    document.getElementById("address").innerHTML = `${city}, ${country
      .toString()
      .toLowerCase()}`;
    document.getElementById("sunrise-text").innerHTML = `${secondsToDateTime(
      sunrise
    )}`;
    document.getElementById("sunset-text").innerHTML = `${secondsToDateTime(
      sunset
    )}`;
  } catch (error) {
    console.error(`Error =  ${error}`);
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
  }/${date} ${hour}:${minute}:${second}`; // Format to 'YYYY-MM-DD HH:mm:ss'
  //   let myDate = new Date();
  //   console.log(myDate);
  //   console.log(`toString = ${myDate.toString()}`);
  //   console.log(`toISOString = ${myDate.toISOString()}`);
  //   console.log(`toLocaleString = ${myDate.toLocaleString()}`);
  //   console.log(`toLocalDateString = ${myDate.toLocaleDateString()}`);
  //   console.log(`toLocalTimeString = ${myDate.toLocaleTimeString()}`);
  //   console.log(`toJson = ${myDate.toJSON()}`);
  //   console.log(typeof Date.now());
  //   let myCreatedDate = new Date(2004, 11, 1);
  //   console.log(myCreatedDate.toDateString());
  //   console.log(myCreatedDate.toLocaleString());
  //   let myFormattedDateTime = new Date("2024-12-13");
  //   console.log(myFormattedDateTime.toDateString());
  //   console.log(myFormattedDateTime.toLocaleString());
  //   const utcDate = new Date(timestamp * 1000);
  // Time stamps
  //   let myTimeStamps = Date.now();
  //   console.log(Math.floor(myTimeStamps / 1000));
  //   console.log(myDate.getTime());
  //   const weekday = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];
  //   const year = myDate.getFullYear();
  //   const month = myDate.getMonth();
  //   const date = myDate.getDate();
  //   const day = myDate.getDay();
  //   const hour = myDate.getHours();
  //   const minute = myDate.getMinutes();
  //   const second = myDate.getSeconds();
  //   console.log(
  //     `${weekday[day]}, ${year}/${month + 1}/${date} ${hour}:${minute}:${second}`
  //   );
  //   console.log(
  //     myDate.toLocaleString("default", {
  //       hour12: true,
  //       year: "numeric",
  //       month: "2-digit",
  //       day: "2-digit",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       second: "2-digit",
  //     })
  //   );
};

function searchByCity() {
  getWeather(document.getElementById("input-search").value);
  console.log("Hello world");
}

getWeather("", "");
