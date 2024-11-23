<template>
    <NModal v-model:show="state_popup">
        <div class="user-popup">
            <h3>Введите новый {{ type == "login" ? "логин" : "пароль" }}</h3>
            <NForm ref="form_ref" :model="form_data" :rules="rules">
                <BaseInput
                    label="Старый пароль"
                    path="old_pass"
                    v-model:value="form_data.old_pass"
                    type_input="password"
                />
                <BaseInput
                    :label="type == 'login' ? 'нвоый логин' : 'нвоый пароль'"
                    path="info"
                    v-model:value="form_data.info"
                    :type_input="type == 'login' ? '' : 'password'"
                />
            </NForm>
            <div class="user-popup__btns">
                <NButton type="primary" @click="state_popup = false">отмена</NButton>
                <NButton type="primary" @click="changeInfo()"
                    >изменить {{ type == "login" ? "логин" : "пароль" }}</NButton
                >
            </div>
        </div>
    </NModal>
</template>

<script setup>
import {NModal, NButton, NForm, useMessage} from "naive-ui";

const props = defineProps({
    type: null,
});

const user_info = useState("user_info"); // информация о пользователе
const state_popup = useState("show_info_popup"); // показывать ли текущий попап

const message = useMessage();

const form_ref = ref(null);
const form_data = ref({
    info: "",
    old_pass: "",
});
const rules = ref({
    info: {
        required: true,
        trigger: ["input", "blur"],
        validator(rule, value) {
            if (props?.type == "login") {
                if (!value) {
                    return new Error("Обязательное поле");
                }
            } else {
                if (!value) {
                    return new Error("Обязательное поле");
                }
                if (value.length < 6) {
                    return new Error("Пароль должен содержать больше 6 символов");
                }
            }
        },
    },
});

// изменение иформации пользователя
async function changeInfo() {
    form_ref.value?.validate(async errors => {
        if (errors) return;

        try {
            let response = null;
            if (props?.type == "login")
                response = await userLoginChange(form_data.value.old_pass, form_data.value.info);
            else response = await userPasswordChange(form_data.value.old_pass, form_data.value.info);
            if (response.data.value.code == 200) {
                message.success(response.data.value.message);
                state_popup.value = false;
                if (response.data.value?.data?.new_login) {
                    user_info.value.user_login = response.data.value.data.new_login;
                }
            } else {
                message.error(response.data.value.message);
            }
        } catch (error) {
            message.error("Ошибка сервера");
        }
    });
}

watch(
    // очищает форму после закрытия попапа
    () => state_popup.value,
    new_value => {
        if (!new_value) {
            form_data.value.info = "";
            form_data.value.old_pass = "";
        }
    }
);
</script>

<style lang="scss">
.user-popup {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: var(--bg);
    border-radius: 12px;
    max-width: 400px;
    .user-popup__btns {
        display: flex;
        gap: 16px;
        button {
            width: calc(50% - 8px);
        }
    }
}
</style>
