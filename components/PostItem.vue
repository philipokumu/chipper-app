<script setup>
import { HeartIcon } from '@heroicons/vue/24/outline'
import { storeToRefs } from 'pinia'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const favoriteStore = useFavoriteStore()
const { isUserFavorited, postBelongsToCurrentUser, isPostFavorited } = storeToRefs(favoriteStore)
const isCurrentUserPost = computed(() => postBelongsToCurrentUser.value(props.post.user.id))
const isFollowing = computed(() => isUserFavorited.value(props.post.user.id))
const postIsFavorited = computed(() => isPostFavorited.value(props.post.id))

async function handleFollowToggle() {
  await favoriteStore.toggleUserFavorite(props.post.user)
}

async function handleFavoritePostToggle() {
  await favoriteStore.togglePostFavorite(props.post)
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
      <button v-show="!isCurrentUserPost" class="font-medium bg-blue-200 text-sm px-2 rounded-full" @click="handleFollowToggle">
        {{ isFollowing  ? 'Unfollow' : 'Follow' }}
      </button>
    </div>
    <p>
      {{ post.body }}
    </p>
    <button
      v-show="!isCurrentUserPost"
      class="bg-red-200 text-red-500 flex items-center justify-center gap-2 p-4 rounded-lg"
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