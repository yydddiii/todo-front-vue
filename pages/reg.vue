<template>
    <section id="reg-section">
        <div class="container reg-container">
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
                <BaseInput
                    label="Повторите пароль"
                    path="re_pass"
                    v-model:value="form_data.re_pass"
                    type_input="password"
                />
                <NButton type="primary" @click="validateReg()"
                    >Зарегистрироваться</NButton
                >
            </NForm>
            <NuxtLink to="/login" class="small"
                >У меня уже есть аккаунт</NuxtLink
            >
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
            if (value.length < 6) {
                return new Error("Пароль должен содержать больше 6 символов");
            }
        },
    },
    re_pass: {
        required: true,
        trigger: ["input", "blur"],
        validator(rule, value) {
            if (!value) {
                return new Error("Обязательное поле");
            } else if (value != form_data.value.pass) {
                return new Error("пароли должны совпадать");
            }
        },
    },
});

function validateReg() {
    // регистрация
    form_ref.value?.validate(async (errors) => {
        if (!errors)
            await userRegister(
                form_data.value.login,
                form_data.value.pass
            );
    });
}
</script>

<style lang="scss">
.reg-container {
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
