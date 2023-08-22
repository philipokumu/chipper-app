import { get } from 'lodash-es'
import Swal from 'sweetalert2'

export default function () {
  function showErrorModal (e, text) {
    return Swal.fire({
      title: 'Error',
      text: get(e, 'response._data.message', text),
      icon: 'error'
    })
  }

  function getCookieParams () {
    const config = useRuntimeConfig()
    const today = new Date()
    const tomorrow = new Date()
    const secure = false

    tomorrow.setDate(today.getDate() + 1)

    return {
      path: '/',
      maxAge: tomorrow,
      sameSite: secure ? 'none' : 'strict',
      secure
    }
  }

  return {
    showErrorModal,
    getCookieParams
  }
}
