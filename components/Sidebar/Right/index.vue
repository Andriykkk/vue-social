<template>
  <div clas="flex flex-col">
    <!-- Search bar -->
    <div class="relative m-2">
      <div
        class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer"
      >
        <div class="w-6 h-6"></div>
      </div>
    </div>
    <SidebarRightPreviewCard :title="'What\'s happening'">
      <SidebarRightPreviewCardItem
        v-for="item in whatsHappeningItems"
        :key="item.title"
      >
        <div>
          <h2
            class="font-bold text-gray-800 text-md dark:text-white"
          >
            {{ item.title }}
          </h2>

          <p class="text-xs text-gray-400">
            {{ item.count }}
          </p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <SidebarRightPreviewCard :title="'What\'s happening'">
      <SidebarRightPreviewCardItem
        v-for="item in whoToFollowItems"
        :key="item.name"
      >
        <div
          class="flex flex-row items-center justify-between p-2"
        >
          <div class="flex flex-row">
            <img
              class="w-10 h-10 rounded-full"
              :src="item.image"
              :alt="item.name"
            />

            <div class="flex flex-col ml-2">
              <h1
                class="text-sm font-bold text-gray-900 dark:text-white"
              >
                {{ item.name }}
              </h1>
              <p class="text-xs text-gray-400">
                {{ item.handle }}
              </p>
            </div>
          </div>
          <div class="flex h-full">
            <button
              class="px-4 py-2 text-xs font-bold text-white bg-black rounded-full dark:text-black dark:bg-white"
            >
              Follow
            </button>
          </div>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
  </div>
</template>

<script lang="ts" setup>
const whatsHappeningItems = ref([
  {
    title: "SpaceX",
    count: "18.8k Tweets",
  },
  {
    title: "#CodingIsFun",
    count: "8.8k Tweets",
  },
  {
    title: "#artforall",
    count: "1.8k Tweets",
  },
]);

const whoToFollowItems = ref([
  {
    name: "Joe Biden",
    handle: "@JoeBiden",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "Joe Biden",
    handle: "@JoeBiden",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "Joe Biden",
    handle: "@JoeBiden",
    image: "https://picsum.photos/200/200",
  },
]);
</script>

<style></style>
