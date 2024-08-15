<template>
  <div>
    <TweetItem :tweet="props.tweet" />
  </div>
</template>

<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style></style>
