<template>
    <section id="mobile-menu">
        <div class="mobile-menu">
            <NuxtLink v-for="item, index in routes" :to="item?.link" >
                <PhClipboard v-if="index == 0"/>
                <PhArchive v-else-if="index == 1"/>
                <PhGear v-else-if="index == 2"/>
                <PhDiscoBall v-else/>
                {{ item.name }}
            </NuxtLink>
        </div>
    </section>
</template>

<script setup>
import { PhClipboard, PhArchive, PhGear, PhDiscoBall } from '@phosphor-icons/vue';

const props = defineProps({
    routes: null
});

</script>

<style lang='scss'>
#mobile-menu{
    width: 100vw;
    .mobile-menu {
        height: 100%;
        width: 100%;
        background-color: var(--bg);
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        a {
            padding: 20px 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 3px;
        }
    }
}
</style>