document.addEventListener("DOMContentLoaded", () => {
    // Variables for weather data and pagination
    let forecastData = null;
    const entriesPerPage = 5;
    let currentPage = 1;

    // Fetch weather data from the API based on the city input
    async function getWeatherForTables(city) {
        const weatherApiEndpoint =
            "https://api.openweathermap.org/data/2.5/forecast?q=";
        const weatherApiKey = "b040cc50efdbcfa631259317dcf504ae";

        try {
            const response = await fetch(
                `${weatherApiEndpoint}${city}&units=metric&appid=${weatherApiKey}`
            );
            const data = await response.json();
            if (response.ok) {
                forecastData = data.list.map((entry) => ({
                    date: entry.dt_txt,
                    temperature: entry.main.temp,
                    description: entry.weather[0].description,
                }));
                currentPage = 1; // Reset to the first page after fetching new data
                displayForecastTable(currentPage); // Display the first page of results
            } else {
                console.error("Error fetching weather data:", data.message);
                alert("Failed to fetch weather data: " + data.message);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data: " + error.message);
        }
    }

    // Function to display the forecast table with pagination
    function displayForecastTable(page, data = null) {
        if (!data) data = forecastData;
        if (!data || data.length === 0) {
            return; // Exit if no data available
        }

        const start = (page - 1) * entriesPerPage;
        const end = page * entriesPerPage;
        const visibleData = data.slice(start, end); // Get the entries for the current page

        const tableBody = document.querySelector("#forecastTable tbody");
        tableBody.innerHTML = ""; // Clear the existing table rows

        // Insert rows for the current page
        visibleData.forEach((entry) => {
            const row = `<tr>
                                                    <td class="p-3 border border-gray-600">${entry.date}</td>
                                                    <td class="p-3 border border-gray-600">${entry.temperature}°C</td>
                                                    <td class="p-3 border border-gray-600">${entry.description}</td>
                                             </tr>`;
            tableBody.innerHTML += row;
        });

        updatePaginationControls(data.length);
    }

    // Update pagination controls based on total entries
    function updatePaginationControls(totalEntries) {
        document.getElementById("prevPage").disabled = currentPage === 1;
        document.getElementById("nextPage").disabled =
            currentPage * entriesPerPage >= totalEntries;
    }

    // Event listeners for pagination buttons
    document.getElementById("prevPage").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayForecastTable(currentPage);
        }
    });

    document.getElementById("nextPage").addEventListener("click", () => {
        if (currentPage * entriesPerPage < forecastData?.length) {
            currentPage++;
            displayForecastTable(currentPage);
        }
    });

    // Sort temperatures in ascending order
    function sortTemperaturesAscending() {
        if (!forecastData) return;

        forecastData = [...forecastData].sort(
            (a, b) => a.temperature - b.temperature
        );
        displayForecastTable(currentPage);
    }

    // Sort temperatures in descending order
    function sortTemperaturesDescending() {
        if (!forecastData) return;

        forecastData = [...forecastData].sort(
            (a, b) => b.temperature - a.temperature
        );
        displayForecastTable(currentPage);
    }

    // Filter entries with "rain" or "drizzle" in their description
    function filterRainDays() {
        if (!forecastData) return;

        forecastData = forecastData.filter((entry) =>
            /rain|drizzle/i.test(entry.description)
        );
        displayForecastTable(currentPage);
    }

    // Event listener for the Get Weather button
    document
        .getElementById("getWeatherforTables")
        .addEventListener("click", () => {
            const city = document.getElementById("cityInput2").value.trim();
            if (city) {
                getWeatherForTables(city);
            } else {
                alert("Please enter a city name.");
            }
        });

    // Add event listeners for sorting and filtering buttons
    document
        .getElementById("sortAscending")
        .addEventListener("click", sortTemperaturesAscending);
    document
        .getElementById("sortDescending")
        .addEventListener("click", sortTemperaturesDescending);
    document
        .getElementById("filterRain")
        .addEventListener("click", filterRainDays);

    // Function to reset view to show all data
    function resetView() {
        currentPage = 1;
        displayForecastTable(currentPage);
    }

    // Add event listener for reset button (if available)
    const resetButton = document.getElementById("resetView");
    if (resetButton) {
        resetButton.addEventListener("click", resetView);
    }
});
