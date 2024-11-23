<template>
    <NModal v-model:show="state_popup" @click="show_input = null">
        <div class="type-popup">
            <h4>Ваши типы:</h4>
            <n-form ref="form_ref" :model="form_data" :rules="rules">
                <div
                    class="type-popup__type"
                    v-for="(item, index) in data_types"
                    @click.stop
                    :class="index == show_input ? 'active' : ''"
                >
                    <div class="type-popup__type-main">
                        <p>{{ item.name }}</p>
                        <div class="type-popup__type-controls">
                            <PhPencil
                                class="type-popup__type-controls-item type-popup__type-controls-pen"
                                :size="25"
                                @click="forCollapse(index)"
                            />
                            <PhTrash
                                class="type-popup__type-controls-item type-popup__type-controls-del"
                                :size="25"
                                @click="deleteType(item.id)"
                            />
                        </div>
                    </div>
                    <n-collapse-transition
                        :show="index == show_input"
                        class="type-popup__type-collapse"
                    >
                        <BaseInput
                            label="Новое название"
                            path="new_name"
                            v-model:value="form_data.new_name"
                        />
                        <NButton
                            type="primary"
                            :disabled="form_data.new_name.length == 0"
                            @click="saveNewName(item.id, form_data.new_name)"
                            >Сохранить</NButton
                        >
                    </n-collapse-transition>
                </div>
                <div class="type-popup-new" @click.stop>
                    <n-collapse-transition
                        :show="show_input == 'new_type'"
                        class="type-popup__type-collapse"
                    >
                        <BaseInput
                            label="Новое название"
                            path="new_name"
                            v-model:value="form_data.new_name"
                        />
                        <NButton
                            type="primary"
                            :disabled="form_data?.new_name.length == 0"
                            @click="saveNewType(form_data.new_name)"
                            >Сохранить</NButton
                        >
                    </n-collapse-transition>
                    <NButton
                        class="type-popup-new-btn"
                        type="primary"
                        :disabled="data_types.length >= 5"
                        @click="
                            show_input == 'new_type'
                                ? ((show_input = null), (form_data.new_name = ''))
                                : (show_input = 'new_type')
                        "
                        >{{ show_input == "new_type" ? "Отмена" : "Добавит задачу" }}</NButton
                    >
                    <span>доступно: {{ 5 - data_types?.length }} из 5</span>
                </div>
            </n-form>
        </div>
    </NModal>
</template>

<script setup>
import {NModal, NButton, NForm, useMessage, NCollapseTransition} from "naive-ui";
import {PhTrash, PhPencil} from "@phosphor-icons/vue";

const state_popup = useState("types_popup"); // показывать ли текущий попап
const data_types = useState("types"); // все типы задач;
const user_info = useState("user_info"); // информация о пользователе

const message = useMessage();

const show_input = ref(null); // показывает какой инпут откытый

const form_ref = ref(null);
const form_data = ref({
    new_name: "",
});
const rules = ref({
    new_name: {
        required: true,
        trigger: ["input", "blur"],
        validator(rule, value) {
            if (!value) return new Error("Обязательное поле");
        },
    },
});

// открытие другого инпута или закрытие текущего
function forCollapse(index) {
    form_data.value.new_name = "";
    index == show_input.value ? (show_input.value = null) : (show_input.value = index);
}

// удаляет тип
async function deleteType(id) {
    try {
        const response = await deleteCategories(id);
        if (response.data.value.code == 200) {
            data_types.value.splice(data_types.value.findIndex(item => item.id == id), 1)
        } else {
            message.error("error");
        }
    } catch (error) {
        message.error(error);
    }
}

// измененеие названия типа
async function saveNewName(id, new_value) {
    form_ref.value?.validate(async errors => {
        if (!errors) {
            const response = await changeCategories(id, new_value)
            if (response.data.value.code == 200) {
                data_types.value.find(item => item.id == id).name = new_value 
                show_input.value = null;
            } else {
                message.error("error");
            }
        }
    });
}

// создание тновго типа
async function saveNewType(new_value) {
    form_ref.value?.validate(async errors => {
        if (!errors) {
            const response = await addCategories(new_value);
            if (response.data.value.code == 200) {
                data_types.value.push(response.data.value.data);
                show_input.value = null;
            } else {
                message.error("error");
            }
        }
    });
}

// закрывает все колапсы посел закрытия попапа
watch(
    () => state_popup.value,
    new_value => {
        if (!new_value) show_input.value = null;
    }
);
</script>

<style lang="scss">
.type-popup {
    padding: 20px;
    background-color: var(--bg);
    border-radius: 12px;
    min-width: 370px;
    h4 {
        margin-bottom: 15px;
    }
    .type-popup__type {
        padding: 10px 15px;
        border-radius: 5px;
        transition: 0.4s;
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-height: 45px;
        &:has(.n-collapse-transition) {
            padding-bottom: 0;
        }
        .type-popup__type-main {
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
                font-size: 20px;
            }
            .type-popup__type-controls {
                display: flex;
                align-items: center;
                gap: 5px;
                transition: 0.3s;
                .type-popup__type-controls-item {
                    transition: 0.4s;
                    &.type-popup__type-controls-pen {
                        fill: var(--accent);
                    }
                    &.type-popup__type-controls-del {
                        fill: var(--error);
                    }
                }
            }
        }
        &:not(:last-of-type) {
            margin-bottom: 10px;
        }
        &.active {
            background-color: var(--gray_bg_second);
            transition: 0.2s;
        }
    }
    .type-popup-new {
        display: flex;
        flex-direction: column;
        .type-popup__type-collapse {
            padding: 12px 12px 0;
            background-color: var(--gray_bg_second);
            border-radius: 16px;
        }
        .type-popup-new-btn {
            width: 100%;
            margin-top: 15px;
        }
        > span {
            margin-top: 5px;
        }
    }
    .type-popup__type-collapse {
        display: grid;
        grid-template-columns: 200px 1fr;
        align-items: flex-start;
        gap: 5px;
        button {
            height: 39px;
            border-radius: 12px;
        }
    }
}

@media ((hover: hover) and (pointer: fine)) {
    .type-popup__type {
        .type-popup__type-main {
            .type-popup__type-controls {
                opacity: 0;
                pointer-events: none;
                .type-popup__type-controls-item {
                    cursor: pointer;
                    &.type-popup__type-controls-pen {
                        fill: unset !important;
                        &:hover {
                            fill: var(--accent) !important;
                            transition: 0.2s;
                        }
                    }
                    &.type-popup__type-controls-del {
                        fill: unset !important;
                        &:hover {
                            fill: var(--error) !important;
                            transition: 0.2s;
                        }
                    }
                }
            }
        }
        &:hover,
        &.active {
            background-color: var(--gray_bg_second);
            transition: 0.2s;
            .type-popup__type-main {
                .type-popup__type-controls {
                    transition: 0.2s;
                    opacity: 1;
                    pointer-events: all;
                }
            }
        }
    }
}
</style>
