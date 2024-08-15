<template>
  <div>
    <MainSection :title="'Tweet'" :loading="loading">
      <Head>
        <Title>Tweet</Title>
      </Head>

      <TweetDetails :tweet="tweet" :user="user" />
    </MainSection>
  </div>
</template>

<script setup>
const loading = ref(false);
const tweet = ref(null);
const { getTweetById } = useTweets();
const { useAuthUser } = useAuth();
const user = useAuthUser();

function getTweetIdFromRoute() {
  return useRoute().params.id;
}

async function getTweet() {
  loading.value = true;
  try {
    const response = await getTweetById(
      getTweetIdFromRoute()
    );

    tweet.value = response.tweet;
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
}

onBeforeMount(async () => {
  await getTweet();
});
</script>

<style></style>
