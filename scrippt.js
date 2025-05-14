// Custom cursor effect
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor-glow")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`
    cursor.style.top = `${e.clientY}px`
  })

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.7)"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)"
  })

  // Interactive elements hover effect
  const interactiveElements = document.querySelectorAll("a, button, .logo")

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2)"
      cursor.style.opacity = "0.7"
    })

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursor.style.opacity = "0.5"
    })
  })

  // Scroll effect for header
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.padding = "15px 5%"
      header.style.backgroundColor = "rgba(18, 18, 18, 0.9)"
    } else {
      header.style.padding = "20px 5%"
      header.style.backgroundColor = "rgba(18, 18, 18, 0.7)"
    }
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active")

    if (navLinks.classList.contains("active")) {
      navLinks.style.display = "flex"
      navLinks.style.flexDirection = "column"
      navLinks.style.position = "absolute"
      navLinks.style.top = "80px"
      navLinks.style.left = "0"
      navLinks.style.width = "100%"
      navLinks.style.backgroundColor = "rgba(18, 18, 18, 0.95)"
      navLinks.style.padding = "20px 0"
      navLinks.style.textAlign = "center"

      // Animate menu toggle
      menuToggle.children[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      menuToggle.children[1].style.opacity = "0"
      menuToggle.children[2].style.transform = "rotate(-45deg) translate(7px, -7px)"
    } else {
      navLinks.style.display = "none"

      // Reset menu toggle
      menuToggle.children[0].style.transform = "none"
      menuToggle.children[1].style.opacity = "1"
      menuToggle.children[2].style.transform = "none"
    }
  })

  // Typing effect for code
  const codeElement = document.querySelector("code")
  if (codeElement) {
    const originalCode = codeElement.innerHTML
    codeElement.innerHTML = ""

    let i = 0
    const typeCode = () => {
      if (i < originalCode.length) {
        codeElement.innerHTML += originalCode.charAt(i)
        i++
        setTimeout(typeCode, 10)
      }
    }

    // Start typing effect when element is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(typeCode, 500)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(codeElement.parentElement)
  }

  // Scroll to section functionality
  document.querySelector(".scroll-indicator")?.addEventListener("click", () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  })

  // Navigation active state based on scroll position
  const sections = document.querySelectorAll("section")
  const navItems = document.querySelectorAll(".nav-links a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active")
      }
    })
  })

  // Testimonial slider
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  const testimonialDots = document.querySelectorAll(".testimonial-dot")
  const prevBtn = document.querySelector(".testimonial-prev")
  const nextBtn = document.querySelector(".testimonial-next")

  if (testimonialCards.length > 0) {
    let currentTestimonial = 0

    const showTestimonial = (index) => {
      testimonialCards.forEach((card) => {
        card.classList.remove("active")
      })

      testimonialDots.forEach((dot) => {
        dot.classList.remove("active")
      })

      testimonialCards[index].classList.add("active")
      testimonialDots[index].classList.add("active")
    }

    nextBtn?.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length
      showTestimonial(currentTestimonial)
    })

    prevBtn?.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length
      showTestimonial(currentTestimonial)
    })

    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentTestimonial = index
        showTestimonial(currentTestimonial)
      })
    })

    // Auto slide testimonials
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length
      showTestimonial(currentTestimonial)
    }, 5000)
  }

  // Contact form validation
  const contactForm = document.getElementById("contactForm")

  contactForm?.addEventListener("submit", (e) => {
    // Form submission is now handled by EmailJS in the inline script
    // This prevents double submission handling
  })

  // Scroll reveal animation
  const revealElements = document.querySelectorAll(
    ".section-header, .skill-item, .timeline-item, .project-card, .education-card, .certification-card, .blog-card, .contact-card",
  )

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  revealElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    revealObserver.observe(el)
  })

  // Enhanced timeline animation for experience section
  const timelineItems = document.querySelectorAll(".timeline-item")
  const timelineDates = document.querySelectorAll(".timeline-date span")

  // Fix the years in the timeline dates
  if (timelineDates.length > 0) {
    // Make sure all dates are visible and properly formatted
    timelineDates.forEach((date) => {
      date.style.opacity = "1"
      date.style.visibility = "visible"
    })
  }

  // Add staggered animation to timeline items
  timelineItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateX(30px)"
    item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            item.style.opacity = "1"
            item.style.transform = "translateX(0)"
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    observer.observe(item)
  })

  // Add particle animation to the background
  const background = document.querySelector(".background")

  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random position
    const posX = Math.random() * window.innerWidth
    const posY = Math.random() * window.innerHeight

    // Random size
    const size = Math.random() * 5 + 1

    // Apply styles
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.left = `${posX}px`
    particle.style.top = `${posY}px`
    particle.style.animationDuration = `${Math.random() * 10 + 5}s`
    particle.style.animationDelay = `${Math.random() * 5}s`

    background.appendChild(particle)
  }

  // Add smooth scroll effect to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })

        // Update active nav link
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active")
        })
        this.classList.add("active")
      }
    })
  })

  // Add hover effect for project cards
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-15px) scale(1.03)"
      card.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
      card.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)"
    })
  })

  // Initialize skill bars with percentage display
  const skillItems = document.querySelectorAll(".skill-item")

  skillItems.forEach((item) => {
    const skillName = item.querySelector("h4")
    const skillLevel = item.querySelector(".skill-level")
    const skillWidth = skillLevel.style.width || "0%"

    // Add percentage to skill name
    const percentSpan = document.createElement("span")
    percentSpan.textContent = skillWidth
    skillName.appendChild(percentSpan)

    // Set initial width to 0 for animation
    skillLevel.style.width = "0"
  })

  // Animate skill bars when they come into view
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillLevel = entry.target.querySelector(".skill-level")
          const skillWidth = entry.target.querySelector("h4 span").textContent

          // Animate the skill bar
          setTimeout(() => {
            skillLevel.style.width = skillWidth
          }, 200)

          skillObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  skillItems.forEach((item) => {
    skillObserver.observe(item)
  })
})

