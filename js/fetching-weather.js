

document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "f4bf0578e4c6065ff8902ea89449046f";
  
    let cityName = document.getElementById("cityName");
    let tempDeg = document.getElementById("tempDegree");
    let tempDesc = document.getElementById("weatherDescription");
    let humidityRate = document.getElementById("humidityRate");
    let windSpeed = document.getElementById("windSpeed");
    let searchButton = document.getElementById("searchButton");
    let searchInput = document.getElementById("searchPannel");
  
    // Prevent form submission
    document.querySelector("form").addEventListener("submit", function (event) {
      event.preventDefault();
    });
  
    // Get current location weather by default
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          alert("Geolocation permission denied. Showing Delhi weather.");
          fetchWeather("Delhi"); // Default city
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      fetchWeather("Delhi"); // Default city
    }
  
    searchButton.addEventListener("click", function () {
      let city = searchInput.value.trim();
      if (city) {
        fetchWeather(city);
      } else {
        alert("Please enter a city name!");
      }
    });
  
    function fetchWeather(city) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
      fetch(URL)
        .then(response => response.json())
        .then(data => updateWeatherUI(data))
        .catch(error => console.error("Error fetching data:", error));
    }
  
    function fetchWeatherByCoords(lat, lon) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  
      fetch(URL)
        .then(response => response.json())
        .then(data => updateWeatherUI(data))
        .catch(error => console.error("Error fetching data:", error));
    }
  
    function updateWeatherUI(data) {
      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }
  
      cityName.innerText = data.name;
      tempDesc.innerText = `${data.weather[0].description}`;
      tempDeg.innerText = `${data.main.temp}°C`;
      windSpeed.innerText = `Wind: ${data.wind.speed} km/h`;
      humidityRate.innerHTML = `Humidity: ${data.main.humidity}% <i class="fa fa-tint" aria-hidden="true"></i>`;
  
      const timestamp = data.dt * 1000;
      const dateObj = new Date(timestamp);
      document.getElementById("todayDay").innerText = dateObj.toLocaleDateString("en-US", { weekday: "long" });
      document.getElementById("todayDate").innerText = dateObj.toLocaleDateString("en-GB");
  
      updateWeatherImage(data.weather[0].main);
    }
  
    function updateWeatherImage(weather) {
      let weatherImage = document.querySelector(".temp-img img");
      let body = document.body;
  
      switch (weather.toLowerCase()) {
        case "clear":
          weatherImage.src = "./images/sun.png";
          body.style.backgroundColor = "#FFBF00";
          break;
        case "clouds":
          weatherImage.src = "./images/cloudy.png";
          body.style.backgroundColor = "#B0BEC5";
          break;
        case "rain":
          weatherImage.src = "./images/rainy-day.png";
          body.style.backgroundColor = "#607D8B";
          break;
        case "thunderstorm":
          weatherImage.src = "./images/thunderstorm.png";
          body.style.backgroundColor = "#4A148C";
          break;
        case "snow":
          weatherImage.src = "./images/snowy.png";
          body.style.backgroundColor = "#E0F7FA";
          break;
        case "fog":
        case "mist":
          weatherImage.src = "./images/foggy.png";
          body.style.backgroundColor = "#D6D6D6";
          break;
        default:
          weatherImage.src = "./images/cloudy.png";
          body.style.backgroundColor = "#FFD700";
          break;
      }
    }
  });
  