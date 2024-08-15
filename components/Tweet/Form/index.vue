<template>
  <div>
    <div
      v-if="loading"
      class="flex items-center justify-center py-6"
    >
      <UISpinner />
    </div>
    <div v-else>
      <TweetFormInput
        :user="props.user"
        @onSubmit="handleFormSubmit"
      />
    </div>
  </div>
</template>

<script setup>
const { postTweet } = useTweets();
const loading = ref(false);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

async function handleFormSubmit(data) {
  loading.value = true;

  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  loading.value = false;
}
</script>

<style></style>
