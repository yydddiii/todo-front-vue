<template>
    <section id="about-section">
        <div class="container about-container">
            <h2>
                Это простенькая тудушка<br />
                сделанная на nuxt и fastapi+postgresql<br />
                <br />
                <strong>
                    СКОРО:<br />
                    -АДАПТАЦИЯ ПОД МОБИЛЬНЫЕ УСТРОЙСТВА<br />
                </strong>
            </h2>
            <p class="very-small">иди на хуй</p>
        </div>
    </section>
</template>

<script setup></script>

<style lang="scss">
#about-section {
    height: 100%;
    padding: 20px;
    .about-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        h2,
        p {
            color: var(--bg);
            strong {
                font-weight: 600;
            }
        }
        .very-small {
            font-size: 1px;
            line-height: 1px;
        } 
    }
}
</style>
