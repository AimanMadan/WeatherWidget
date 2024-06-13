class WeatherWidgetCard {
    // Initializes the widget with the API key and calls init()
    constructor() {
        this.apiKey = 'apikey'; // Replace 'YOUR_API_KEY' with your API key
        this.units = 'imperial';
        this.currentCity = '';
        this.init();
    }

    // Sets up event listeners for search button, Enter key, and unit toggle button
    init() {
        const searchButton = document.querySelector('[data-search]');
        const searchInput = document.querySelector('.search input');

        // When the search button is clicked, fetch the weather for the city entered in the input field
        searchButton.addEventListener('click', () => {
            const city = searchInput.value;
            this.currentCity = city;
            this.getWeather(city);
        });

        // When Enter key is pressed in the input field, fetch the weather for the city entered
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const city = searchInput.value;
                this.currentCity = city;
                this.getWeather(city);
            }
        });

        // When the unit toggle button is clicked, switch units and fetch the weather for the current city if available
        document.querySelector('[data-units]').addEventListener('click', () => {
            this.toggleUnits();
            if (this.currentCity) {
                this.getWeather(this.currentCity);
            }
        });
    }

    // Fetches weather data for a given city from the OpenWeatherMap API
    async getWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=${this.units}`);
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
        document.querySelector('.temp').textContent = `${Math.round(data.main.temp)} ${this.units === 'imperial' ? '°F' : '°C'}`;
        document.querySelector('.City').textContent = data.name;
        document.querySelector('.humidity').textContent = `${data.main.humidity}%`;
        document.querySelector('.wind').textContent = `${data.wind.speed} ${this.units === 'imperial' ? 'mph' : 'm/s'}`;
    }

    // Returns the appropriate weather image based on the weather condition
    getWeatherImage(weather) {
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

    // Toggles between imperial and metric units and updates the button text accordingly
    toggleUnits() {
        this.units = this.units === 'imperial' ? 'metric' : 'imperial';
        document.querySelector('[data-units]').textContent = this.units === 'imperial' ? 'Switch to Celsius' : 'Switch to Fahrenheit';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WeatherWidgetCard();
});
