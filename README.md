# Weather Dashboard with Chatbot Integration

This project is a fully responsive weather dashboard that provides real-time weather data for any city. The dashboard also integrates a chatbot for general queries and weather-related questions. The weather data is fetched using the **OpenWeather API**, while the chatbot is powered by the **Gemini API**. The project also visualizes weather data and features error handling for invalid city inputs.

[**Live Demo**](https://notabd.github.io/weather_web_app/)

## Table of Contents

1. [Features](#features)
2. [Setup and Installation](#setup-and-installation)
3. [Usage](#usage)
4. [API Integration](#api-integration)
5. [Error Handling](#error-handling)

## Features

- **Current Weather Data**: Displays real-time weather information, including temperature, humidity, wind speed, and weather description.
- **5-Day Weather Forecast**: Provides a forecast for the next 5 days with temperatures and weather conditions.
- **Data Visualization**: Uses Chart.js to visualize weather data in three chart types:
  - Vertical Bar Chart: Displays temperatures for the next 5 days.
  - Doughnut Chart: Shows the percentage of different weather conditions over the 5-day period.
  - Line Chart: Illustrates temperature changes over 5 days.
- **Chatbot Integration**: A chatbot powered by the Gemini API to handle general and weather-specific queries.
- **Interactive User Interface**:
  - Toggle between Celsius and Fahrenheit for temperature display.
  - Sort temperatures, filter rainy days, and show the day with the highest temperature.
- **Error Handling**: Displays user-friendly error messages for invalid city names and API errors.

## Setup and Installation

Follow these steps to run the project locally:

1. **Clone the repository**:

   ```bash

   ```

2. **Navigate to the project directory**:

   ```bash
   cd [project directory]
   ```

3. **API Setup**:

   - Sign up for a free API key from [OpenWeather](https://home.openweathermap.org/users/sign_up).
   - Register for a Gemini API key from [Gemini API](https://ai.google.dev/aistudio).

4. **Edit the `app.js` file**:

   - Insert your API keys in the relevant sections of the `app.js` file:
     ```javascript
     const weatherApiKey = "b040cc50efdbcfa631259317dcf504ae";
     const geminiApiKey = "AIzaSyAJ4EoDqwTYNTmirYVp95xLY8L4WHexkf0";
     ```

5. **Run the project**:
   Open the `index.html` file in your browser.

## Usage

### Fetching Weather Data:

1. Enter a city name in the input box and click "Get Weather."
2. The current weather and 5-day forecast for the entered city will be displayed.
3. Charts will show temperature trends and weather conditions for the next 5 days.

### Chatbot:

- Enter a question in the chatbot input box. If the question is related to weather, the chatbot will respond using the weather API. For other queries, the Gemini API will handle the response.

### Sorting and Filtering:

- Use the buttons below the forecast table to:
  - Sort temperatures in ascending or descending order.
  - Filter out non-rainy days.
  - Display the day with the highest temperature.

## API Integration

### OpenWeather API:

- **Current Weather Data**:
  Fetches the current weather data based on city input:
  ```bash
  https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_key}&units=metric
  ```
- **5-Day Weather Forecast**:
  Fetches a 5-day weather forecast:
  ```bash
  https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_key}&units=metric
  ```

### Gemini API:

Handles weather and non-weather-related chatbot queries alike. The integration is done by detecting keywords like "weather" in user queries and responding accordingly, like "weather in Lahore".

## Error Handling

The application provides user-friendly error messages in the following cases:

- Invalid city name.
- API failure (e.g., API key issues or too many requests).
- Any other unexpected errors.
