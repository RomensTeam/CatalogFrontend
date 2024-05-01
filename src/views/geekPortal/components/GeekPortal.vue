<template>
  <div class="container">
    <Jumpbotron name="GeekPortal" description="Лучший путеводитель по GeekPortal"></Jumpbotron>
    <GeekPlacesCatalog></GeekPlacesCatalog>
  </div>
</template>

<script setup lang="ts">
import GeekPlacesCatalog from "@/components/geekportal/GeekPlacesCatalog.vue";
import Jumpbotron from "@/components/geekportal/Jumpbotron.vue"
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

</script>

<style scoped>

</style>
