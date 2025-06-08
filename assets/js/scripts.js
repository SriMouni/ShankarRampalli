// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
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

  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)"
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)"
      }
    }
  })

  // Add animation on scroll
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

  // Observe all cards for animation
  document
    .querySelectorAll(
      ".custom-card, .stat-card, .experience-card, .project-card, .gallery-item, .cricket-card, .services-card, .award-card, .cricket-stats-card, .cricket-achievement-card, .timeline-item",
    )
    .forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(20px)"
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(card)
    })

  // Gallery filtering
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter")

      // Update active button
      document.querySelectorAll("[data-filter]").forEach((btn) => {
        btn.classList.remove("active")
      })
      this.classList.add("active")

      // Filter gallery items
      document.querySelectorAll(".gallery-item-container").forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Initialize Lightbox if available
  const lightbox = window.lightbox // Declare the lightbox variable
  if (typeof lightbox !== "undefined") {
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true,
      albumLabel: "Image %1 of %2",
    })
  }

  // Cricket statistics counter animation
  function animateCounters() {
    const counters = document.querySelectorAll(".counter")
    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const increment = target / 100
      let current = 0

      const updateCounter = () => {
        if (current < target) {
          current += increment
          counter.textContent = Math.ceil(current)
          setTimeout(updateCounter, 20)
        } else {
          counter.textContent = target
        }
      }

      updateCounter()
    })
  }

  // Trigger counter animation when cricket stats section is visible
  const cricketStatsSection = document.querySelector(".cricket-stats-section")
  if (cricketStatsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters()
            statsObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    statsObserver.observe(cricketStatsSection)
  }

  // Form submission handling
  const contactForms = document.querySelectorAll("form")
  contactForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(form)
      const data = Object.fromEntries(formData)

      // Show success message (you can replace this with actual form submission)
      alert("Thank you for your message! I will get back to you soon.")

      // Reset form
      form.reset()
    })
  })

  // Mobile menu handling
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (navbarToggler && navbarCollapse) {
    // Close mobile menu when clicking on a link
    document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click()
        }
      })
    })
  }

  // Parallax effect for hero sections
  window.addEventListener("scroll", () => {
    const heroSections = document.querySelectorAll(".hero-section")
    heroSections.forEach((hero) => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      hero.style.transform = `translateY(${rate}px)`
    })
  })

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Initialize external links
  function initExternalLinks() {
    // Select all links that are either external (http/https) or HTML page links except anchors
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('http') || href.endsWith('.html')) && !href.startsWith('#')) {
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize external links
    initExternalLinks();
});

})

// Utility functions
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme")
  localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light")
}

// Load saved theme
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme")
  }
})
