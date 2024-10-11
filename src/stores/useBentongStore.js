import { defineStore } from 'pinia';
import axios from 'axios';

export const useBentongStore = defineStore('bentong', {
  state: () => ({
    routeData: null,
  }),

  actions: {
    async fetchTomTomData() {
      try {
        const response = await axios.get(
          'https://api.tomtom.com/routemonitoring/3/routes/65785/details?key=8xG2rGiFxpA4QdxjXXx7FnG5kJu4kR71'
        );
        this.routeData = response.data;
        console.log('Bentong data updated', this.routeData);
      } catch (error) {
        console.error('Failed to fetch TomTom data:', error);
      }
    },

    startAutoUpdate() {
      this.fetchTomTomData(); // Initial fetch
      setInterval(() => {
        this.fetchTomTomData();
      }, 120000); // Every 2 minutes
    },
  },

  getters: {
    getLatestRouteData: (state) => state.routeData,
  },
});
