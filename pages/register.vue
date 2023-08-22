<script setup>
definePageMeta({
  middleware: ['validate-session', 'require-guest']
})

const user = useUser()
const router = useRouter()
const { showErrorModal } = useHelpers()

const form = reactive({
  name: '',
  email: '',
  password: ''
})

const loading = ref(false)

async function submit () {
  loading.value = true

  try {
    await user.register(toRaw(form))
    router.push('/')
  } catch (e) {
    showErrorModal(e)
  }

  loading.value = false
}
</script>

<template>
  <form
    class="flex flex-col gap-8"
    @submit.prevent="submit">

    <h1 class="text-3xl">
      Register
    </h1>

    <FormInput
      v-model="form.name"
      required
      type="text"
      placeholder="Enter you name"
      label="Your Name" />
    <FormInput
      v-model="form.email"
      required
      type="email"
      placeholder="Enter you email"
      label="Your Email" />
    <FormInput
      v-model="form.password"
      required
      type="password"
      placeholder="Password"
      label="Password" />

    <button class="bg-blue-600 text-white px-8 py-4 rounded-lg">
      Register
    </button>
  </form>
</template>
