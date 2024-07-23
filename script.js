document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = process.env.API_KEY;
    const getWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const weatherResult = document.getElementById('weatherResult');
    const loadingSpinner = document.getElementById('loadingSpinner');

     weatherResult.innerHTML = '';
     loadingSpinner.style.display = 'block';

    fetch(getWeather)
        .then(response => response.json())
        .then(data => {
            loadingSpinner.style.display = 'none';
            if (data.cod === 200) {
                const weatherInfo = `
                    <h2>${data.name}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
                weatherResult.innerHTML = weatherInfo;
            } else {
                weatherResult.innerHTML = `<p>City not found. Please try again.</p>`;
            }
        })
        .catch(error => {
            const weatherResult = document.getElementById('weatherResult');
            weatherResult.innerHTML = `<p>Unable to fetch weather data. Please try again later.</p>`;
            console.error('Error fetching weather data:', error);
        });
});
