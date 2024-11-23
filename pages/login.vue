<template>
    <section id="login-section">
        <div class="container login-container">
            <h4>Введите свои данные</h4>
            <NForm ref="form_ref" :model="form_data" :rules="rules">
                <BaseInput
                    label="Логин"
                    path="login"
                    v-model:value="form_data.login"
                />
                <BaseInput
                    label="Пароль"
                    path="pass"
                    v-model:value="form_data.pass"
                    type_input="password"
                />
                <NButton type="primary" @click="validateLogin()"
                    >Авторизоваться</NButton
                >
            </NForm>
            <NuxtLink to="/reg" class="small">У меня нет аккаунта</NuxtLink>
        </div>
    </section>
</template>

<script setup>
import { NForm, NButton, useMessage } from "naive-ui";

definePageMeta({
    layout: "auth",
});

const message = useMessage();

const form_ref = ref(null);
const form_data = ref({
    login: "",
    pass: "",
});
const rules = ref({
    login: {
        required: true,
        trigger: ["input", "blur"],
        validator(rule, value) {
            if (!value) {
                return new Error("Обязательное поле");
            }
        },
    },
    pass: {
        required: true,
        trigger: ["input", "blur"],
        validator(rule, value) {
            if (!value) {
                return new Error("Обязательное поле");
            }
        },
    },
});
function validateLogin() {
    // вход в аккаунт
    form_ref.value?.validate(async (errors) => {
        if (!errors)
            await userLogin(
                form_data.value.login,
                form_data.value.pass
            );
    });
}
</script>

<style lang="scss">
.login-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    h4 {
        color: var(--bg);
    }
    a {
        color: var(--bg);
        letter-spacing: 0.1em;
    }
    button {
        width: 100%;
    }
}
</style>
