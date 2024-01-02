
function formatDate (timestamp) {
    let date = new Date(timestamp);
    //console.log(date)
    let hours = date.getHours();
    if(hours < 10) {
        hours = `0${hours}`
    }
    //console.log(hours)
    let minutes = date.getMinutes()
    if(minutes < 10) {
        minutes = `0${minutes}`
    }
    let days = date.getDay();
    //console.log(days)
    weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = weekdays[days]
    //console.log(day)

    return `${day} ${hours}: ${minutes}`

}


function formatDay(timestamp) {
    let date = new Date(timestamp * 1000)
    let day = date.getDay()
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]


    return days[day]
}

function displayForecast(response) {
    //console.log(response)
    let forecast = response.data.daily
    let forecastElement = document.querySelector("#forecast")
    let forecastHTML =  `<div class="row">`;
    //console.log(min_temp)

    forecast.forEach(function(forecastDay, index) {
        
       if (index < 6) {
            //console.log(forecastDay)
            forecastHTML = 
            forecastHTML + `
            <div class= "col-2">
                <div class = "weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                <img src= "https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
                alt="" 
                width = "35"
                />
                <div class = "weather-forecast-temperatures">
                    <span class = "weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
                    <span class = "weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
                </div>
        </div>`

            
       }
    })

    forecastHTML = forecastHTML +  `</div>`
    forecastElement.innerHTML = forecastHTML
    
}


function getForecast(coordinates) {
    let apiKey = "5aac920d434b269cca2f8d17be5dcc12"
    let  unit = "metric"
    let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`
    
    axios.get(apiUrl).then(displayForecast)
}   

function displayTemperature(response) {
    //console.log(response.data.main.temp)
    let temperatureElement = document.querySelector("#temperature")
    let cityElement = document.querySelector("#city")
    let descriptionElement = document.querySelector("#description")
    let humidityElement = document.querySelector("#humidity")
    let windElement = document.querySelector("#wind")
    let dateElement = document.querySelector("#date")
    let iconElement = document.querySelector("#icon")

     celsiusTemperature = response.data.main.temp

    temperatureElement.innerHTML = Math.round(celsiusTemperature)
    
    //console.log(temperatureElement.innerHTML)
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt *1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord)


}

function handleSubmit (event) {
    event.preventDefault()
    let cityInputElement = document.querySelector("#city-input")
    //console.log(cityInputElement.value)
    search(cityInputElement.value)
}


function displayFahrenheitTemperature(event) {
    event.preventDefault()
    let temperatureElement = document.querySelector("#temperature")
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
   

    let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32

    temperatureElement.innerHTML= Math.round(fahrenheitTemperature )

}

function displayCelsiusTemperature(event) {
    event.preventDefault()
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round(celsiusTemperature)
    //console.log(temperatureElement.innerHTML)
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

}



function search (city) {
    let apiKey = "5aac920d434b269cca2f8d17be5dcc12"


    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature)

}

function currentPosition (position) {
    apiKey = "5aac920d434b269cca2f8d17be5dcc12"
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayTemperature)
    //console.log(position)

    
}

function getcurrentPosition (event) {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition(currentPosition)
}

let currentLocationPosition = document.querySelector("#current")
currentLocationPosition.addEventListener("click", getcurrentPosition)


let celsiusTemperature = null

search("Ife")

let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSubmit)



let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature)

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", displayCelsiusTemperature)

