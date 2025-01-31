document.addEventListener("DOMContentLoaded", async function () {
  // Function to load content dynamically using async/await
  async function loadContent(url, placeholderId) {
    console.log(`Attempting to load ${url} into ${placeholderId}...`);
    
    try {
      let response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
      
      let data = await response.text();
      const placeholder = document.getElementById(placeholderId);
      
      if (placeholder) {
        placeholder.innerHTML = data;
        console.log(`Content loaded into #${placeholderId}`);
      } else {
        console.error(`Placeholder with ID "${placeholderId}" not found.`);
      }
    } catch (error) {
      console.error(`Error loading ${url}:`, error);
    }
  }

  // Load header and footer in parallel for better performance
  await Promise.all([
    loadContent("../../partials/header.html", "header-placeholder"),
    loadContent("../../partials/footer.html", "footer-placeholder")
  ]);

  console.log("Header and footer successfully injected before other scripts execute.");

  // Check the current page (index.html or <project>.html) by body class
  if (document.body.classList.contains("card")) {
    // In ozymandias.html, make sure the header is visible by default
    console.log("Card page detected, header should be visible.");
    const header = document.querySelector("header");
    if (header) {
      header.classList.remove("index-hidden"); // Ensure the header is visible
    }
  } else {
    // In index.html, ensure the header is hidden initially
    console.log("Index page detected, header starts hidden.");
    const header = document.querySelector("header");
    if (header) {
      header.classList.add("index-hidden"); // Initially hide the header
    }

    // Add the event listener for the CTA button in index.html
    if (document.querySelector(".cta-button")) {
      console.log("CTA button found, adding event listener.");

      document.querySelector(".cta-button").addEventListener("click", () => {
        console.log("CTA button clicked");

        const button = document.querySelector(".cta-button");
        button.classList.add("fade-out");

        const hero = document.querySelector(".hero");
        hero.classList.add("hidden");

        setTimeout(() => {
          const cards = document.querySelectorAll(".project-card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.display = "block";
              card.style.animation = "none";
              void card.offsetHeight; // Forces reflow
              card.style.animation = "";
            }, index * 250); // 250ms delay between each card
          });

          document.querySelector(".projects-grid").style.display = "grid";
          document.querySelector("header").classList.add("visible");
          document.body.classList.add("can-scroll");
        }, 800);
      });
    }
  }

  // Debug: Verify content was injected successfully
  setTimeout(() => {
    const headerContent = document.getElementById("header-placeholder").innerHTML;
    const footerContent = document.getElementById("footer-placeholder").innerHTML;
    console.log("Header content loaded:", headerContent);
    console.log("Footer content loaded:", footerContent);
  }, 1000); // Delay to ensure fetch completes

});