<template>
    <div class="task-item" :id="data.id">
        <div class="task-item__info">
            <h4 :class="data.is_checked ? '_checked' : ''">{{ data.name }}</h4>
            <span v-if="data?.category_id">{{
                typeIdToTypeName(data?.category_id)
            }}</span>
            <p class="small">{{ data.date }}</p>
        </div>
        <div class="task-item__btns">
            <NCheckbox
                v-model:checked="value"
                class="task-item__checkbox"
                v-if="route.path == '/'"
            ></NCheckbox>
            <NButton
                class="task-item__button"
                type="primary"
                @click="openPopups('change')"
                v-if="route.path == '/'"
                >Редактировать</NButton
            >
            <NButton
                class="task-item__button"
                type="error"
                @click="openPopups('delete')"
                v-else
                >Удалить</NButton
            >
            <NButton
                class="task-item__button"
                type="error"
                @click="openPopups('archive')"
                >{{
                    route.path == "/" ? "В архив" : "Убрать из архива"
                }}</NButton
            >
        </div>
    </div>
</template>

<script setup>
import { NButton, NCheckbox, useMessage } from "naive-ui";

const props = defineProps({
    data: null, // принимает данные о задаче
});

const route = useRoute();

const state_select_task = useState("state_select_task"); //хранит данные выбранной задачи;
const show_arc_popup = useState("show_arc_popup"); // поп-ап для архивирования заадчи
const show_del_popup = useState("show_del_popup"); // поп-ап для попап для удаления задачи
const show_ch_popup = useState("show_ch_popup"); // поп-ап для изменения задачи
const data_state = useState("data"); // все задачи

const value = ref(props.data.is_checked); // чек-бокс карточки

// функция для открытия поп-апа. принимает тип попапа
function openPopups(popup) {
    state_select_task.value = props.data;
    switch (popup) {
        case "archive":
            show_arc_popup.value = true;
            break;
        case "delete":
            show_del_popup.value = true;
            break;
        case "change":
            show_ch_popup.value = true;
            break;
    }
}

let timeout = null

// отправляет запрос при проверке задачи
watch(
    () => value.value,
    (new_value) => {
        clearTimeout(timeout)
        timeout = setTimeout(async () => {
            await checkTask(props.data.id, new_value);
            data_state.value.find(
                (item) => item.id == props.data.id
            ).is_checked = new_value;
        }, 300);
    }
);

// меняет значение чек бокса при изменении порядка задач
watch(
    () => props.data.is_checked,
    (new_value) => {
        value.value = props.data.is_checked;
    }
);
</script>

<style lang="scss">
.task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--bg);
    border-radius: 12px;
    padding: 12px;
    gap: 20px;
    .task-item__info {
        display: flex;
        flex-direction: column;
        gap: 5px;
        .task-item__info-circle {
            height: 15px;
            aspect-ratio: 1;
            border-radius: 15px;
        }
        h4 {
            word-wrap: break-word;
            word-break: break-all;
            max-width: max-content;
        }
        span {
            font-size: 14px;
            line-height: 14px;
            color: var(--text);
        }
    }
    .task-item__btns {
        display: flex;
        align-items: center;
        gap: 10px;
        .task-item__checkbox {
            height: 25px;
            width: 25px;
            .n-checkbox-box-wrapper {
                height: 25px;
                width: 25px;
                .n-checkbox-box {
                    height: 25px;
                    width: 25px;
                    border-radius: 50%;
                }
            }
            &.n-checkbox.n-checkbox--checked
                .n-checkbox-box
                .n-checkbox-icon
                .check-icon {
                transform: scale(0.8);
            }
        }
    }
}
</style>
