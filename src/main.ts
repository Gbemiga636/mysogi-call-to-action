import './style.css'

const form = document.getElementById('lead-form') as HTMLFormElement

form.addEventListener('submit', function (e) {
  e.preventDefault()
  alert('Thank you! Your request was sent. We will contact you soon.')
  form.reset()
})
