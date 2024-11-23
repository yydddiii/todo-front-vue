<template>
    <div class="auth-layout">
        <div class="main-content__wrapper">
            <div class="bg" :class="is_width ? '' : 'height'"></div>
            <div class="main-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
const is_width = ref(false);

if (process?.client) {
    if (window?.innerWidth >= window?.innerHeight) {
        is_width.value = true;
    }
    window.addEventListener("resize", () => {
        if (window?.innerWidth >= window?.innerHeight) {
            is_width.value = true;
        } else if (window?.innerWidth <= window?.innerHeight){
            is_width.value = false
        }
    });
}

</script>

<style lang="scss">
.auth-layout {
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
            padding: 25px;
            border-radius: 24px;
            background: var(--blur);
            backdrop-filter: blur(10px);
            border: 1px solid var(--border-accent);
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
