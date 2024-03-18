const search = document.getElementById("search");
const inputLocation = document.getElementById("text-search");
const imgWeather = document.getElementById("weather-img");
const temperature = document.getElementById("temperature");
const weatherStatus = document.getElementById("weather-status");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const tooltip = document.getElementsByClassName("tooltip");
const celcius = document.getElementById("celcius");
const status = document.getElementById("status");
const country = document.getElementById("country");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

//images URL and Alt value
const imageURL = {
  clear: {
    src: "/projects/assets/images/SunRise.png",
    alt: "Clear Sky",
  },
  rainy: {
    src: "/projects/assets/images/Rainy.png",
    alt: "Rainy",
  },
  cloudy: {
    src: "/projects/assets/images/Cloudy.png",
    alt: "Cloud",
  },
  snowy: {
    src: "/projects/assets/images/Snowy.png",
    alt: "Snowy Flakes",
  },
  thunderStorm: {
    src: "/projects/assets/images/ThunderStorm.png",
    alt: "Cloud with Thunder",
  },
  windy: {
    src: "/projects/assets/images/Windy.png",
    alt: "Cloud with Wind",
  },
  noLocationFound: {
    src: "/projects/assets/images/NoLocationFound.png",
    alt: "Search Icon with Map",
  },
};

//Open Weather Promise
async function fetchWeatherData(cityName) {
  const apiKey = "db1ea954b66c85e8444faff2c2f18eba";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

// images for weather status
async function weatherImg(data) {
  switch (data.weather[0].main) {
    case "Clear":
      imgWeather.src = imageURL.clear.src;
      imgWeather.alt = imageURL.clear.alt;
      break;
    case "Rain":
      imgWeather.src = imageURL.rainy.src;
      imgWeather.alt = imageURL.rainy.alt;
      break;
    case "Atmosphere":
      imgWeather.src = imageURL.windy.src;
      imgWeather.alt = imageURL.windy.alt;
      break;
    case "Thunderstorm":
      imgWeather.src = imageURL.thunderStorm.src;
      imgWeather.alt = imageURL.thunderStorm.alt;
      break;
    case "Clouds":
      imgWeather.src = imageURL.cloudy.src;
      imgWeather.alt = imageURL.cloudy.alt;
      break;
    case "Snow":
      imgWeather.src = imageURL.snowy.src;
      imgWeather.alt = imageURL.snowy.alt;
      break;
  }
}
//function for fetching weather data
async function handleFetchWeatherData(cityName) {
  fetchWeatherData(cityName).then((data) => {
    if (data.name) {
      weatherStatus.textContent = data.weather[0].description;
      temperature.textContent = `${(data.main.temp - 273.15).toFixed(1)}`;
      humidity.textContent = `${data.main.humidity}%`;
      windSpeed.textContent = `${data.wind.speed} m/s`;
      inputLocation.value = `${data.name}, ${data.sys.country}`;
      status.style.display = "flex";
      temperature.style.display = "block";
      celcius.style.display = "block";
      weatherImg(data);
    } else {
      weatherStatus.textContent = "Oops no location has found!";
      imgWeather.src = imageURL.noLocationFound.src;
      status.style.display = "none";
      temperature.style.display = "none";
      celcius.style.display = "none";
    }
    console.log(data);
  });
}

//initial value
const initialCity = "New York";
handleFetchWeatherData(initialCity);
inputLocation.value = initialCity;

//handle search button
search.addEventListener("click", () => {
  const cityName = inputLocation.value;
  handleFetchWeatherData(cityName);
});

//handle Enter Key
window.addEventListener("keydown", (event) => {
  if (event.defaultPrevented) {
    return;
  }
  if (event.key === "Enter") {
    const cityName = inputLocation.value;
    handleFetchWeatherData(cityName);
  }
});

//remove the intial country whenever the inputLocation is click
inputLocation.addEventListener("click", () => {
  if (inputLocation.value.includes(",")) {
    const commaIndex = inputLocation.value.indexOf(",");
    inputLocation.value = inputLocation.value.slice(0, commaIndex);
  } else {
    return;
  }
});

//handle onChange on inputLocation
inputLocation.addEventListener("change", () => {
  const cityName = inputLocation.value;
  handleFetchWeatherData(cityName);
});
