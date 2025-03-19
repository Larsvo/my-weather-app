<script setup>
import { computed } from 'vue';

</script>
<template>
  <div class="weather" id="Wapp">
    <section class="weather__form">
      <H1 class="weather__title">Forecast Friend</H1>
      <input type="text"
             placeholder="Zoek op locatie"
             v-model="query"
             @keypress="getWeather"
             class="weather__search"
      >
      <div class="weather__widget" v-if="typeof weather.main != 'undefined'">
        <WeatherIcon :condition="weather.weather[0].main" :key="weather.weather[0].main" />
        <div class="weather__body">
        <div class="weather__location">
          <h2 class="weather__city">{{ weather.name }}, {{ weather.sys.country }}</h2>
          <p class="weather__date">{{ currentDate }}</p>
        </div>
        <div class="weather__conditions">
          <div class="weather__temperature">
            {{ Math.round(weather.main.temp) }}°c
          </div>
          <div class="weather__description">
            {{ translateWeather(weather.weather[0].main) }}
          </div>
        </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss">
@import "@/assets/Styles/01-base/variables.scss";
@import "@/assets/Styles/02-components/widget.scss";
</style>
<script>
import WeatherIcon from "@/components/WeatherIcon.vue";

export default {
  components: {
    WeatherIcon,
  },
  name: 'Wapp',
  data() {
    return {
      api_key: '723ecbe430b06b6b28e464fbb099215e',
      url_base: 'http://api.openweathermap.org/data/2.5/',
      currentDate: new Date().toLocaleDateString('nl-NL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      query: '',
      weather: {},
      errorMessage: '',
    }
  },
  methods: {
    async getWeather(e) {
      if (e.key === 'Enter') {
        try {
          const response = await fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`);
          if (!response.ok) {
            throw new Error('Geen weer gegevens gevonden');
          }
          const data = await response.json();
          this.setResults(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    },

    translateWeather(englishTerm) {
      const translations = {
        'Clear': 'Helder',
        'Clouds': 'Bewolkt',
        'Rain': 'Regen',
        'Drizzle': 'Motregen',
        'Thunderstorm': 'Onweer',
        'Snow': 'Sneeuw',
        'Mist': 'Mist',
        'Fog': 'Mist',
        'Haze': 'Nevel',
        'Smoke': 'Rook',
        'Dust': 'Stof',
        'Sand': 'Zand',
        'Ash': 'As',
        'Squall': 'Windvlaag',
        'Tornado': 'Tornado',
        'Few clouds': 'Licht bewolkt',
        'Scattered clouds': 'Verspreide wolken',
        'Broken clouds': 'Gebroken bewolking',
        'Overcast clouds': 'Zwaar bewolkt',
        'Light rain': 'Lichte regen',
        'Moderate rain': 'Matige regen',
        'Heavy rain': 'Zware regen',
        'Freezing rain': 'IJzel',
        'Light snow': 'Lichte sneeuw',
        'Heavy snow': 'Zware sneeuw',
        'Sleet': 'Natte sneeuw',
        'Shower rain': 'Regenbuien',
        'Shower snow': 'Sneeuwbuien',
        'Shower sleet': 'Natte sneeuwbuien',
        'Thunderstorm with light rain': 'Onweer met lichte regen',
        'Thunderstorm with heavy rain': 'Onweer met zware regen',
        'Thunderstorm with snow': 'Onweer met sneeuw'
      };
      return translations[englishTerm] || englishTerm;
    },
    setResults(results) {
      this.weather = results;
    },
  }
}
</script> 

