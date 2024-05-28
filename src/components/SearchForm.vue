<template>
    <div id="serachCityInput" class="d-flex">
        <p v-if="errorMessage != ''" class="text-white bg-danger w-50 p-3 mx-auto rounded-pill">{{ errorMessage }}</p>
        <form @submit.prevent="searchCity">
            <label for="serachCity">Recherchez une ville :</label>
            <input type="text" v-model="search" id="searchCity">
            <br>
            <span> {{ cityWeather.name }}</span>
            <br>
            <button type="submit" class="btn btn-dark">Valider</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import WeatherCard from "./WeatherCard.vue";

const search = ref("");
const key = "a2b19adf706c693795ef7f51b8931eda";
const cityWeather = ref("");
const errorMessage = ref("");

const searchCity = async () => {
    // await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + search.value + '&appid=' + key.value)
    if (search.value.length > 2) {
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${key}`)
            .then(res => {
                cityWeather.value = res.data;
                console.log(cityWeather.value)
            })
            .catch(error => {
                if (error.response.data.message == "city not found") {
                    errorMessage.value = "La ville n'existe pas.";
                } else {
                    errorMessage.value = error.message;
                }
            });
    } else {
        errorMessage.value = "Nom de ville trop court. Merci de saisir au moins 3 caractères.";
    }
    setTimeout(() => errorMessage.value = "", 5000);
}

</script>

<style lang="scss" scoped></style>