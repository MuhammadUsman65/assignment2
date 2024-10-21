// Ensure the DOM content is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Variables to store chart instances
  let barChartInstance = null;
  let doughnutChartInstance = null;
  let lineChartInstance = null;


  // API key and endpoint for fetching weather data
  const weatherApiKey = "b040cc50efdbcfa631259317dcf504ae";
  const weatherApiEndpoint =
    "https://api.openweathermap.org/data/2.5/forecast?q=";

  const endpoint2 = `https://api.openweathermap.org/data/2.5/weather?q=`;

  // Function to fetch one-day weather summary
  async function getWeatherSummary(city) {
    console.log("getWeatherSummary");
    try {
      const response = await fetch(
        `${endpoint2}${city}&units=metric&appid=${weatherApiKey}`
      );
      console.log("response");
      const data = await response.json();

      if (response.ok) {
        displayWeatherSummary(data);
      } else {
        console.log("Error fetching weather summary:", data.message);
      }
    } catch (error) {
      console.log("Error fetching weather summary:", error);
    }
  }

  // Function to display the weather summary in the weather-widget
  function displayWeatherSummary(data) {
    const weatherWidget = document.querySelector(".weather-widget");
    const weatherdetails = document.getElementById("weatherDetails"); // Ensure this element is selected
    if (!weatherWidget) {
      console.log("Error: weatherWidget element not found.");
      return;
    }
    if (!weatherdetails) {
      console.log("Error: weatherDetails element not found.");
      return;
    }

    const city = data.name;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    weatherdetails.innerHTML = `
          <h4>Current Weather for ${city}</h4>
          <p class="temperature">${temperature.toFixed(1)} °C</p>
          <p>Humidity: ${humidity} %</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
          <p>Weather: ${description}</p>
          <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">
      `;
    console.log("added weather summarty");

    weatherWidget.classList.add("show");
  }

  // Fetch weather data from the API based on the city input
  async function getWeatherData(city) {
    try {
      const response = await fetch(
        `${weatherApiEndpoint}${city}&units=metric&appid=${weatherApiKey}`
      );
      const data = await response.json();
      if (response.ok) {
        updateCharts(data); // Process and display forecast charts
      } else {
        console.error("Error fetching weather data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  // Function to process forecast data and extract relevant info for charts
  function processForecastData(forecastData) {
    const labels = [];
    const temperatures = [];
    const weatherConditions = {};

    // Collect data for the next 5 days (assuming 3-hour intervals in the API)
    for (let i = 0; i < 5; i++) {
      const forecast = forecastData.list[i * 8]; // 3-hour intervals
      labels.push(new Date(forecast.dt_txt).toLocaleDateString());
      temperatures.push(forecast.main.temp);

      const condition = forecast.weather[0].main;
      weatherConditions[condition] = (weatherConditions[condition] || 0) + 1;
    }

    return { labels, temperatures, weatherConditions };
  }

  // Function to update charts
  function updateCharts(forecastData) {
    const { labels, temperatures, weatherConditions } =
      processForecastData(forecastData);

    // Update or create bar chart for temperatures
    if (barChartInstance) {
      barChartInstance.destroy();
    }
    const tempBarCtx = document.getElementById("tempBarChart").getContext("2d");
    barChartInstance = new Chart(tempBarCtx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatures,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Update doughnut chart for weather conditions
    if (doughnutChartInstance) {
      doughnutChartInstance.destroy();
    }
    const doughnutCtx = document
      .getElementById("weatherDoughnutChart")
      .getContext("2d");
    doughnutChartInstance = new Chart(doughnutCtx, {
      type: "doughnut",
      data: {
        labels: Object.keys(weatherConditions),
        datasets: [
          {
            data: Object.values(weatherConditions),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          },
        ],
      },
    });

    // Update line chart for temperature changes
    if (lineChartInstance) {
      lineChartInstance.destroy();
    }
    const lineCtx = document.getElementById("tempLineChart").getContext("2d");
    lineChartInstance = new Chart(lineCtx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatures,
            borderColor: "rgba(255, 99, 132, 1)",
          },
        ],
      },
    });
  }

  // Add event listener to "Get Weather" button
  document.getElementById("getWeather").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    if (city) {
      getWeatherSummary(city); // Fetch and display one-day summary
      getWeatherData(city); // Fetch and update the charts
    } else {
      alert("Please enter a city name.");
    }
  });
});

