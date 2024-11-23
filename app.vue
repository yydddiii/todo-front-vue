<template>
    <div class="app-wrapper" :class="theme">
        <BasePreloader />
        <n-config-provider
            :theme-overrides="themeOverrides"
            :locale="ruRU"
            :date-locale="dateRuRU"
        >
            <n-message-provider>
                <n-notification-provider placement="bottom-right">
                    <n-dialog-provider>
                        <NuxtLayout>
                            <NuxtPage />
                        </NuxtLayout>
                    </n-dialog-provider>
                </n-notification-provider>
            </n-message-provider>
        </n-config-provider>
    </div>
</template>

<script setup>
import {
    ruRU,
    dateRuRU,
    NConfigProvider,
    NMessageProvider,
    NNotificationProvider,
    NDialogProvider,
} from "naive-ui";
const themeOverrides = {
    common: {
        primaryColor: "#8a40de",
        primaryColorHover: "#8a40de",
        primaryColorPressed: "#8a40de",
        primaryColorSuppl: "#8a40de",
    },
    Input: {
        textColor: "var(--text)",
        textColorDisabled: "var(--accent)",
        caretColor: "var(--accent)",
        accentColor: "var(--accent)",
        accentColorDisabled: "var(--accent)",
        color: "var(--bg)",
        colorDisabled: "var(--bg)",
        colorFocus: "var(--bg)",
        border: "1px solid var(--gray)",
        borderHover: "1px solid var(--accent)",
        borderDisabled: "1px solid var(--gray)",
        borderFocus: "1px solid var(--accent)",
        boxShadowFocus: "0px 1px 2px 0px #1018280D, 0px 0px 0px 4px #F4EBFF",
        iconColor: "var(--accent)",
        iconColorDisabled: "var(--accent)",
        iconColorHover: "var(--accent)",
        iconColorPressed: "var(--accent)",
        suffixTextColor: "var(--accent)",
    },
    Message: {
        textColor: "var(--text)",
        textColorError: "var(--text)",
        textColorInfo: "var(--text)",
        color: "var(--bg)",
    },
};

const theme = useCookie("theme");
</script>

<style src="~/assets/styles/roots.css" />
<style src="~/assets/styles/main.css" />
