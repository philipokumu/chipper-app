<script setup>
  const postStore = usePostStore()
  const title = ref('')
  const body = ref('')
  const fileInput = ref(null)
  const image = ref(null)
  const errorMessage = ref('')
  const isSubmitting = ref(false)

  async function submit () {
    if (!title.value || !body.value) return
    isSubmitting.value = true
    try {
      await postStore.createPost({ title: title.value, body: body.value, image: image.value  })
        title.value = '' 
        body.value = ''
        errorMessage.value = ''
        image.value = null

        if (fileInput.value) {
          fileInput.value.value = '' 
        }
      } catch (err) {
        errorMessage.value = "Could not save your post."
      }
    isSubmitting.value = false
  }

  function handleFileChange(event) {
    const files = event.target.files
    if (files && files.length > 0) {
      image.value = files[0] 
    }
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
      <input
        ref="fileInput"
        placeholder="upload image"
        type="file"
        accept="image/*"
        @change="handleFileChange"
        class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base"
      />
    <button class="bg-blue-600 text-white px-8 py-4 rounded-lg" :disabled="isSubmitting">
      {{ isSubmitting ? 'Posting...' : 'Post' }}
    </button>
  </form>
</template>