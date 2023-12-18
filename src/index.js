
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
    console.log(day)

    return `${day} ${hours}: ${minutes}`

}

function displayTemperature(response) {
    console.log(response.data)
    let temperatureElement = document.querySelector("#temperature")
    let cityElement = document.querySelector("#city")
    let descriptionElement = document.querySelector("#description")
    let humidityElement = document.querySelector("#humidity")
    let windElement = document.querySelector("#wind")
    let dateElement = document.querySelector("#date")
    let iconElement = document.querySelector("#icon")

    let celciusTemperature = response.data.main.temp

    temperatureElement.innerHTML = Math.round(celciusTemperature)
    //console.log(temperatureElement)
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt *1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);


}

function handleSubmit (event) {
    event.preventDefault()
    let cityInputElement = document.querySelector("#city-input")
    console.log(cityInputElement.value)
    search(cityInputElement.value)
}


function displayFahrenheitTemperature(event) {
    event.preventDefault()
    let temperatureElement = document.querySelector("#temperature")
    celciusLink.classList.remove("acive");
    fahrenheitLink.classList.add("active");
   

    let fahrenheitTemperature = (celciusTemperature * 9/5) + 32

    temperatureElement.innerHTML = Math.round(fahrenheitTemperature)

}

function displayCelsiusTemperature(event) {
    event.preventDefault()
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round(celciusTemperature)
    celciusLink.classList.add("acive");
    fahrenheitLink.classList.remove("acive");

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
    console.log(position)

    
}

function getcurrentPosition (event) {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition(currentPosition)
}

let currentLocationPosition = document.querySelector("#current")
currentLocationPosition.addEventListener("click", getcurrentPosition)

search("london")

let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSubmit)

// https://api.openweathermap.org/data/2.5/weather?q=london&appid=5aac920d434b269cca2f8d17be5dcc12

let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature)

let celciusLink = document.querySelector("#celsius-link")
celciusLink.addEventListener("click", displayCelsiusTemperature)