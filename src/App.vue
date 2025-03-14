<template>
    <H1>Hello World!</H1>
  <div id="Wapp">
    <main>
      <section class="search">
        <input type="text"
               placeholder="Zoek op locatie"
               v-model="query"
               @keypress="getWeather"
        >
      </section>
      {{ query }}
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <div class="weather-widget" v-if="typeof weather.main != 'undefined'">
        <div class="weather-widget__location">
          <h2 class="weather-widget__city">{{weather.name}}, {{ weather.sys.country }}</h2>
          <p class="weather-widget__date">{{ currentDate }}</p>
        </div>
        <div class="weather-widget__conditions">
          <div class="weather-widget__temperature">
            {{ Math.round(weather.main.temp) }}°c
          </div>
          <div class="weather-widget__description">
            {{ translateWeather(weather.weather[0].main) }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
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
    // async getWeather(e) {: Dit definieert een asynchrone methode genaamd getWeather die een event e als parameter accepteert.
    // if (e.key === 'Enter') {: Deze conditie controleert of de ingedrukte toets de Enter-toets is.
    //     try {: Start een try-block om eventuele fouten op te vangen.
    //     const response = await fetch(...):
    //   Maakt een API-verzoek naar een weer-service.
    //       await wacht tot het verzoek is voltooid voordat verdergegaan wordt.
    //       De URL wordt samengesteld met this.url_base, this.query (waarschijnlijk de ingevoerde stad), en this.api_key.
    //   if (!response.ok) {: Controleert of de API-respons succesvol was.
    //       throw new Error('Geen weer gegevens gevonden')
    //       Als de respons niet ok is, wordt een fout gegenereerd.
    //       const data = await response.json();: Zet de API-respons om naar JSON-formaat.
    //   this.setResults(data);: Roept een methode aan om de weergegevens in de component op te slaan.
    //   } catch (error) {: Vangt eventuele fouten op die tijdens het proces zijn opgetreden.
    //   console.error('Error fetching weather data:', error)
    //   Logt eventuele fouten naar de console.
//
//     Het gebruik van const in deze code is een goede praktijk om verschillende redenen:
// Onveranderlijkheid: const zorgt ervoor dat de variabele niet opnieuw kan worden toegewezen. Dit helpt onbedoelde wijzigingen te voorkomen.
//     Duidelijkheid: Het gebruik van const geeft aan dat de waarde van de variabele niet zal veranderen binnen het huidige blok, wat de code leesbaarder maakt.
//     Prestaties: In sommige gevallen kan het gebruik van const kleine prestatieverbeteringen opleveren, omdat de JavaScript-engine weet dat de variabele niet zal veranderen.
//     Foutpreventie: Het voorkomt per ongeluk hergebruik van variabelenamen, wat tot onverwacht gedrag kan leiden.
//     Best practice: Het is een algemeen aanvaarde best practice in moderne JavaScript om const te gebruiken voor variabelen die niet opnieuw worden toegewezen.
//     In deze specifieke code:
//     const response: De response van de fetch-belofte wordt eenmalig toegewezen en niet meer gewijzigd.
//     const data: De geparseerde JSON-data wordt eenmalig toegewezen en niet meer gewijzigd.
    
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
        // Voeg meer vertalingen toe indien nodig
      };
      return translations[englishTerm] || englishTerm;
    },
    setResults(results) {
      this.weather = results;
    },
  }
}
</script> 
