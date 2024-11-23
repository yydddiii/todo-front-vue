<template>
    <div class="preloader" :class="loaded ? 'hidden' : ''">
        <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script setup>
const loaded = ref(false);
const nuxtApp = useNuxtApp();
nuxtApp.hook("page:finish", () => {
    setTimeout(() => {
        loaded.value = true;
    }, 350);
});
</script>
<style lang="scss">
.preloader {
    background-color: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    pointer-events: all;
    opacity: 1;
    transition: 0s;
    &.hidden {
        transition: 0.8s;
        pointer-events: none;
        opacity: 0;
    }
    .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
        animation: lds-ring 5s linear infinite;
        div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 64px;
            height: 64px;
            margin: 8px;
            border: 8px solid var(--accent);
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: var(--accent) transparent transparent transparent;
            &:nth-child(1) {
                animation-delay: -0.45s;
            }

            &:nth-child(2) {
                animation-delay: -0.3s;
            }

            &:nth-child(3) {
                animation-delay: -0.15s;
            }
        }
    }
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
