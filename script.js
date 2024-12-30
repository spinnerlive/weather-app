const apikey = "090559a222bcda4828849f41165fab14";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`)

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // if (data.weather[0].main == "Clouds") {
        //     document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/85/db/41/85db411e5bebff00b8a21f6d29d8c394.gif')"
        // }
        // else if (data.weather[0].main == "Snow") {
        //     document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/e4/a6/b9/e4a6b92746b595562938d01b6a5e4445.gif')";
        // }
        // else if (data.weather[0].main == "Clear") {
        //     document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/b7/c9/7c/b7c97c86b73d9bfb391da464bb7e2d48.gif')";
        // }
        // else if (data.weather[0].main == "Drizzle") {
        //     document.body.style.backgroundImage = "url('https://media1.tenor.com/m/flrzm9Gz3CQAAAAC/kotonoha-no-niwa-rain.gif')";
        // }
        // else if (data.weather[0].main == "Thunderstorm") {
        //     document.body.style.backgroundImage = "url('https://images.squarespace-cdn.com/content/v1/6659ea54bcfef0581cd18423/3680e070-19ff-46ee-b9e4-2b7b2de7b9ba/background-ry.gif')"
        // }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})


