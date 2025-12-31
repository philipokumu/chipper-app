<script setup>
  const postStore = usePostStore()
  const title = ref('')
  const body = ref('')
  const errorMessage = ref('')
  const isSubmitting = ref(false)

  async function submit () {
    if (!title.value || !body.value) return
    isSubmitting.value = true
    try {
      await postStore.createPost({ title: title.value, body: body.value })
        title.value = '' 
        body.value = ''
        errorMessage.value = ''
      } catch (err) {
        errorMessage.value = "Could not save your post."
      }
    isSubmitting.value = false
  }
</script>

<template>
  <form
    class="grid gap-4 mb-16"
    @submit.prevent="submit">
    <input
      placeholder="Post title"
      v-model="title"
      class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base">
    <textarea
      placeholder="What is happening?!"
      v-model="body"
      class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base"></textarea>
    <button class="bg-blue-600 text-white px-8 py-4 rounded-lg" :disabled="isSubmitting">
      {{ isSubmitting ? 'Posting...' : 'Post' }}
    </button>
  </form>
</template>