// Add a typing animation for the job title in the hero section
document.addEventListener("DOMContentLoaded", () => {
  const titleElement = document.querySelector(".title")
  if (titleElement) {
    const text = titleElement.textContent
    titleElement.textContent = ""

    let i = 0
    const typeTitle = () => {
      if (i < text.length) {
        titleElement.textContent += text.charAt(i)
        i++
        setTimeout(typeTitle, 100)
      }
    }

    setTimeout(typeTitle, 1000)
  }
})






// document.addEventListener("DOMContentLoaded", () => {
//   const dynamicText = document.getElementById("dynamicText");
//   const phrases = ["Problem Solver", "Tech Enthusiast", "Team Player"];
//   let phraseIndex = 0;
//   let charIndex = 0;
//   let typing = true;

//   function type() {
//     if (!dynamicText) {
//       console.error("Element with ID 'dynamicText' not found.");
//       return;
//     }

//     if (typing) {
//       if (charIndex < phrases[phraseIndex].length) {
//         dynamicText.textContent += phrases[phraseIndex].charAt(charIndex);
//         charIndex++;
//         setTimeout(type, 100);
//       } else {
//         typing = false;
//         setTimeout(type, 1200);
//       }
//     } else {
//       if (charIndex > 0) {
//         dynamicText.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
//         charIndex--;
//         setTimeout(type, 50);
//       } else {
//         typing = true;
//         phraseIndex = (phraseIndex + 1) % phrases.length;
//         setTimeout(type, 500);
//       }
//     }
//   }

//   type();
// });
const words = ["Problem Solver", "Innovator", "Tech Enthusiast", "Creative Coder"];
    const dynamicText = document.getElementById("dynamicText");
    let wordIndex = 0;

    function updateText() {
      dynamicText.style.animation = "none"; // reset
      void dynamicText.offsetWidth; // force reflow
      dynamicText.textContent = words[wordIndex];
      dynamicText.style.animation = "slideInOut 2.5s ease-in-out forwards";
      wordIndex = (wordIndex + 1) % words.length;
    }

    updateText();
    setInterval(updateText, 3000);