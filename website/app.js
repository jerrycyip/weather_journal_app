/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// api constructors for retrieving weather data from openweathermap.org
const apiKey = '';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// event listener that triggers new weather journal entry
document.getElementById('generate').addEventListener('click', newEntry);

// add entry to weather journal
function newEntry(event) {
    // select the input values
    const zipCode = document.getElementById('zip').value;
    const currentMood = document.getElementById('feelings').value;
    // api GET call to openweathermap api with zip code
    getWeather(baseURL, zipCode, apiKey);
    // if API call is successful, POST weather data to server
    //.then
}

// retrieve weather data based on US zip code
const getWeather = async (baseURL, zip, apiKey) => {
    // GET fetch request to openweathermap.org API
    const res = await fetch(baseURL + zip + '&appid=' + apiKey)
    // if successful, log and return weather data
    try {
        const weatherData = await res.json();
        console.log(weatherData.name);
        console.log(weatherData.main.temp);
        console.log(weatherData);
        
        return weatherData;
    } 
    catch (error) {
        console.log("error occured:", error);
    }
}


