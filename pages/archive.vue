<template>
    <section id="archive-section">
        <NScrollbar>
            <div class="container archive-container">
                <div class="task-list" v-if="is_archived">
                    <BaseTaskItem
                        v-for="item in data"
                        :data="item"
                        v-show="item.is_archived"
                    />
                </div>
                <h2 v-else>В архиве нет задач</h2>
            </div>
        </NScrollbar>
    </section>
    <PopupsArchive />
    <PopupsDelite />
</template>

<script setup>
import { NScrollbar } from "naive-ui";

const data = useState("data"); // все задачи

// отслеживание архивированных задач
const is_archived = computed(() => {
    if (!data.value) return
    return data.value.find((item) => item.is_archived == true);
});
</script>

<style lang="scss">
#archive-section {
    padding: 15px;
    height: 100%;
    .n-scrollbar {
        border-radius: 12px;
    }
    .n-scrollbar-rail {
        right: 1px;
    }
    .archive-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        .task-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        h2 {
            text-align: center;
            color: var(--bg);
        }
    }
}
</style>
