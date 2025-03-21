<script setup>
import {computed} from 'vue';
</script>
<template>
  <div class="weather" id="Weather">
    <section class="weather__box">
      <form class="weather__form" @submit.prevent="getWeather">
        <label class="weather__title" for="zoekveld">Forecast Friend</label>
        <div class="weather__input">
        <input type="text"
               id="zoekveld"
               placeholder="Zoek op locatie bijvoorbeeld Amsterdam"
               v-model="query"
               class="weather__search"
        >
        <button type="submit" aria-label="Zoeken">
          <svg width="24px" height="24px" viewBox="0 0 35 35">
            <title>search icon</title>
            <g id="Page-5" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="001_Homepage" transform="translate(-871.000000, -778.000000)" stroke="var(--main-color)" stroke-width="5">
                <g id="Group-7" transform="translate(194.000000, 748.000000)">
                  <g id="Group-6" transform="translate(656.000000, 10.000000)">
                    <g id="Group-5" transform="translate(21.000000, 20.000000)">
                      <circle id="Oval" cx="16" cy="16" r="13.5"></circle>
                      <line x1="26.5" y1="26.5" x2="32.5" y2="32.5" id="Line" stroke-linecap="round"></line>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </button>
        </div>
      </form>
      <p v-if="errorMessage" class="weather__city">{{ errorMessage }}</p>
      <div class="weather__widget" v-if="typeof weather.main != 'undefined'">
        <WeatherIcon :condition="weather.weather[0].main" :key="weather.weather[0].main"/>
        <div class="weather__body">
          <div class="weather__conditions">
            <div class="weather__temperature">
              {{ Math.round(weather.main.temp) }}&deg;c
            </div>
            <div class="weather__description">
              {{ translateWeather(weather.weather[0].main) }}
            </div>
            <div class="weather__location">
              <h2 class="weather__city">{{ weather.name }}, {{ weather.sys.country }}</h2>
              {{ this.errorMessage }}
              <p class="weather__date">{{ currentDate }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss">
@use "@/assets/Styles/03-components/widget.scss";
</style>
<script>
import WeatherIcon from "@/components/WeatherIcon.vue";

export default {
  components: {
    WeatherIcon,
  },
  name: 'Weather',
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
    async getWeather() {  // 1. Maakt de functie "asynchroon" voor API calls
      try {              // 2. Probeer de code uit te voeren
        // 3. Verstuur API verzoek
        const response = await fetch(
            `${this.url_base}weather?q=${encodeURIComponent(this.query)}&units=metric&APPID=${this.api_key}`
        );

        // 4. Controleer of het verzoek gelukt is.
        if (!response.ok) {
          throw new Error('Geen weer gegevens gevonden');
        }

        // 5. Zet de response om naar JSON formaat
        const data = await response.json();

        // 6. Sla de data op in de component
        this.setResults(data);
        this.errorMessage = ''; // Reset foutmeldingen

      } catch (error) {   // 7. Vang eventuele fouten op
        console.error('Error:', error);
        this.errorMessage = 'Geen weer gegevens gevonden';
        this.weather = {}; // Maak weerdata leeg
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

