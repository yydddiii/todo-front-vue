<template>
    <NModal v-model:show="state_popup" @mask-click="createTask()">
        <div class="delete-popup">
            <h3>
                {{ "Добавить описание для задачи?" }}
            </h3>
            <NForm ref="form_ref" :model="form_data" :rules="rules">
                <BaseInput
                    label="Описание"
                    path="discription"
                    v-model:value="form_data.discription"
                    type_input="textarea"
                />
                <NButton
                    @click="createTask(form_data.discription)"
                    type="primary"
                    >{{
                        form_data.discription ? "Сохранить" : "Пропустить"
                    }}</NButton
                >
            </NForm>
        </div>
    </NModal>
</template>

<script setup>
import { NModal, NButton, NForm, useMessage } from "naive-ui";

const state_popup = useState("show_discription");
const data = useState("data"); // все задачи
const new_task = useState("new_task");

const emit = defineEmits(["close"]);

const form_ref = ref(null);
const form_data = ref({
    discription: "",
});
const rules = ref({});
const message = useMessage();
async function createTask(discription) {
    if (discription) {
        new_task.value.description = discription;
    }

    await addTask(new_task.value)

    state_popup.value = false;
    emit("close");
}

</script>

<style lang="scss">
.delete-popup {
    button {
        width: 100%;
    }
}
</style>
