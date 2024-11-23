<template>
    <n-form-item
        :label="label"
        class="base-input"
        :class="value ? 'done' : ''"
        :path="path"
        :show-require-mark="false"
    >
        <n-input
            :placeholder="label"
            v-model:value="value"
            :type="type_input"
            show-password-on="click"
            :rows="2"
            :autosize="
                type_input == 'textarea' ? { minRows: 2, maxRows: 5 } : false
            "
        />
    </n-form-item>
</template>

<script setup>
import { NFormItem, NInput } from "naive-ui";

const value = defineModel("value");

const props = defineProps({
    // плейсхолдер и название
    label: {
        type: String,
    },
    // для n-form(валидация)
    path: {
        type: String,
    },
    // тип инпута
    type_input: {
        type: String,
        default: "text",
    },
});
</script>

<style>
.base-input.n-form-item {
    position: relative;
    grid-template-rows: none !important;
}

.base-input.disabled {
    cursor: not-allowed;
}

.base-input.disabled * {
    pointer-events: none;
    user-select: none;
}

/* .base-input.disabled .n-form-item-blank {
    pointer-events: none;
} */

.base-input.n-form-item .n-form-item-label {
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
}

.base-input .n-input .n-input__border,
.base-input .n-input .n-input__state-border {
    border-radius: 12px;
    transition: var(--base-transition);
}

.base-input .n-input:not(.n-input--disabled):hover .n-input__state-border {
}

/* .base-input.n-form-item .n-input:hover .n-input__state-border {
    border: 1px solid var(--text)5C;
} */

.base-input.n-form-item .n-input .n-input-wrapper {
    padding: 12px 16px;
}

.base-input.n-form-item .n-input {
    font-size: 12px;
    font-weight: 600;
    line-height: 15.84px;
    text-align: left;
    border-radius: 14px;
}

.base-input.n-form-item .n-input .n-input__input-el {
    height: 12px;
    caret-color: var(--accent);
}

.base-input.n-form-item:has(input:focus) .n-form-item-label,
.base-input.n-form-item:has(textarea:focus) .n-form-item-label {
    opacity: 1;
    color: var(--accent);
    border: 1px solid var(--accent);
}

.base-input.section-form.n-form-item:has(input:focus) .n-form-item-label,
.base-input.section-form.n-form-item:has(textarea:focus) .n-form-item-label {
    opacity: 0;
}

.base-input.n-form-item
    .n-input:not(.n-input--disabled).n-input--focus
    .n-input__state-border {
    border: 1px solid var(--accent);
    box-shadow: none;
}

.base-select.n-form-item.done .base-select-main,
.base-input.n-form-item.done .n-input__state-border {
    border: 1px solid var(--text);
}

.base-select.n-form-item.done .n-form-item-label,
.base-input.n-form-item.done .n-form-item-label {
    opacity: 1;
    color: var(--text);
}

.base-input.n-form-item .n-input__placeholder {
    transition: var(--base-transition);
    font-size: 12px;
    font-weight: 600;
    line-height: 15.84px;
    color: var(--dark_gray);
    text-align: left;
}

.base-input.n-form-item:has(input:focus) .n-input__placeholder,
.base-input.n-form-item:has(textarea:focus) .n-input__placeholder {
    opacity: 0;
}

.base-input.n-form-item
    .n-input.n-input--error-status:not(.n-input--disabled)
    .n-input__state-border {
    border: 1px solid var(--error);
}

.base-input.n-form-item:has(
        .n-input.n-input--error-status:not(.n-input--disabled)
    )
    .n-form-item-label {
    opacity: 1;
    color: var(--error);
    border-color: var(--error);
}

.base-input.n-form-item .n-form-item-feedback-wrapper {
    font-size: 9px;
    font-weight: 600;
    line-height: 11.16px;
    text-align: left;
    padding: 1px 0 0 14px;
    min-height: 12px;
    max-height: 12px;
}

.base-input.n-form-item
    .n-form-item-feedback-wrapper
    .n-form-item-feedback.n-form-item-feedback--error {
    color: var(--error);
}

.base-input.n-form-item
    .n-input.n-input--error-status:not(.n-input--disabled)
    .n-input__input-el {
    color: var(--error);
    caret-color: var(--error);
}

.base-input .n-form-item-feedback__line {
    width: max-content;
    background: var(--bg);
    padding: 2px;
    border-radius: 5px;
    position: relative;
    z-index: 50;
}

/* section-input */

.base-input.section-form.n-form-item:has(input:focus) .n-input__placeholder,
.base-input.section-form.n-form-item:has(textarea:focus) .n-input__placeholder {
    opacity: 1;
}

.base-input.section-form .n-input {
    background: rgba(255, 255, 255, 0.24);
    border-radius: 16px;
}

.base-input.section-form .n-input__state-border {
    border-radius: 16px;
    border: 1px solid #88cdd1;
}

.base-input.section-form .n-input__border {
    border: 1px solid #88cdd1;
    border-radius: 16px;
}

