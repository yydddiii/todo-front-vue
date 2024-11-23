<template>
    <NModal v-model:show="state_popup">
        <div class="delete-popup">
            <h3>
                Вы действительно хотите удалить задачу '{{ state_task.name }}'?
            </h3>
            <div class="delete-popup__btns">
                <NButton type="primary" @click="state_popup = false"
                    >нет</NButton
                >
                <NButton type="primary" @click="deleteTaskThis()">да</NButton>
            </div>
        </div>
    </NModal>
</template>

<script setup>
import { NModal, NButton } from "naive-ui";

const state_popup = useState("show_del_popup"); // переменная попапа удаления
const state_task = useState("state_select_task"); //хранит данные выбранной задачи

async function deleteTaskThis() {
    //удалаяет задачу
    await deleteTask(state_task.value.id);
    await getTasks();
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
