import { defineStore } from "pinia";


export const useWeatherStore = defineStore('weatherStore', {
    state: () => ({
        citiesList: [],
        // filteredCities: [],
    }),
    actions: {
        storeCityWeather(cityWeather) {
            // const existingCity = this.citiesList.find(city => city.id === cityWeather.id);
            // const existingCity = this.citiesList.some(city => city.id == cityWeather.id);
            if (!this.citiesList.find(city => city.id === cityWeather.id)) {
                this.citiesList[this.citiesList.length] = cityWeather;
            } else {
                alert('Ville déjà ajoutée !')
            }
        },
        removeCity(id) {
            this.citiesList = this.citiesList.filter(city => city.id !== id);
        },
    },
    persist: true,
})
