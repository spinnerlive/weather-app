const apikey = "090559a222bcda4828849f41165fab14";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    // Ensure `.weather` and `.error` sections are hidden initially
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "none";

    if (!city) {
        // Show an error if the input is empty
        document.querySelector(".error").style.display = "block";
        document.body.style.backgroundColor = "rgba(232, 62, 62, 0.8)"; // Error background
        return;
    }

    const response = await fetch(apiUrl + city + `&appid=${apikey}`);

    if (response.status === 404) {
        // Show error if the city is invalid
        document.querySelector(".error").style.display = "block";
        document.body.style.backgroundColor = "rgba(232, 62, 62, 0.8)"; // Error background
    } else {
        // Parse weather data and display it
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Set background based on weather condition
        const condition = data.weather[0].main;
        const images = {
            Clouds: "url('https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?cs=srgb&dl=pexels-pixabay-158163.jpg&fm=jpg')",
            Snow: "url('https://wallpaperswide.com/download/snowfall_path_trees_forest_winter-wallpaper-3840x2560.jpg')",
            Clear: "url('https://images.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg?cs=srgb&dl=pexels-pixabay-158827.jpg&fm=jpg')",
            Drizzle: "url('https://img3.wallspic.com/crops/9/5/5/3/3/133559/133559-drizzle-turquoise-building-window-glass-3840x2160.jpg')",
            Thunderstorm: "url('https://images.pexels.com/photos/2684011/pexels-photo-2684011.jpeg?cs=srgb&dl=pexels-amolmande-2684011.jpg&fm=jpg')"
        };
        
        // When data is valid, apply the new background
        document.body.style.backgroundImage = images[condition] || "";        
        document.body.style.backgroundColor = ""; // Reset background for success

        // Show the weather section and hide the error
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

// Event listener for Enter key
searchBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});
