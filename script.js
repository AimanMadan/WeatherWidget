//This JavaScript code defines a class WeatherWidgetCard that creates a weather widget.
// The widget fetches and displays weather data for a given city from the OpenWeatherMap API.

class WeatherWidgetCard {
    //initializes the widget with the API key and calls init()
    constructor() {
        this.apiKey = 'get_your_API_ke'; // Replace 'YOUR_API_KEY' with your API key
        this.init();
    }

     //adds an event listener to the search button
    init() {

        document.querySelector('[data-search]').addEventListener('click', () => {
             // When the search button is clicked, fetch the weather for the city entered in the input field
            const city = document.querySelector('.search input').value;
            this.getWeather(city);
        });
    }

    //etches weather data for a given city from the OpenWeatherMap API
    async getWeather(city) {

        try {

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=imperial`);
            const data = await response.json();

            // Once the data is fetched, update the widget with the new weather data
            this.updateWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }


    // The updateWeather method updates the widget with new weather data

    updateWeather(data) {


        document.querySelector('.weather img').src = this.getWeatherImage(data.weather[0].main);
        document.querySelector('.temp').textContent = `${Math.round(data.main.temp)} °F`;
        document.querySelector('.City').textContent = data.name;
        document.querySelector('.humidity').textContent = `${data.main.humidity}%`;
        document.querySelector('.wind').textContent = `${data.wind.speed} mph`;

    }

    //weather images 
    getWeatherImage(weather)
    
    {
        switch (weather.toLowerCase()) {
            case 'clear':
                return 'images/clear.png';
            case 'clouds':
                return 'images/clouds.png';
            case 'rain':
                return 'images/rain.png';
            case 'snow':
                return 'images/snow.png';
            default:
                return 'images/night.png';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WeatherWidgetCard();
});
