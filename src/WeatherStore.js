import { defineStore } from "pinia";

export const useWeatherStore = defineStore('weatherStore', {
    state: () => ({
        citiesList: [],
    }),
    actions: {
        storeCityWeather(cityWeather) {
            const existingCity = this.citiesList.find(city => city.name.toLowerCase() === cityWeather.name.toLowerCase());
            if (!existingCity) {
                this.citiesList[this.citiesList.length] = cityWeather;
            }
        },
        removeCity(id) {
            this.citiesList = this.citiesList.filter(city => city.id !== id);
        },
    }
})
