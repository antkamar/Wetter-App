
function handleEnter(event) {
        
    if (event.key === 'Enter') {
        fetchWeather();
    }
}



function fetchWeather() {
    const city = document.getElementById('city-input').value;
    const apiKey = 'bab281d79e5f1e9755a68d754cc313e7'; // API-Schlüssel hier einfügen
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;

    

    fetch(apiUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(function(data) {
            displayWeather(data);
        })
        .catch(function(error) {
            console.error('Fehler:', error);

            document.body.style.backgroundImage = "url('./Bilder/fehler.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";
            
            var weatherOutput = document.getElementById('weather-output');
            weatherOutput.innerHTML = `<p>Stadt nicht gefunden.</p>`;
            weatherOutput.style.display = 'block';
        });
}

function displayWeather(data) {
    const weatherOutput = document.getElementById('weather-output');
    if (data && data.weather && data.main) {
        const timezoneOffset = data.timezone;
        const localDate = new Date(Date.now() + timezoneOffset * 1000);
        const localTime = localDate.toLocaleTimeString([0], );
       
        weatherOutput.innerHTML = `
            <h2>Wetter in ${data.name}</h2>
            <p>Temperatur: ${data.main.temp} °C</p>
            <p>WindGeschwindigkeit: ${data.wind.speed} miles/hour</p>
            <p> Luftfeuchtigkeit: ${data.main.humidity} % </P>
            <p>Beschreibung: ${data.weather[0].description}</p>
            <p>Ortzeit: ${localTime}</p> 
        `;
        weatherOutput.style.display = 'block'; // Ausgabe anzeigen
    } else {
        weatherOutput.innerHTML = `<p>Stadt nicht gefunden.</p>`;
        weatherOutput.style.display = 'block'; // Ausgabe anzeigen
    }
 
}

function displayWeather(data) {
    var weatherOutput = document.getElementById('weather-output');
    var appMain = document.querySelector('.app-main'); 

    if (data && data.weather && data.main) {
        
       
        weatherOutput.innerHTML = `
            <h2>Wetter in ${data.name}</h2>
            <p>Temperatur: ${data.main.temp} °C</p>
           
            <p>Beschreibung: ${data.weather[0].description}</p>
            <p>------------------------</p>
           <p> Minimale Temperatur: ${data.main.temp_min} °C </p>
           <p> Maximale Temperatur: ${data.main.temp_max} °C </p>
           <p>------------------------</p>
           <p> Luftfeuchtigkeit: ${data.main.humidity} % </P>
            <p>Wind Geschwindigkeit: ${data.wind.speed} Km/H</p>
             
        `;
        weatherOutput.style.display = 'block';

        
        var weatherBackgrounds = {
            clear: "url('./Bilder/Klar.jpg')",
            clouds: "url('./Bilder/Wolken.jpg')",
            rain: "url('./Bilder/Spiderman Regen.jpg')",
            drizzle: "url('./Bilder/Hagel.png')",
            snow: "url('./Bilder/Schnee.jpg')",
            thunderstorm: "url('./Bilder/Lightning.jpg')",
            sun: "url('./Bilder/Anime Sun.jpg')"
        };

        
        var weatherType = data.weather[0].main.toLowerCase();
        var backgroundImage = weatherBackgrounds[weatherType] || ""; 
       
        document.body.style.backgroundImage = backgroundImage;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
    } else {
        weatherOutput.innerHTML = `<p>Stadt nicht gefunden.</p>`;
        weatherOutput.style.display = 'block';
        document.body.style.backgroundImage = "url ('./Bilder/fehler.jpg')";
    }
}