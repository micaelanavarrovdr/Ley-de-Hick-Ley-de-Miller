// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light"
  html.setAttribute("data-theme", currentTheme)
  updateThemeIcon(currentTheme)


    html.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcon(newTheme)

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe cards for scroll animations
  document.querySelectorAll(".card, .example-card").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

  // Add hover effects for better interactivity
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Enhanced button interactions
  document.querySelectorAll(".example-btn").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      const arrow = this.querySelector(".btn-arrow")
      if (arrow) {
        arrow.style.transform = "translateX(8px)"
      }
    })

    btn.addEventListener("mouseleave", function () {
      const arrow = this.querySelector(".btn-arrow")
      if (arrow) {
        arrow.style.transform = "translateX(0)"
      }
    })
  })
})
