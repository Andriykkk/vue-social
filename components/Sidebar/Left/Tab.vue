<template>
  <div>
    <nuxt-link
      to="#"
      class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white"
      :class="defaultTransition"
    >
      <div
        class="w-6 h-6 text-dark"
        :class="defaultTransition"
      >
        <slot name="icon"></slot>
      </div>
      <div class="hidden ml-4 text-xl xl:block">
        <slot name="name"></slot>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
// import defineProps
const { defaultTransition } = useTailwindConfig();

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const textClasses = computed(() =>
  props.active ? "font-semibold" : "font-normal"
);
</script>

<style></style>
