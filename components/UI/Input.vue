<template>
  <div>
    <label
      for=""
      v-if="props.label"
      class="block pl-3 ml-px text-sm font-medium text-gray-700"
      >{{ props.label }}</label
    >
    <div class="mt-1">
      <input
        @input="emitInput($event)"
        :placeholder="props.placeholder"
        :type="props.type"
        :value="props.modelValue"
        class="block w-full px-4 border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(["update:modelValue"]);

const emitInput = (event: any) => {
  emits("update:modelValue", event.target.value);
};

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
});
</script>

<style></style>
