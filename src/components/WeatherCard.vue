<template>
  <div v-if="weatherData && placeData" class="weather-card">
    <h2>{{ city }}</h2>
    <div class="weather-details">
      <p>{{ weatherData.weather[0].description }}</p>
      <p>Temperature: {{ weatherData.main.temp }}°C</p>
      <p>Humidity: {{ weatherData.main.humidity }}%</p>
    </div>
  </div>
  <div v-else class="loading-message">Loading...</div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['city'],
  data() {
    return {
      weatherData: null,
      placeData: null,
    };
  },
  mounted() {
    this.fetchWeather();
    this.fetchPlace();
  },
  methods: {
    async fetchWeather() {
      try {
        const response = await axios.get(process.env.VUE_APP_WEATHER_API_URL + '?city=' + this.city)
        this.weatherData = response.data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
    async fetchPlace() {
      try {
        const response = await axios.get(process.env.VUE_APP_PLACES_API_URL + '?city=' + this.city)
        this.placeData = response.data.response.venues[0];
      } catch (error) {
        console.error('Error fetching place data:', error);
      }
    },
  },
};
</script>

<style scoped>
.weather-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.weather-card h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.weather-details {
  margin-bottom: 20px;
}

.weather-details p {
  margin: 5px 0;
}

.places-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.places-card h3 {
  margin-bottom: 10px;
}

.place-info {
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.place-info:last-child {
  border-bottom: none;
}

.loading-message {
  font-size: 20px;
  padding: 20px;
  text-align: center;
}
</style>