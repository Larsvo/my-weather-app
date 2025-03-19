Weather App

This is a Vue.js weather application built with Vite, providing real-time weather information using the OpenWeatherMap API.
Features

Display current weather conditions
Show weather icons based on conditions
Support for day/night weather icons
Responsive design
Prerequisites

Before you begin, ensure you have the following installed:
Node.js (version 14.0 or higher)
npm (usually comes with Node.js)

Installation
Clone the repository:

git clone https://github.com/Larsvo/my-weather-app.git
cd weather-app
npm install

Create a .env file in the root directory and add your OpenWeatherMap API key:
text
VITE_OPENWEATHER_API_KEY=your_api_key_here

Development
To run the app in development mode with hot-reload:

npm run dev

Open your browser and navigate to http://localhost:5173 to view the app.

Building for Production
To build the app for production:

npm run build

This will generate a dist folder with your production-ready assets.
Serving the Production Build
To preview the production build locally:

npm run preview

Usage
Enter a city name in the search bar
Press enter or click the search button
View the current weather conditions for the specified city
Technologies Used
Vue.js 3
Vite
OpenWeatherMap API
SVG icons
