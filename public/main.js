// Mobile menu
const menuBtn = document.getElementById('menu-btn')
const mobileMenu = document.getElementById('mobile-menu')

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('open')
    mobileMenu.classList.toggle('open')
  })

  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      menuBtn.classList.remove('open')
      mobileMenu.classList.remove('open')
    })
  })
}

// Form submit
const form = document.getElementById('lead-form')

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    alert('Thank you! We will contact you soon.')
    form.reset()
  })
}

// Google Ads phone call conversion
document.querySelectorAll('a[href^="tel:"]').forEach(function (phoneLink) {
  phoneLink.addEventListener('click', function () {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-10978179511/dDNrCKiZ7YIcELfz5vIo',
      })
    }
  })
})

// Scroll animations
const scrollElements = document.querySelectorAll('.scroll-animate')

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
)

scrollElements.forEach(function (el) {
  observer.observe(el)
})
