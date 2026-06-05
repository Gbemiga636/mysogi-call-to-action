import './style.css'

// Form submit
const form = document.getElementById('lead-form')

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    alert('Thank you! We will contact you soon.')
    ;(form as HTMLFormElement).reset()
  })
}

// Scroll animations
const scrollElements = document.querySelectorAll('.scroll-animate')

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
)

scrollElements.forEach((el) => observer.observe(el))
