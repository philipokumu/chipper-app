<script setup>
import { storeToRefs } from 'pinia'

definePageMeta({
  middleware: ['validate-session']
})

const user = useUser()
const favoriteStore = useFavoriteStore()
const postStore = usePostStore()
await postStore.fetchPosts()
await useAsyncData('fetch-favorites', () => favoriteStore.fetchFavorites())

const { posts, newPostsBuffer } = storeToRefs(postStore)

let pollingInterval = null

// Check every 30 seconds
onMounted(() => {
  pollingInterval = setInterval(() => {
    postStore.checkForNewPosts()
  }, 30000)
})

// So that we don't leave a timer running when we leave the page hence hitting api unnecessarily
onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval)
})

function loadNewPostsIntoFeed() {
  postStore.displayNewPosts()
}

</script>

<template>
  <PostForm
    v-if="!user.isGuest" />
    <button
      v-show="newPostsBuffer.length > 0"
      class="font-medium bg-gray-200 text-sm p-2 rounded-full w-full my-8"
      @click="loadNewPostsIntoFeed"
    >
      Load more posts...
    </button>
  <div class="grid gap-16">
    <PostItem
      v-for="post in posts"
      :key="post.id"
      v-bind="{ post }" />
  </div>
</template>