.base-input.section-form.n-form-item .n-input__placeholder {
    color: #f1f9f9;
    font-size: 14px;
    font-weight: 600px;
    line-height: 18px;
}

.base-input.section-form.n-form-item .n-input:hover .n-input__state-border {
    border: 1px solid var(--bg);
}

.base-input.section-form.n-form-item.done .n-input__state-border {
    border: 1px solid var(--bg);
}

.base-input.section-form.done .n-input__border {
    border: 1px solid var(--bg);
}

.base-input.section-form.n-form-item.done .n-form-item-label {
    display: none;
}

.base-input.section-form:focus .n-input__border {
    color: var(--bg);
}

.base-input.section-form.n-form-item .n-input .n-input-wrapper {
    padding: 16px;
}

.base-input.section-form.n-form-item:has(input:focus) .n-input__border,
.base-input.section-form.n-form-item:has(input:focus) .n-input__state-border {
    border: 1px solid var(--bg);
}

.base-input.section-form.n-form-item .n-input .n-input__input-el {
    color: var(--bg);
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    caret-color: var(--bg);
}

.base-input.section-form.n-form-item
    .n-input:not(.n-input--disabled).n-input--focus
    .n-input__state-border {
    border: 1px solid var(--bg);
}

.base-input.section-form.n-form-item:has(
        .n-input.n-input--error-status:not(.n-input--disabled)
    )
    .n-form-item-label {
    opacity: 0;
}

.base-input.section-form.n-form-item:has(
        .n-input.n-input--error-status:not(.n-input--disabled)
    )
    .n-input__placeholder {
    color: var(--error);
}

.base-input.section-form.n-form-item .n-form-item-feedback-wrapper {
    padding: 2px 0 2px 14px;
}

.section-form
    .n-input.n-input--error-status:not(.n-input--disabled).n-input--focus {
    background-color: rgba(255, 255, 255, 0.24);
}

.base-input.section-form.n-form-item .n-form-item-feedback-wrapper {
    min-height: 15px;
}

/* footer-form-input */

.base-input.footer-form-input.n-form-item:has(input:focus)
    .n-input__placeholder,
.base-input.footer-form-input.n-form-item:has(textarea:focus)
    .n-input__placeholder {
    opacity: 1;
}

.base-input.footer-form-input .n-input {
    background: rgba(255, 255, 255, 0.12);
    border-radius: 16px;
}

.base-input.footer-form-input .n-input__state-border {
    border-radius: 16px;
    border: unset;
}

.base-input.footer-form-input .n-input__border {
    border: unset;
    border-radius: 16px;
}

.base-input.footer-form-input.n-form-item .n-input__placeholder {
    color: var(--bg);
    font-size: 14px;
    font-weight: 600px;
    line-height: 18px;
}

.base-input.footer-form-input.n-form-item
    .n-input:hover
    .n-input__state-border {
    border: unset;
}

.base-input.footer-form-input.n-form-item.done .n-input__state-border {
    border: unset;
}

.base-input.footer-form-input.done .n-input__border {
    border: unset;
}

.base-input.footer-form-input.n-form-item.done .n-form-item-label {
    display: none;
}

.base-input.footer-form-input:focus .n-input__border {
    color: var(--bg);
}

.base-input.footer-form-input.n-form-item .n-input .n-input-wrapper {
    padding: 16px;
}

.base-input.footer-form-input.n-form-item:has(input:focus) .n-input__border,
.base-input.footer-form-input.n-form-item:has(input:focus)
    .n-input__state-border {
    border: unset;
    background-color: rgba(255, 255, 255, 0.12);
}

.base-input.footer-form-input.n-form-item .n-input .n-input__input-el {
    color: var(--bg);
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    caret-color: var(--bg);
}

.base-input.footer-form-input.n-form-item
    .n-input:not(.n-input--disabled).n-input--focus
    .n-input__state-border {
    border: unset;
}

.base-input.footer-form-input.n-form-item:has(
        .n-input.n-input--error-status:not(.n-input--disabled)
    )
    .n-form-item-label {
    opacity: 0;
}

.base-input.footer-form-input.n-form-item:has(
        .n-input.n-input--error-status:not(.n-input--disabled)
    )
    .n-input__placeholder {
    color: var(--error);
}

.base-input.footer-form-input.n-form-item .n-form-item-feedback-wrapper {
    padding: 2px 0 2px 14px;
}

.footer-form-input
    .n-input.n-input--error-status:not(.n-input--disabled).n-input--focus {
    background-color: rgba(255, 255, 255, 0.12);
}

.base-input.footer-form-input.n-form-item .n-form-item-feedback-wrapper {
    min-height: 15px;
}

.n-input.n-input--error-status:not(.n-input--disabled).n-input--focus {
    background-color: var(--bg) !important;
}

.base-input.footer-form-input.n-form-item .n-form-item-label {
    display: none;
}

.base-input .n-input__textarea .n-input__textarea-el {
    padding: 0 !important;
}

.base-input .n-input__textarea .n-input__placeholder {
    padding: 1px 0;
}
</style>
