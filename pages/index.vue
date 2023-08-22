<script setup>
definePageMeta({
  middleware: ['validate-session']
})

const { $api } = useNuxtApp()
const user = useUser()

const { data: posts } = await $api.get('posts')
</script>

<template>
  <PostForm
    v-if="!user.isGuest" />
  <div class="grid gap-16">
    <PostItem
      v-for="post in posts"
      :key="post.id"
      v-bind="{ post }" />
  </div>
</template>
