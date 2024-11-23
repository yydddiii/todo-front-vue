<template>
    <NModal v-model:show="state_popup">
        <div class="change-popup">
            <NTabs animated>
                <NTabPane name="name" tab="Изменить имя">
                    <h3>Введите новое название для заметки '{{ state_task?.name }}'</h3>
                    <NForm ref="form_ref" :model="form_data" :rules="rules">
                        <BaseInput label="Задача" path="task" v-model:value="form_data.task" />
                    </NForm>
                    <div class="change-popup__btns">
                        <NButton type="primary" @click="state_popup = false">Отменить</NButton>
                        <NButton type="primary" @click="validateNewName()">готов</NButton>
                    </div>
                </NTabPane>
                <NTabPane name="type" tab="Изменить категорию">
                    <h3>Выберите новую категорию для заметки '{{ state_task?.name }}'</h3>
                    <NForm ref="form_ref" :model="form_data" :rules="rules">
                        <BaseSelect
                            v-model:value="form_data.type"
                            label="Тип"
                            :options="data_options_types"
                            :clearable="true"
                        />
                    </NForm>
                    <div class="change-popup__btns">
                        <NButton type="primary" @click="state_popup = false">Отменить</NButton>
                        <NButton type="primary" @click="validateNewType()">готов</NButton>
                    </div>
                </NTabPane>
                <NTabPane name="description" tab="Изменить описание">
                    <h3>Введите новое описание для заметки '{{ state_task?.name }}'</h3>
                    <NForm ref="form_ref" :model="form_data" :rules="rules">
                        <BaseInput
                            label="Описание"
                            path="description"
                            v-model:value="form_data.description"
                            type_input="textarea"
                        />
                    </NForm>
                    <div class="change-popup__btns">
                        <NButton type="primary" @click="state_popup = false">Отменить</NButton>
                        <NButton type="primary" @click="newDescription()">готов</NButton>
                    </div>
                </NTabPane>
            </NTabs>
        </div>
    </NModal>
</template>

<script setup>
import {NModal, NButton, NForm, NTabs, NTabPane} from "naive-ui";

const state_popup = useState("show_ch_popup"); // поп-ап для изменения задачи
const state_task = useState("state_select_task"); //хранит данные выбранной задачи
const data = useState("data"); // все задачи
const data_types = useState("types"); // все типы задач;

const data_options_types = ref([]); // для хранение опций в n-select

const form_ref = ref(null);
const form_data = ref({
    task: "",
    type: null,
    description: "",
});
const rules = ref({
    task: {
        required: true,
        trigger: ["input", "blur"],
        validator(rule, value) {
            if (!value) {
                return new Error("Обязательное поле");
            }
        },
    },
    type: {
        required: true,
        trigger: ["input", "blur"],
        validator(rule, value) {
            if (!value) {
                return new Error("Обязательное поле");
            }
        },
    },
});

// валидация и изменение имени задачи
async function validateNewName() {
    form_ref.value?.validate(async errors => {
        if (!errors) {
            try {
                await renameTask(state_task.value.id, form_data.value.task);
                data.value.find(item => item.id == state_task.value.id).name = form_data.value.task;
                form_data.value.task = "";
                state_popup.value = false;
            } catch (error) {
                message.error("Ошибка сервера");
            }
        }
    });
}

// валидация и изменение типа задачи
async function validateNewType() {
    form_ref.value?.validate(async errors => {
        if (!errors) {
            try {
                await retypeTask(state_task.value.id, form_data.value.type)

                data.value.find(item => item.id == state_task.value.id).category_id =
                    form_data.value.type;
                form_data.value.type = null;
                state_popup.value = false;
            } catch (error) {
                message.error("Ошибка сервера");
            }
        }
    });
}

async function newDescription() {
    form_ref.value?.validate(async errors => {
        if (errors) return;
        try {
            await newDescriptionTask(state_task.value.id, form_data.value.description);

            data.value.find(item => item.id == state_task.value.id).description =
                form_data.value.description;
            form_data.value.description = null;
            state_popup.value = false;
        } catch (error) {
            message.error("Ошибка сервера");
        }
    });
}

watch(
    () => state_popup.value,
    new_value => {
        if (!state_task.value.description) form_data.value.description = '' 

        form_data.value.description = state_task.value.description;
    }
);

// форматирует маассив типов в формат для n-select
onBeforeMount(() => {
    if (!data_types.value) return;

    data_types.value.forEach(item => {
        data_options_types.value.push({
            label: item.name,
            value: item.id,
        });
    });
});
</script>

<style lang="scss">
.change-popup {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: var(--bg);
    border-radius: 12px;
    max-width: 460px;
    h3 {
        margin-bottom: 5px;
    }
    .change-popup__btns {
        display: flex;
        gap: 16px;
        button {
            width: calc(50% - 8px);
        }
    }
}
</style>
