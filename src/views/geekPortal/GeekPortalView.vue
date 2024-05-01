<template>
    <GeekPortalLayout>
      <geek-portal></geek-portal>
    </GeekPortalLayout>
</template>

<script setup lang="ts">
import GeekPortalLayout from "@/layouts/GeekPortalLayout.vue";
import {useRoute, useRouter} from "vue-router";
import GeekPortal from "@/views/geekPortal/components/GeekPortal.vue";

const router = useRouter();
const route = useRoute();


</script>

<style scoped>

</style>
