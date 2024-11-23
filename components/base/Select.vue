<template>
    <NFormItem
        :label="label"
        class="base-select"
        :class="value ? 'done' : ''"
        :path="path"
        :show-require-mark="false"
    >
        <NSelect
            v-model:value="value"
            :options="options"
            :placeholder="label"
            :clearable="clearable"
        />
    </NFormItem>
</template>

<script setup>
import { NFormItem, NSelect } from "naive-ui";

const value = defineModel("value");

const props = defineProps({
    // опции селекта
    options: {
        type: String,
    },
    // для n-form(валидация)
    path: {
        type: String,
    },
    // плейсхолдер и название
    label: {
        type: String,
    },
    // возможность очистить селект
    clearable: {
        type: Boolean,
    },
});
</script>

<style lang="scss">
.base-select {
    position: relative;
    grid-template-rows: none !important;
    .n-base-selection .n-base-selection__border,
    .n-base-selection .n-base-selection__state-border,
    .n-base-selection .n-base-selection-label {
        border-radius: 12px;
        height: 40px;
        background-color: var(--bg);
        color: var(--text);
    }
    .n-base-selection
        .n-base-selection-label
        .n-base-selection-input
        .n-base-selection-input__content {
        color: var(--text);
        position: relative;
        z-index: 2;
    }
    .n-base-selection .n-base-selection-overlay {
        padding: 12px 16px;
        color: var(--text);
    }
    .n-base-selection-placeholder__inner {
        font-size: 12px;
        color: var(--text);
        z-index: 2;
    }
    &.n-form-item .n-form-item-feedback-wrapper {
        font-size: 9px;
        font-weight: 600;
        line-height: 11.16px;
        text-align: left;
        padding: 1px 0 0 14px;
        min-height: 12px;
        max-height: 12px;
        color: var(--text);
    }
    &.n-form-item .n-form-item-label {
        position: absolute;
        padding: 1px 4px 2px 4px;
        border-radius: 6px;
        top: -6px;
        left: 14px;
        z-index: 10;
        background-color: var(--bg);
        font-size: 9px;
        font-weight: 600;
        line-height: 11.16px;
        text-align: left;
        height: 14px;
        opacity: 0;
        transition: var(--base-transition);
        min-height: 14px;
        border: 1px solid var(--text);
        color: var(--text);
    }
    &.n-form-item.done .n-form-item-label,
    &:has(.n-base-selection--active) .n-form-item-label {
        opacity: 1;
        color: var(--accent);
        border: 1px solid var(--accent);
    }
}
</style>
