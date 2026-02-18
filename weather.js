const apiKey = "2e1bcb40ffa664516d7348be1ba0a817"; 

async function getWeather() {
    const city = document.getElementById("city").value;

    if (city === "") {
        alert("Enter city name da nanba!");
        return;
    }

    // show loader
    document.getElementById("loading").classList.remove("hide");
    document.getElementById("weatherBox").classList.add("hide");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        // hide loader
        document.getElementById("loading").classList.add("hide");

        if (data.cod == "404") {
            alert("City not found!");
            return;
        }

        document.getElementById("weatherBox").classList.remove("hide");
        document.getElementById("temp").innerHTML = `🌡 Temp: ${data.main.temp}°C`;
        document.getElementById("humidity").innerHTML = `💧 Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").innerHTML = `🌬 Wind: ${data.wind.speed} km/h`;

        const iconCode = data.weather[0].icon;
        document.getElementById("icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const main = data.weather[0].main;

        if (main === "Clouds") {
            document.body.style.background = "#d0d8e8";
        } else if (main === "Clear") {
            document.body.style.background = "#87CEEB";
        } else if (main === "Rain") {
            document.body.style.background = "#5f6e7a";
        } else {
            document.body.style.background = "#cccccc";
        }

    } catch (error) {
        document.getElementById("loading").classList.add("hide");
        alert("Something went wrong ");
    }
}
