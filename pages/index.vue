<template>
    <section id="home-section">
        <div class="container home-container">
            <NForm class="add-form" ref="form_ref" :model="form_data" :rules="rules">
                <div class="add-form-inp-wrapper">
                    <BaseInput label="Задача" path="task" v-model:value="form_data.task" />
                    <BaseSelect
                        v-model:value="form_data.types"
                        label="Тип"
                        :options="data_options_types"
                        :clearable="true"
                    />
                </div>
                <NButton class="add-form__button" type="primary" @click="valideateTask()"
                    >Добавить задачу</NButton
                >
                <div class="add-form__sort">
                    <BaseSelect v-model:value="form_data.sort" label="Сортировка" :options="sort" />
                    <BaseSelect
                        v-model:value="form_data.filter"
                        label="Фильтр"
                        :options="data_options_types"
                        :clearable="true"
                    />
                </div>
            </NForm>
            <NScrollbar v-if="is_not_archived" style="border-radius: 12px" trigger="none">
                <div class="task-list">
                    <BaseTaskItem
                        v-for="item in tasks_data"
                        :data="item"
                        v-show="!item?.is_archived && !is_mobile"
                    />
                    <!-- <MobileTaskItem
                        v-show="!item?.is_archived && is_mobile"
                        v-for="item in tasks_data"
                        :data="item"
                    >
                    </MobileTaskItem> -->
                </div>
            </NScrollbar>
            <h2 v-else>Задач нету</h2>
        </div>
    </section>
    <PopupsArchive />
    <PopupsChange />
    <PopupsDiscription @close="sortTasks(form_data.sort)" />
</template>

<script setup>
import {NForm, NButton, NScrollbar} from "naive-ui";

const data = useState("data"); // все задачи
const user_info = useState("user_info"); // информация о пользователе
const data_types = useState("types"); // все типы задач;
const show_discription = useState("show_discription");
const new_task = useState("new_task");
const state_select_task = useState("state_select_task"); //хранит данные выбранной задачи;

const tasks_data = ref(null); // для сортировки задач
const data_options_types = ref([]); // для хранение опций в n-select

// все доступный сортировки
const sort = ref([
    {
        label: "Сначала новые",
        value: "time_new",
    },
    {
        label: "Сначала старые",
        value: "time_old",
    },
    {
        label: "Сначала выполненые",
        value: "complete",
    },
    {
        label: "Сначала не выполненые",
        value: "discomplete",
    },
    {
        label: "По алфавиту а-я",
        value: "a_z",
    },
    {
        label: "По алфавиту я-а",
        value: "z_a",
    },
]);

const form_ref = ref(null);
const form_data = ref({
    task: "",
    filter: null,
    type: null,
    sort: "time_new",
});
const rules = ref({
    task: {
        required: true,
        message: "Обязательное поле",
    },
});

//форматирование значения даты в двухначное число [0-9][0-9]
const format_date = value => {
    if (String(value).length == 1) {
        return `0${value}`;
    } else {
        return value;
    }
};

function sortTasks(value) {
    switch (value) {
        case "time_new":
            // сортировка по дате создания (сначала новые)
            tasks_data.value = data.value.toSorted((a, b) => a.date_time - b.date_time);
            break;
        case "time_old":
            // сортировка по дате создания (сначала старые)
            tasks_data.value = data.value.toSorted((a, b) => b.date_time - a.date_time);
            break;
        case "complete":
            // сортировка по по выполнению (сначала выполненные)
            tasks_data.value = data.value.toSorted((a, b) => b.is_checked - a.is_checked);
            break;
        case "discomplete":
            // сортировка по по выполнению (сначала невыполненные)
            tasks_data.value = data.value.toSorted((a, b) => a.is_checked - b.is_checked);
            break;
        case "a_z":
            // сортировка по алфавиту (сначала с "А")
            tasks_data.value = data.value.toSorted((a, b) => a.name.localeCompare(b.name));
            break;
        case "z_a":
            // сортировка по алфавиту (сначала с "Я")
            tasks_data.value = data.value.toSorted((a, b) => b.name.localeCompare(a.name));
            break;
    }
}

// валидация новой задачи
function valideateTask() {
    /*форматирует дату в нужный формат*/ const date_now = `${format_date(
        new Date().getDate()
    )}.${format_date(new Date().getMonth())}.${format_date(new Date().getFullYear())} ${format_date(
        new Date().getHours()
    )}:${format_date(new Date().getMinutes())}`;
    form_ref.value?.validate(errors => {
        if (errors) return;
        new_task.value = {
            name: form_data.value.task,
            date: date_now,
            date_time: Date.parse(new Date()),
        };

        if (form_data.value.types) {
            new_task.value.category_id = form_data.value.types;
        }

        show_discription.value = true;
        form_data.value.task = "";
        form_data.value.type = null;
    });
}

// сортирует и при необходимости фильтрует задачиа
watch(
    () => form_data.value.sort,
    new_value => {
        sortTasks(new_value);
        if (form_data.value.filter) {
            tasks_data.value = tasks_data.value.filter(
                item => item.type_id == form_data.value.filter
            );
        }
    }
);

// фильтрует и сортирует задачи
watch(
    () => form_data.value.filter,
    new_value => {
        sortTasks(form_data.value.sort);
        if (new_value) {
            tasks_data.value = tasks_data.value.filter(item => item.type_id == new_value);
        }
    }
);

// поиск не архивированных задач
const is_not_archived = computed(() => {
    if (!data.value) return;

    return data.value.find(item => item.is_archived == false);
});

const is_mobile = ref(false);
if (process?.client) {
    if (window?.innerWidth < 1000) {
        is_mobile.value = true;
    }
    window.addEventListener("resize", () => {
        if (window?.innerWidth >= 1000 && is_mobile.value) {
            is_mobile.value = false;
        } else if (window?.innerWidth < 1000 && !is_mobile.value) {
            is_mobile.value = true;
        }
    });
}

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

// сортировка по дате создания (сначала новые)
onMounted(() => {
    tasks_data.value = data.value.toSorted((a, b) => a.date_time - b.date_time);
});
</script>

<style lang="scss">
#home-section {
    padding: 15px;
    position: relative;
    height: 100%;
    .n-scrollbar-rail {
        right: 1px;
    }
    .home-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        .add-form {
            display: flex;
            flex-direction: column;
            .add-form-inp-wrapper {
                display: grid;
                grid-template-columns: 3fr 1fr;
                gap: 12px;
            }
            .add-form__button {
                color: var(--bg);
                border-radius: 12px;
            }
            .add-form__sort {
                display: flex;
                gap: 12px;
                margin-top: 12px;
                .n-form-item {
                    width: 100%;
                }
            }
        }
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
