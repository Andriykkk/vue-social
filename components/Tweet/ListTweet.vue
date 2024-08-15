<template>
  <div>
    <div class="p-4" v-if="isEmptyArray">
      <p class="text-center text-gray-500">No tweets 😢</p>
    </div>
    <div
      v-for="tweet in props.tweets"
      :key="tweet.id"
      class="pb-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300"
      :class="twitterBorderColor"
    >
      <TweetItem :tweet="tweet" />
    </div>
  </div>
</template>

<script setup>
const { twitterBorderColor } = useTailwindConfig();
const props = defineProps({
  tweets: {
    type: Array,
    required: true,
  },
});

const isEmptyArray = computed(
  () => props.tweets.length === 0
);
</script>

<style></style>
