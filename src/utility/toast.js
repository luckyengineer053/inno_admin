import { toast } from 'react-toastify'

export const normalToast = (message) => {
  toast(message)
}

export const successToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT
  })
}

export const errorToast = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT
  })
}

export const warnToast = (message) => {
  toast.warn(message, {
    position: toast.POSITION.TOP_RIGHT
  })
}

export const infoToast = (message) => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT
  })
}

export default {
  normalToast,
  successToast,
  errorToast,
  warnToast,
  infoToast
}

// toast("Custom Style Notification with css class!", {
//   position: toast.POSITION.BOTTOM_RIGHT,
//   className: 'foo-bar'
// })