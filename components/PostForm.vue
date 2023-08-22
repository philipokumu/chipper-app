<script setup>
function submit () {

}
</script>

<template>
  <form
    class="grid gap-4 mb-16"
    @submit.prevent="submit">
    <input
      placeholder="Post title"
      class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base">
    <textarea
      placeholder="What is happening?!"
      class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base"></textarea>
    <button class="bg-blue-600 text-white px-8 py-4 rounded-lg">
      Post
    </button>
  </form>
</template>