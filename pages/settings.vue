<template>
    <section id="settings-section">
        <div class="container settings-container">
            <div class="settings-item user-settings">
                <h3>Настройки аккаунта</h3>
                <p @click="openPopup('login')">Изимененить логина</p>
                <p @click="openPopup('password')">Изимененить пароля</p>
                <p @click="leave()">Выйти из аккаунта</p>
            </div>
            <div class="settings-item task-settings">
                <h3>Настройки задач</h3>
                <p @click="change_types_popup = true">Типы задач</p>
            </div>
            <div class="settings-item color-settings">
                <h3>Настройки темы</h3>
                <p @click="theme = 'dark'">Темная тема</p>
                <p @click="theme = ''">Светлая тема</p>
            </div>
        </div>
    </section>
    <PopupsChangeUserData :type="type_popup" />
    <PopupsTypes />
</template>

<script setup>
const theme = useCookie("theme");

const change_types_popup = useState("types_popup"); // попап для измененеия типов
const show_info_popup = useState("show_info_popup"); // попап для изменения данных пользователя

const type_popup = ref(null); // тип попапа для изменения данных пользователя

// открытие попапа
function openPopup(type) {
    type_popup.value = type;
    show_info_popup.value = true;
}

// выход из аккаунта
function leave() {
    localStorage.setItem("token", JSON.stringify({name: null}));
    useRouter().push("/login");
}
</script>

<style lang="scss">
#settings-section {
    padding: 15px;
    .settings-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        .settings-item {
            h3 {
                margin-bottom: 5px;
            }
            p {
                margin-left: 10px;
                cursor: pointer;
                width: max-content;
                transition: 0.3s;
                &:hover {
                    color: var(--accent);
                }
            }
            background-color: var(--bg);
            padding: 12px;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .task-settings {
            span {
                margin-left: 20px;
                transition: 0.3s;
                color: var(--text);
            }
        }
    }
}
</style>
