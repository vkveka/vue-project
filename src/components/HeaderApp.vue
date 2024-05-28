<template>
    <nav>
        <RouterLink to="/" class="navLink"><img src="../assets/logo.svg" width="50px" alt=""></RouterLink>
        <RouterLink to="/" class="navLink">Accueil</RouterLink>
    </nav>
    <header>
        <!-- <img src="../assets/images/header2.jpg" alt="" width="100%"> -->

    </header>
    <SearchForm />
</template>

<script setup>
import SearchForm from './SearchForm.vue';
</script>

<style scoped></style>