<template>
    <div class="geekplaces-catalog">
        <div class="d-grid">
            <div class="card mx-1 my-2 border-0">
                <input type="search"
                       class="form-control form-control-lg" @keyup="search" @change="search" v-model="queryString" name="search" autofocus
                       :placeholder="$t('Поиск гик-мест')" />
            </div>
            <div class="card mx-1 my-2 border-0" v-show="!loading && geekPlaces.length === 0">
                <div class="card-body">
                    <h3 class="display-4">{{ $t('Гик-мест не найдено') }}</h3>
                </div>
            </div>
            <div class="masonry-row">
                <div class="masonry-col" :key="indexKey" v-for="(geekPlace, indexKey) in geekPlaces">
                </div>
            </div>
            <div v-show="loading" class="text-center p-3">
                <Loader></Loader>
            </div>
        </div>
    </div>
</template>

<script type="module" setup lang="ts">
    import { ref } from 'vue';
    import { storeToRefs } from "pinia";

    import Api from "@/api";
    import Loader from "@/components/Loader.vue";
    import { useUserStore } from "@/stores/user";

    const geekPlaces = ref([] as any[any]);
    const loading = ref(false);
    const page = ref(0);
    const lastPage = ref(1);
    const queryString = ref(localStorage.getItem('geekPlaces_search_query_string') || '');
    const { isAuth } = storeToRefs(useUserStore());

    function loadgeekPlaces() {
        if (page.value >= lastPage.value || loading.value) {
            console.debug('This is last page geekPlaces or loading new data');
            return
        }
        page.value = page.value + 1;
        loading.value = true
        Api
            .post('/geekPlaces?page=' + page.value, {
                'search': queryString.value,
            })
            .then(({data}) => {
                const newgeekPlaces = data.data;
                lastPage.value = data.meta.last_page
                geekPlaces.value.push(...newgeekPlaces)
                loading.value = false
            })
            .catch(({err}) => {
                loading.value = false
            })
    }

    function reset() {
        page.value = 0;
        lastPage.value = 1;
    }

    function search() {
        if (queryString.value.length > 2) {
            localStorage.setItem('geekPlaces_search_query_string', queryString.value);
            reset();
            loadgeekPlaces();
        } else {
            localStorage.removeItem('geekPlaces_search_query_string');
            reset();
            loadgeekPlaces();
        }
    }


    window.onscroll = function(ev) {
        console.log(
            window.innerHeight,
            window.scrollY,
            document.body.offsetHeight
        );
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            loadgeekPlaces();
            console.info("you're at the bottom of the page");
        }
    };

    window.Echo
        .join('chat')
        .listen('.geekPlace.created', (event:any) => {
            geekPlaces.value.unshift(event.geekPlace as never);
            console.info('New geekPlace: "' + event.geekPlace.title + '"!');
        });


    loadgeekPlaces();
</script>

<style scoped>
.masonry-row {
    -moz-column-width: 18em;
    -webkit-column-width: 18em;
    -moz-column-gap: 1em;
    -webkit-column-gap:1em;
}

.masonry-col {
    display: inline-block;
    padding:  .25rem;
    width:  100%;
}

</style>
