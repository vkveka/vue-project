<template>
    <nav>
        <RouterLink to="/" class="navLink"><img src="../assets/logo.svg" width="50px" alt=""></RouterLink>
        <RouterLink to="/" class="navLink">Accueil</RouterLink>
    </nav>
    <header>
        <!-- <img src="../assets/images/header2.jpg" alt="" width="100%"> -->
        <SearchForm />

    </header>
</template>

<script setup>
import SearchForm from './SearchForm.vue';
</script>

<style scoped>
header {
    background: url(../assets/images/header2.jpg);
    background-attachment: fixed;
    height: 70vh;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>