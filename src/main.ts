import './style.css'

const form = document.getElementById('lead-form')

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    alert('Thank you! We will contact you soon.')
    ;(form as HTMLFormElement).reset()
  })
}
