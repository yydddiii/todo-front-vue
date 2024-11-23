<template>
        <NCarousel
            slides-per-view="auto"
            :loop="false"
            :draggable="true"
            :default-index="1"
            ref="card_carousele"
            @update:current-index="
                (index) => {
                    current_index = index;
                }
            "
            :show-dots="false"
        >
            <NCarouselItem style="width: 15%; height: unset; position: relative">
            </NCarouselItem>
            <NCarouselItem style="width: 100%">
                <div class="mobile-task-item" :id="data.id">
                    <div class="mobile-task-item__info">
                        <h4 :class="data.is_checked ? '_checked' : ''">
                            {{ data.name }}
                        </h4>
                        <span v-if="data?.type_id">{{
                            typeIdToTypeName(data?.type_id)
                        }}</span>
                        <p class="small">{{ data.date }}</p>
                    </div>
                    <div class="mobile-task-item__btns">
                        <NCheckbox
                            v-model:checked="value"
                            class="mobile-task-item__checkbox"
                            v-if="route.path == '/'"
                        ></NCheckbox>
                    </div>
                </div>
            </NCarouselItem>
            <NCarouselItem style="width: 15%; height: unset; position: relative">
            </NCarouselItem>
        </NCarousel>
    <!-- <NButton
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
    > -->
</template>

<script setup>
import { NCheckbox, useMessage, NCarousel, NCarouselItem } from "naive-ui";

const props = defineProps({
    data: null, // принимает данные о задаче
});

const route = useRoute();

// const state_select_task = useState("state_select_task"); //хранит данные выбранной задачи;
// const show_arc_popup = useState("show_arc_popup"); // поп-ап для архивирования заадчи
// const show_del_popup = useState("show_del_popup"); // поп-ап для попап для удаления задачи
// const show_ch_popup = useState("show_ch_popup"); // поп-ап для изменения задачи
// const data_state = useState("data"); // все задачи
// const types = useState("types"); // все типы задач;

const value = ref(props.data.is_checked); // чек-бокс карточки
const card_carousele = ref(null); // ref карточки
const current_index = ref(1);
function toMain() {
    // if (current_index.value != 1) card_carousele.value?.to(1);
}
</script>

<style lang="scss">
.mobile-task-item {
    display: flex;
    justify-content: space-between;
    border-radius: 12px;
    padding: 10px;
    background-color: var(--bg);
    align-items: center;
    .mobile-task-item__checkbox {
        height: 20px;
        width: 20px;
        margin-right: 10px;
        .n-checkbox-box-wrapper {
            height: 20px;
            width: 20px;
            .n-checkbox-box {
                height: 20px;
                width: 20px;
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

</style>
