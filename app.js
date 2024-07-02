//Obiekt przechowywujący dane pogodowe
weather = {
    city: '',
    temp: '',
    tempMin: '',
    tempMax: '',
    wind: '',
    pressure: '',
    icon: '',
    timezone: '',
    dt:'',
    description: ''
}
//Przypisanie eventu do przycisku "btnGetCity"
const btnGetCity = document.getElementById("btnGetCity")
btnGetCity.addEventListener('click', getCityValue)

//Przypisanie watrości domyślnych z API po załadowaniu strony
window.addEventListener("load", fechWeather("Gdynia") );

//Pobieranie nazwy miasta z inputu "citInput"
function getCityValue(event){
    event.preventDefault()
    const inputCity = document.getElementById('cityInput').value
    fechWeather(inputCity)
}

//Pobieranie danych za pomocą API
function fechWeather(cityName){

    let key = "c083bf2a0bb6f1c87a3ce5c0f5adf729"
    let APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`
    
    fetch(APIurl)
        .then(response => {
        if (!response.ok) {
            throw Error(response.status); 
        }
        return response.json();
        })
        .then(data => {
            //Przypisywanie wartości pobranych z API do właściwości obiektu weather
            weather.city = cityName
            weather.temp = data.main.temp,
            weather.tempMax = data.main.temp_max,
            weather.tempMin = data.main.temp_min
            weather.wind = data.wind.speed,
            weather.pressure = data.main.pressure
            weather.icon = data.weather[0].icon
            weather.timezone = data.timezone
            weather.dt = data.dt
            weather.description = data.weather[0].description
            displayWeather()
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error)
        });
}

// Wyświetlenie pobranej pogody
function displayWeather() {

    // Destrukturyzacja obiektu "weather"
    const {city, temp, tempMax, tempMin, wind, pressure, icon, timezone, dt, description} = weather

    // Przypisanie ikony oraz opisu w tagu iconBox
    const imgURL = `https://openweathermap.org/img/wn/${icon}@4x.png`
    document.getElementById('iconImg').src = imgURL
    document.getElementById('description').innerHTML = description

    // Przypisanie nazwy miasta do tagu "cityName"
    document.getElementById('cityName').innerHTML = city

    // Przypisanie daty do tagu "date"
    const date = getDate(dt, timezone)
    document.getElementById('date').innerHTML = `<span>${date}</span>`

    // Przypisanie warunków pogodowych do elementów tablicy
    const weatherValues = document.querySelectorAll('.weatherValues')
    weatherValues[0].innerHTML = ` ${temp} °C`
    weatherValues[1].innerHTML = ` ${tempMax} °C`
    weatherValues[2].innerHTML = ` ${tempMin} °C`
    weatherValues[3].innerHTML = ` ${wind} m/s`
    weatherValues[4].innerHTML = ` ${pressure} hPa`
}

// Konwetowanie "dt" i "timzone" na datę w konkretnej lokalizacji
function getDate(dt, timezone) {
    const seconds = parseInt(dt, 10) + parseInt(timezone, 10);
    const milliseconds = seconds * 1000;
    const localDate = new Date(milliseconds).toUTCString().slice(0,22)
    return localDate
}



  