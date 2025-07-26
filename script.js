document.addEventListener("DOMContentLoaded", () => {
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Counter animation
    const counters = document.querySelectorAll(".counter")
    const speed = 200
  
    function animateCounters() {
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target") || +counter.innerText
        const count = +counter.innerText.replace(/,/g, "")
        const increment = target / speed
  
        if (count < target) {
          counter.innerText = Math.ceil(count + increment)
          setTimeout(animateCounters, 1)
        } else {
          counter.innerText = target
        }
      })
    }
  
    // Initialize counters
    counters.forEach((counter) => {
      counter.innerText = "0"
    })
  
    // Start counter animation when in viewport
    const statsSection = document.querySelector(".stats")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )
  
    if (statsSection) {
      observer.observe(statsSection)
    }
  
    // Date form submission
    const dateForm = document.getElementById("date-form")
    const resultsSection = document.getElementById("results")
    const initialState = document.getElementById("initial-state")
    const dateSuggestions = document.getElementById("date-suggestions")
  
    // Sample data for activities
    const activities = {
      restaurant: [
        {
          name: "Bella Italia",
          description: "Authentic Italian cuisine with a romantic atmosphere",
          pricePerPerson: 35,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.7,
        },
        {
          name: "Sushi Express",
          description: "Fresh Japanese sushi and sashimi in a modern setting",
          pricePerPerson: 40,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.5,
        },
        {
          name: "The Steakhouse",
          description: "Premium cuts and fine wines for a luxurious dining experience",
          pricePerPerson: 55,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.8,
        },
        {
          name: "Vegan Delight",
          description: "Creative plant-based cuisine that will impress even non-vegans",
          pricePerPerson: 30,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.6,
        },
        {
          name: "Coastal Seafood",
          description: "Fresh seafood with beautiful waterfront views",
          pricePerPerson: 45,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.7,
        },
      ],
      sports: [
        {
          name: "Basketball Game",
          description: "Local team championship match with electric atmosphere",
          pricePerPerson: 45,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.5,
        },
        {
          name: "Football Match",
          description: "Premier league excitement with the best teams competing",
          pricePerPerson: 60,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.7,
        },
        {
          name: "Tennis Tournament",
          description: "Watch professional players compete in an intimate setting",
          pricePerPerson: 50,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.4,
        },
        {
          name: "Baseball Game",
          description: "America's favorite pastime with great food and entertainment",
          pricePerPerson: 40,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.3,
        },
      ],
      circus: [
        {
          name: "Cirque Magnifique",
          description: "Spectacular acrobatics and performances that will leave you breathless",
          pricePerPerson: 70,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.9,
        },
        {
          name: "Magic Circus",
          description: "Family-friendly circus show with clowns, animals, and amazing tricks",
          pricePerPerson: 40,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.6,
        },
        {
          name: "Aerial Spectacular",
          description: "Breathtaking aerial performances and daring stunts",
          pricePerPerson: 55,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.8,
        },
      ],
      zoo: [
        {
          name: "City Zoo",
          description: "Hundreds of exotic animals in naturalistic habitats",
          pricePerPerson: 25,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.5,
        },
        {
          name: "Wildlife Safari",
          description: "Drive-through animal experience with close encounters",
          pricePerPerson: 35,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.7,
        },
        {
          name: "Aquarium Adventure",
          description: "Underwater world with thousands of marine species",
          pricePerPerson: 30,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.6,
        },
      ],
      park: [
        {
          name: "Central Park",
          description: "Beautiful scenery and walking paths perfect for a relaxing date",
          pricePerPerson: 0,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.8,
        },
        {
          name: "Botanical Gardens",
          description: "Exotic plants and flowers in a serene environment",
          pricePerPerson: 15,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.7,
        },
        {
          name: "Adventure Park",
          description: "Outdoor activities and zip lines for the adventurous couple",
          pricePerPerson: 30,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.6,
        },
        {
          name: "Lakeside Park",
          description: "Scenic views with boat rentals and picnic areas",
          pricePerPerson: 10,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.5,
        },
      ],
      movie: [
        {
          name: "Cinema Deluxe",
          description: "Latest blockbusters in comfort with reclining seats",
          pricePerPerson: 20,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.5,
        },
        {
          name: "IMAX Experience",
          description: "Immersive big-screen viewing with state-of-the-art sound",
          pricePerPerson: 25,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.7,
        },
        {
          name: "Indie Film Theater",
          description: "Unique independent films in a cozy atmosphere",
          pricePerPerson: 18,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.6,
        },
        {
          name: "Drive-In Cinema",
          description: "Nostalgic movie experience under the stars",
          pricePerPerson: 15,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.4,
        },
      ],
      museum: [
        {
          name: "Art Gallery",
          description: "Contemporary and classic art exhibitions",
          pricePerPerson: 22,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.6,
        },
        {
          name: "Science Museum",
          description: "Interactive exhibits for all ages with fascinating discoveries",
          pricePerPerson: 20,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.7,
        },
        {
          name: "History Museum",
          description: "Fascinating artifacts and exhibits from around the world",
          pricePerPerson: 18,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.5,
        },
        {
          name: "Modern Art Museum",
          description: "Cutting-edge contemporary art installations",
          pricePerPerson: 24,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.8,
        },
      ],
      concert: [
        {
          name: "Jazz Night",
          description: "Intimate jazz performance with dinner options",
          pricePerPerson: 40,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.7,
        },
        {
          name: "Symphony Orchestra",
          description: "Classical music in a beautiful concert hall",
          pricePerPerson: 50,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.8,
        },
        {
          name: "Rock Concert",
          description: "Energetic live music from popular bands",
          pricePerPerson: 45,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.6,
        },
        {
          name: "Acoustic Session",
          description: "Soulful acoustic performances in a cozy venue",
          pricePerPerson: 35,
          image: "https://via.placeholder.com/80",
          bookingLink: "#",
          rating: 4.5,
        },
      ],
    }
  
    // Activity icons mapping
    const activityIcons = {
      restaurant: "bi-cup-hot-fill",
      sports: "bi-trophy-fill",
      circus: "bi-stars",
      zoo: "bi-emoji-smile-fill",
      park: "bi-tree-fill",
      movie: "bi-film",
      museum: "bi-building",
      concert: "bi-music-note-beamed",
    }
  
    if (dateForm) {
      dateForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const budget = Number.parseFloat(document.getElementById("budget").value)
        const people = Number.parseInt(document.getElementById("people").value)
        const dateType = document.querySelector('input[name="dateType"]:checked').value
  
        // Get selected activities
        const selectedActivities = []
        document.querySelectorAll(".form-check-input:checked").forEach((checkbox) => {
          if (checkbox.name !== "dateType") {
            selectedActivities.push(checkbox.value)
          }
        })
  
        if (selectedActivities.length === 0) {
          alert("Please select at least one activity")
          return
        }
  
        // Generate date suggestions
        const suggestions = generateDateSuggestions(budget, people, selectedActivities, dateType)
  
        // Display results
        displayResults(suggestions)
      })
    }
  
    function generateDateSuggestions(budget, people, selectedActivities, dateType) {
      const suggestions = []
      const totalBudget = budget
      const budgetPerPerson = budget / people
  
      // Generate 3 different date plans
      for (let i = 0; i < 3; i++) {
        const datePlan = {
          title: `Date Plan ${i + 1}`,
          totalCost: 0,
          activities: [],
          dateType: dateType,
        }
  
        // Shuffle selected activities to get variety
        const shuffledActivities = [...selectedActivities].sort(() => 0.5 - Math.random())
  
        // Try to include at least 2-3 activities in each plan
        let remainingBudget = totalBudget
        let activitiesAdded = 0
  
        // Always try to include a restaurant if selected (people need to eat!)
        if (selectedActivities.includes("restaurant") && remainingBudget > 0) {
          const affordableRestaurants = activities.restaurant.filter((a) => a.pricePerPerson * people <= remainingBudget)
  
          if (affordableRestaurants.length > 0) {
            // Pick a random affordable restaurant
            const restaurant = affordableRestaurants[Math.floor(Math.random() * affordableRestaurants.length)]
            const cost = restaurant.pricePerPerson * people
  
            datePlan.activities.push({
              type: "restaurant",
              name: restaurant.name,
              description: restaurant.description,
              cost: cost,
              image: restaurant.image,
              bookingLink: restaurant.bookingLink,
              rating: restaurant.rating,
            })
  
            remainingBudget -= cost
            datePlan.totalCost += cost
            activitiesAdded++
          }
        }
  
        // Add other activities
        for (const activityType of shuffledActivities) {
          if (activitiesAdded >= 3 || remainingBudget <= 0) break
  
          // Skip restaurant if already added
          if (activityType === "restaurant" && datePlan.activities.some((a) => a.type === "restaurant")) continue
  
          const activityOptions = activities[activityType]
          const affordableOptions = activityOptions.filter((a) => a.pricePerPerson * people <= remainingBudget)
  
          if (affordableOptions.length > 0) {
            // Pick a random affordable activity
            const activity = affordableOptions[Math.floor(Math.random() * affordableOptions.length)]
            const cost = activity.pricePerPerson * people
  
            datePlan.activities.push({
              type: activityType,
              name: activity.name,
              description: activity.description,
              cost: cost,
              image: activity.image,
              bookingLink: activity.bookingLink,
              rating: activity.rating,
            })
  
            remainingBudget -= cost
            datePlan.totalCost += cost
            activitiesAdded++
          }
        }
  
        // Only add plans with at least one activity
        if (datePlan.activities.length > 0) {
          suggestions.push(datePlan)
        }
      }
  
      return suggestions
    }
  
    function displayResults(suggestions) {
      // Clear previous results
      dateSuggestions.innerHTML = ""
  
      if (suggestions.length === 0) {
        dateSuggestions.innerHTML = `
                  <div class="alert alert-warning">
                      <h4>No suitable plans found</h4>
                      <p>Try increasing your budget or selecting different activities.</p>
                  </div>
              `
      } else {
        // Display each suggestion
        suggestions.forEach((plan, index) => {
          const planElement = document.createElement("div")
          planElement.className = "date-suggestion animate__animated animate__fadeInUp"
          planElement.style.animationDelay = `${index * 0.2}s`
  
          let activitiesHTML = ""
          plan.activities.forEach((activity) => {
            // Generate star rating HTML
            let ratingHTML = ""
            const fullStars = Math.floor(activity.rating)
            const hasHalfStar = activity.rating % 1 >= 0.5
  
            for (let i = 0; i < 5; i++) {
              if (i < fullStars) {
                ratingHTML += '<i class="bi bi-star-fill"></i>'
              } else if (i === fullStars && hasHalfStar) {
                ratingHTML += '<i class="bi bi-star-half"></i>'
              } else {
                ratingHTML += '<i class="bi bi-star"></i>'
              }
            }
  
            activitiesHTML += `
                          <div class="activity-item">
                              <div class="activity-icon">
                                  <i class="${activityIcons[activity.type]}"></i>
                              </div>
                              <div class="activity-details">
                                  <h5>${activity.name}</h5>
                                  <p>${activity.description}</p>
                                  <div class="activity-meta">
                                      <span class="activity-price"><i class="bi bi-cash"></i> $${activity.cost.toFixed(2)}</span>
                                      <span class="activity-rating">${ratingHTML} ${activity.rating}</span>
                                  </div>
                                  <a href="${activity.bookingLink}" class="booking-link" target="_blank">
                                      <i class="bi bi-calendar-check"></i> Book Now
                                  </a>
                              </div>
                          </div>
                      `
          })
  
          // Create a badge based on date type
          let dateBadge = ""
          switch (plan.dateType) {
            case "romantic":
              dateBadge = '<span class="badge bg-danger"><i class="bi bi-heart-fill"></i> Romantic</span>'
              break
            case "casual":
              dateBadge = '<span class="badge bg-info"><i class="bi bi-cup"></i> Casual</span>'
              break
            case "adventure":
              dateBadge = '<span class="badge bg-success"><i class="bi bi-compass"></i> Adventure</span>'
              break
            case "family":
              dateBadge = '<span class="badge bg-warning"><i class="bi bi-people-fill"></i> Family</span>'
              break
          }
  
          planElement.innerHTML = `
                      <div class="date-suggestion-header">
                          <div class="d-flex justify-content-between align-items-center">
                              <h4>${plan.title}</h4>
                              ${dateBadge}
                          </div>
                          <p class="mb-0">Total Cost: $${plan.totalCost.toFixed(2)}</p>
                      </div>
                      <div class="date-suggestion-body">
                          ${activitiesHTML}
                      </div>
                  `
  
          dateSuggestions.appendChild(planElement)
        })
      }
  
      // Show results, hide initial state
      resultsSection.classList.remove("d-none")
      initialState.classList.add("d-none")
  
      // Scroll to results
      resultsSection.scrollIntoView({ behavior: "smooth" })
    }
  
    // Smooth scrolling for navigation links
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
        }
      })
    })
  
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
  })
  
              
