<template>
    <div class="main-layout">
        <HeaderComponent :app="geekPortal"></HeaderComponent>
        <div class="area">
            <slot></slot>
        </div>
        <FooterComponent></FooterComponent>
    </div>
</template>

<script setup lang="ts">
    import HeaderComponent from "@/components/HeaderComponent.vue";
    import FooterComponent from "@/components/FooterComponent.vue";
    import {ref} from "vue";

    const geekPortal = ref({
      uuid : '',
      name : 'GeekPortal',
      avatar : 'https://api.romens.org/images/GeekPortal/logo_long2.png',
    });
</script>

<style scoped>
    .area {
        padding-top: 4rem;
    }
</style>
