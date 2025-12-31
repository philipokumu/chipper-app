<script setup>
import { HeartIcon } from '@heroicons/vue/24/outline'
import { storeToRefs } from 'pinia'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const user = useUser()
const favoriteStore = useFavoriteStore()
const { isUserFavorited, postBelongsToCurrentUser, isPostFavorited, loading } = storeToRefs(favoriteStore)
const isCurrentUserPost = computed(() => postBelongsToCurrentUser.value(props.post.user.id))
const isFollowing = computed(() => isUserFavorited.value(props.post.user.id))
const postIsFavorited = computed(() => isPostFavorited.value(props.post.id))

async function handleFollowToggle() {
  if (!checkAuth()) return
  await favoriteStore.toggleUserFavorite(props.post.user)
}

async function handleFavoritePostToggle() {
  if (!checkAuth()) return
  await favoriteStore.togglePostFavorite(props.post)
}

function checkAuth() {
  if (user.isGuest) {
    navigateTo('/login')
    return false
  }
  return true
}
</script>

<template>
  <div class="grid gap-3">
    <h4 class="font-bold text-lg">
      {{ post.title }}
    </h4>
    <div class="flex justify-between bg-gray-100 p-4 rounded-lg">
      <div>
        by <strong>{{ post.user.name }}</strong>
      </div>
      <button
        :disabled="isCurrentUserPost || loading"
        class="font-medium bg-blue-200 text-sm px-2 rounded-full"
        @click="handleFollowToggle">
        {{ isFollowing  ? 'Unfollow' : 'Follow' }}
      </button>
    </div>
    <p>
      {{ post.body }}
    </p>
    <div v-if="post.image_url">
      <img
        :src="post.image_url"
        :alt="`Image for post titled ${post.title}`"
        class="w-full rounded-lg" />
    </div>
    <button
      :disabled="isCurrentUserPost || loading"
      class="flex items-center justify-center gap-2 p-4 rounded-lg"
      :class="[
        postIsFavorited 
        ? 'bg-red-200 text-red-600' 
        : 'bg-green-200 text-green-700'
      ]"
      @click="handleFavoritePostToggle"
    >
      <HeartIcon
        class="h-6 stroke-current" />
      <span class="font-bold">
        {{ postIsFavorited ? 'Remove from favorites' : 'Add to my favorites' }}
      </span>
    </button>
  </div>
</template>
