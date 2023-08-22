<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: String,
  placeholder: String,
  class: String,
  inputClass: String,
  label: String,
  type: String,
  errors: Array,
  hint: String
})

const isPlainText = ref(false)
const input = ref(null)
const { errors } = toRefs(props)

const handle = event => {
  emit('update:modelValue', event.target.value)
}

const toggle = () => {
  isPlainText.value = !isPlainText.value
}

const focus = () => {
  input.value.focus()
}

defineExpose({
  focus
})
</script>

<template>
  <div class="flex flex-col gap-2" :class="props.class">
    <label
      v-if="label"
      class="text-base font-normal">
      {{ label }}
    </label>
    <div class="relative rounded-lg">
      <input
        ref="input"
        v-bind="$attrs"
        :value="props.modelValue"
        :type="type === 'password' && isPlainText ? 'text' : type"
        :placeholder="placeholder"
        class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base"
        :class="inputClass"
        @input="handle">

      <button
        v-if="type === 'password'"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
        tabindex="-1"
        type="button"
        @click.prevent="toggle">
        <Component
          :is="isPlainText ? EyeSlashIcon : EyeIcon"
          class="h-6 stroke-current" />
      </button>
    </div>
    <div
      v-if="errors"
      class="text-sm text-red-500">
      {{ errors[0] }}
    </div>
    <div
      v-if="hint"
      class="mt-px w-full rounded-lg px-4 py-3 text-xs font-light text-gray-400">
      {{ hint }}
    </div>
  </div>
</template>
