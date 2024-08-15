<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon color="blue">
      <template v-slot:icon="{ classes }">
        <ChatBubbleLeftIcon :class="classes" />
      </template>
      <template v-slot:default>
        {{ props.tweet.repliesCount }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green">
      <template v-slot:icon="{ classes }">
        <ArrowPathIcon :class="classes" />
      </template>
      <template v-slot:default>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="red">
      <template v-slot:icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>
      <template v-slot:default>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="blue">
      <template v-slot:icon="{ classes }">
        <ArrowUpTrayIcon :class="classes" />
      </template>
      <template v-slot:default>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>
  </div>
</template>

<script setup>
import {
  ChatBubbleLeftIcon,
  ArrowPathIcon,
  HeartIcon,
  ArrowUpTrayIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
});

function generateRandomNumber() {
  return Math.floor(Math.random() * 100);
}
</script>

<style></style>
