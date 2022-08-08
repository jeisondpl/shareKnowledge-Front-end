import Swal from 'sweetalert2'

export const dev = () => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'En desarrollo!',
  })
}
