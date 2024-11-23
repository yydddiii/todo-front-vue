<template>
    <aside class="sidebar">
        <div class="sidebar__profile">
            <div class="sidebar__profile-info">
                <p>Добро пожаловать!</p>
                <h5>{{ user_info?.user_login }}</h5>
            </div>
        </div>
        <div class="sidebar__links">
            <NuxtLink
                v-for="item in routes"
                :to="item.link"
                :class="route.path == item.link ? 'selected' : ''"
                >{{ item.name }}</NuxtLink
            >
        </div>
    </aside>
</template>

<script setup>
const props = defineProps({
    routes: null
});

const route = useRoute();

const user_info = useState("user_info"); // информация о пользователе

</script>

<style lang="scss">
.sidebar {
    padding: 15px;
    background: var(--bg);
    height: 100vh;
    z-index: 100;
    box-shadow: 3px 0px 5px var(--shadow);
    .sidebar__profile {
        padding-bottom: 20px;
        display: flex;
        gap: 15px;
        justify-content: center;
        position: relative;
        .sidebar__profile-info {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            text-align: center;
        }
        &::before {
            content: "";
            height: 2px;
            width: 65%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--accent);
            bottom: 0;
        }
    }
    .sidebar__links {
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        height: calc(100% - 100px);
        a.selected {
            color: var(--accent);
        }
    }
}
</style>
