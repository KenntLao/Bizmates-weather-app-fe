<template>
  <div id="app">
    <h1 class="app-title">Weather App</h1>
    <div class="weather-cards">
      <WeatherCard v-for="city in cities" :key="city" :city="city" />
    </div>
  </div>
</template>

<script>
import WeatherCard from './components/WeatherCard.vue';

export default {
  name: 'App',
  components: {
    WeatherCard,
  },
  data() {
    return {
      cities: ['Tokyo', 'Yokohama', 'Kyoto', 'Osaka', 'Sapporo', 'Nagoya'],
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body {
  background-color: #e1f5fe;
}

#app {
  font-family: 'Roboto', sans-serif;
  text-align: center;
  padding: 20px;
  color: #333;
}

.app-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
}

.weather-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
}
</style>