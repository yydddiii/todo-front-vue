<template>
    <NModal v-model:show="state_popup">
        <div class="delete-popup">
            <h3>
                {{
                    route.path == "/"
                        ? "Вы действительно хотите перенести задачу в архив"
                        : "Вы действительно хотите убрать задачу из архива"
                }}
                '{{ state_task.name }}'?
            </h3>
            <div class="delete-popup__btns">
                <NButton type="primary" @click="state_popup = false"
                    >нет</NButton
                >
                <NButton type="primary" @click="toArchive()">да</NButton>
            </div>
        </div>
    </NModal>
</template>

<script setup>
import { NModal, NButton } from "naive-ui";

const route = useRoute();

const data_state = useState("data"); // все задачи
const state_task = useState("state_select_task"); //хранит данные выбранной задачи;
const state_popup = useState("show_arc_popup"); // поп-ап для архивирования

// переносит задачу в(из) архив(а)
async function toArchive() {
    await archiveTask(state_task.value.id);

    data_state.value.find(
        (item) => item.id == state_task.value.id
    ).is_archived = !data_state.value.find(
        (item) => item.id == state_task.value.id
    ).is_archived;

    state_popup.value = false;
}
</script>

<style lang="scss">
.delete-popup {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: var(--bg);
    border-radius: 12px;
    max-width: 400px;
    h3 {
        max-width: max-content;
    }
    .delete-popup__btns {
        display: flex;
        gap: 16px;
        button {
            width: calc(50% - 8px);
        }
    }
}
</style>
