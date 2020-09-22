/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// api constructors for retrieving weather data from openweathermap.org
const apiKey = '2ad76e8d73c762b9428f448e8ecc3119';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const units = '&units=imperial';

// weather icon = URL plus + iconID + '@2x.png'
const iconURL = 'http://openweathermap.org/img/wn/'; 
const iconFormat = '@2x.png'

// event listener that triggers new weather journal entry
document.getElementById('generate').addEventListener('click', newEntry);

// add entry to weather journal
function newEntry(event) {
    // select the input values
    const zipCode = document.getElementById('zip').value;

    const currentMood = document.getElementById('feelings').value;
    // api GET call to openweathermap api with zip code
    getWeather(baseURL, zipCode, apiKey, units)
    // if API call is successful, POST weather data to server
    .then (function (weatherData){
        postEntry('/add', {date: newDate, weather: weatherData.weather[0]['description'], 
            icon: weatherData.weather[0]['icon'], temp: weatherData.main.temp, 
            city: weatherData.name, mood: currentMood});
    })
    .then (function(newEntry){
        updateUI('/all');
    })
}

// retrieve weather data based on US zip code
const getWeather = async (baseURL, zip, apiKey, units) => {
    // GET fetch request to openweathermap.org API
    const res = await fetch(baseURL + zip + units + '&appid=' + apiKey )
    // if successful, log and return weather data
    try {
        const weatherData = await res.json(); 
        console.log(weatherData);       
        return weatherData;
    } 
    catch (error) {
        console.log("error occurred:", error);
    }
}

const postEntry = async (url='', data={}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            date: data.date,
            weather: data.weather,
            icon: data.icon,
            temp: data.temp,
            city: data.city,
            mood: data.mood
        })
    })
    try {
        const newEntry = await res.json();
        return newEntry;
    }
    catch (error) {
        console.log("error occurred:", error);
    }
}

const updateUI = async(url='') => {
    const res = await fetch(url,{
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json;charset=UTF-8'
        }
    })
    try {
        allEntries = await res.json();
        latestEntry = allEntries[allEntries.length-1];
        weatherIcon = latestEntry.icon;
        document.getElementById('date').innerHTML = latestEntry.date;
        document.getElementById('temp').innerHTML = latestEntry.temp;
        document.getElementById('weather').innerHTML = latestEntry.weather;
        document.querySelector('.weather-icon').innerHTML = `<img src="${iconURL}${weatherIcon}${iconFormat}" alt="weather-icon"> </img>`;
        document.getElementById('content').innerHTML = latestEntry.mood;
        console.log(allEntries);
    }
    catch (error) {
        console.log("error occurred:", error);
    }
}


