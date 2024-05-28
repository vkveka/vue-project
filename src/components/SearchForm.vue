<script setup>
import { ref } from "vue";
import axios from "axios";
import { useWeatherStore } from "@/WeatherStore";

const search = ref("");
const key = "a2b19adf706c693795ef7f51b8931eda&lang=fr&units=metric";
const errorMessage = ref("");
const store = useWeatherStore();
function setFirstUpper(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const searchCity = async () => {
    // await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + search.value + '&appid=' + key.value)
    if (search.value.length > 2) {
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&type=like&appid=${key}`)
            .then(res => {
                store.storeCityWeather(res.data)
                console.log(store.citiesList)
            })
            .catch(error => {
                if (error.response && error.response.data.message == "city not found") {
                    errorMessage.value = "La ville n'existe pas.";
                } else {
                    errorMessage.value = error.message;
                }
            });
    } else {
        errorMessage.value = "Merci de saisir au moins 3 caractères.";
        store.filteredCities = [];
    }
    setTimeout(() => errorMessage.value = "", 5000);
}

</script>


<template>
    <div id="searchCityInput" class="mx-auto d-flex flex-column justify-center align-items-center">
        <div class="d-flex flex-row">
            <form @submit.prevent="searchCity" class="d-flex align-items-center">
                <label class="form-label text-white fw-bold" for="serachCity">Recherchez une ville :</label>
                <input type="text" class="form-control" v-model="search" id="searchCity">

                <!-- <div class="dropdown">
                    <input type="text" class="form-control dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false" v-model="search" id="searchCity" @input="searchCity">

                    <ul class="dropdown-menu">
                        <li v-for="city in store.filteredCities" :key="city.id"><a class="dropdown-item" href="#">{{
                            city.name
                                }}</a>
                        </li>
                    </ul>
                </div> -->

                <button type="submit" class="btn btn-dark ms-4">Valider</button>
            </form>
            <button v-if="store.citiesList[0]" @click="store.$reset()" type="button"
                class="btn-close ms-3 my-auto"></button>
        </div>
        <p v-if="errorMessage != ''" class="mt-2 text-secondary text-center  rounded-pill">
            <img src="../assets/images/error.png" alt="img error" width="15px">
            {{ errorMessage }}
        </p>
    </div>


    <div v-if="store.citiesList[0]" class="d-flex justify-center flex-wrap w-50 mx-auto">
        <div v-for="city in store.citiesList" :key="city.id" class="card text-center mx-auto">
            <div class="card-header position-relative">
                <button @click="store.removeCity(city.id)" type="button" class="btn-close position-absolute"
                    style="right: 10px;"></button>
                <span class="mx-auto my-auto">{{ city.name }}</span>
            </div>
            <div class="card-body d-flex flex-column align-items-center">
                <span unit="celsius"> {{ Math.round(city.main.temp) }} °C</span>
                <img :src="`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`" alt="icon weather"
                    width="70px">
            </div>
            <div class="card-footer">
                <span> {{ setFirstUpper(city.weather[0].description) }}</span>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>