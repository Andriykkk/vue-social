<template>
  <div>
    <MainSection :title="'Home'" :loading="loading">
      <Head>
        <Title>Home / Twitter</Title>
      </Head>

      <div class="border-b" :class="twitterBorderColor">
        <TweetForm v-if="user" :user="user" />
      </div>

      <TweetListTweet :tweets="homeTweets" />
    </MainSection>
  </div>
</template>

<script lang="ts" setup>
const { twitterBorderColor } = useTailwindConfig();
const { getHomeTweets } = useTweets();
const loading = ref(false);
const homeTweets = ref([]);
const { useAuthUser } = useAuth();

const user = useAuthUser();

onBeforeMount(async () => {
  loading.value = true;
  try {
    const { tweets } = await getHomeTweets();
    homeTweets.value = tweets;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});
</script>

<style></style>
