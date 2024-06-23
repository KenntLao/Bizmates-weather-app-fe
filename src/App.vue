<template>
  <div id="app">
    <h1 class="app-title">Weather App</h1>
    <input 
      type="text" 
      v-model="searchQuery" 
      @input="searchVenues" 
      placeholder="Search for a venue..." 
      class="search-input"
    />
    <div v-if="searchQuery && searchResults && searchResults.length > 0">
      <h2>Search Results</h2>
      <div class="weather-cards">
        <div v-for="venue in searchResults" :key="venue.id" class="venue-card">
          <h3>{{ venue.name }}</h3>
          <p v-if="venue.location">{{ venue.location.address }}</p>
        </div>
      </div>
    </div>
    <div v-else-if="searchQuery && searchResults && searchResults.length === 0">
      <h2>No Results Found</h2>
    </div>
    <div v-else>
      <div class="weather-cards">
        <WeatherCard v-for="city in cities" :key="city" :city="city" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import WeatherCard from './components/WeatherCard.vue';

export default {
  name: 'App',
  components: {
    WeatherCard,
  },
  data() {
    return {
      cities: ['Tokyo', 'Yokohama', 'Kyoto', 'Osaka', 'Sapporo', 'Nagoya'],
      searchQuery: '',
      searchResults: [],
    };
  },
  methods: {
    async searchVenues() {
      if (this.searchQuery.length > 2) {
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_PLACES_API_URL}?city=${this.searchQuery}`
          );
          this.searchResults = response.data.response.venues || [];
        } catch (error) {
          console.error('Error searching for venues:', error);
          this.searchResults = [];
        }
      } else {
        this.searchResults = [];
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #e1f5fe; 
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#app {
  text-align: center;
  width: 100%;
  max-width: 800px;
  padding: 20px;
}

.app-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 600px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.weather-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
}

.venue-card {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Add more styles as needed */
</style>