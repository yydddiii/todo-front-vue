<template>
    <div class="base-layout">
        <BaseSideBar v-if="!is_mobile" :routes="routes" />
        <MobileMenu v-else :routes="routes" />
        <div class="main-content__wrapper" ref="layout_wrapper">
            <ClientOnly>
                <div class="bg" :class="is_width ? '' : 'height'"></div>
            </ClientOnly>
            <div class="main-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
const layout_wrapper = ref(null);
const is_width = ref(false);
const is_mobile = ref(false);

const routes = ref([
    {
        link: "/",
        name: "Задачи",
    },
    {
        link: "/archive",
        name: "Архив",
    },
    {
        link: "/settings",
        name: "Настройки",
    },
    {
        link: "/about",
        name: "О приложении",
    },
]);
let timeout = null
onMounted(() => {
    if (process?.client) {
        is_mobile.value = window.innerWidth < 1000;
        const interval = setInterval(() => {
            if (layout_wrapper.value.clientHeight > 0) {
                clearInterval(interval)
                is_width.value =
                    layout_wrapper.value.clientWidth >=
                    layout_wrapper.value.clientHeight;
            }
        }, 200);
        
        window.addEventListener("resize", () => {
            if (window.innerWidth > 1000) {
                is_mobile.value = false;
            } else {
                is_mobile.value = true;
            }
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                if (
                    layout_wrapper.value.clientWidth >=
                    layout_wrapper.value.clientHeight
                ) {
                    is_width.value = true;
                } else {
                    is_width.value = false;
                }
            }, 500);
        });
    }
});
</script>

<style lang="scss">
.base-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    .main-content__wrapper {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
        .bg {
            animation: anim_bg 8s linear infinite;
            background: var(--fade_bg);
            aspect-ratio: 1;
            position: absolute;
            width: 150%;
            &.height {
                height: 150%;
                width: unset;
            }
        }
        .main-content {
            height: 80%;
            width: 80%;
            max-width: 1000px;
            border-radius: 24px;
            background: var(--blur);
            backdrop-filter: blur(10px);
            border: 1px solid var(--border-accent);
        }
    }
}
@media screen and (max-width: 1250px) {
    .base-layout {
        grid-template-columns: 250px 1fr;
    }
}
@media screen and (max-width: 1100px) {
    .base-layout {
        grid-template-columns: 220px 1fr;
    }
}
@media screen and (max-width: 1000px) {
    .base-layout {
        grid-template-columns: 1fr;
        grid-template-rows: 12fr 1fr;
        height: 100dvh;
        .main-content__wrapper {
            grid-row: 1;
            height: unset;
        }
    }
}
@media screen and (max-width: 700px) {
    .base-layout {
        .main-content__wrapper {
            .main-content {
                width: 85%;
            }
        }
    }
}
@media screen and (max-width: 550px) {
    .base-layout {
        .main-content__wrapper {
            .main-content {
                width: 90%;
            }
        }
    }
}
@media screen and (max-width: 450px) {
    .base-layout {
        .main-content__wrapper {
            .main-content {
                width: 95%;
            }
        }
    }
}
@media screen and (max-width: 400px) {
    .base-layout {
        .main-content__wrapper {
            .main-content {
                width: 100%;
            }
        }
    }
}
@keyframes anim_bg {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
