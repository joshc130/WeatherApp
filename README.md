## Weather App
A simple weather application built with Node.js, Express, and Vite. The app retrieves weather forecast data from the OpenWeather API, displays current weather conditions, and manages a search history.

## Features
Weather Forecast: Search for a city's weather forecast using the OpenWeather API.
Current Weather: Display current weather conditions based on the forecast data.
Search History: Automatically save and display previously searched cities.
Delete History: Remove a city from the search history.
Static Client Serving: Serve static files for the client-side application.
Tech Stack
Backend: Node.js, Express, TypeScript
Frontend: Vite (or your preferred front-end framework)
Weather API: OpenWeather API
Storage: JSON file for persisting search history
Environment Variables: Managed with dotenv
Getting Started
Prerequisites
Node.js (v14 or higher)
npm or yarn
## Installation
Clone the repository from GitHub.
Navigate to the project directory.
Install the dependencies using your preferred package manager.
Create a .env file in the root directory and set the following environment variables:
API_BASE_URL: The base URL for the OpenWeather API (for example, https://api.openweathermap.org).
API_KEY: Your OpenWeather API key.
PORT: The port number on which the server will run (default is 3001).
Start the backend server.
Ensure that the Express server is serving static files from the correct directory (typically the client distribution folder).
API Endpoints
POST /api/weather: Retrieves weather data for a given city and adds the city to the search history.
Request should include a JSON body with the city name.
GET /api/weather/history: Retrieves a list of previously searched cities.
DELETE /api/weather/history/:id: Removes a specific city from the search history by its unique ID.
## Troubleshooting
If no search results are returned:
Verify that the backend server is running and listening on the correct port.
Check that the search history file is being created and updated.
Confirm that the environment variables are correctly set.
Use browser developer tools or an API testing tool to ensure the API endpoints are functioning.
If you encounter proxy errors during development:
Review your Vite proxy settings to ensure API requests are properly forwarded to the backend server.
Make sure the backend server is accessible on the network address specified in the proxy configuration.
## License
This project is licensed under the MIT License.
