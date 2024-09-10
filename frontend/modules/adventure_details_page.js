import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  try {
    const urlParam = new URLSearchParams(search);
    const adventureId = urlParam.get("adventure");
    return adventureId;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs

  // Return the adventure ID or null if it doesn't exists
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // Construct the API URL with the adventure ID

  try {
    const urlData = config.backendEndpoint;
    const url = `${urlData}/adventures/detail?adventure=${adventureId}`;
    // Make the fetch call to the API
    const response = await fetch(url);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(
        `Error fetching adventure details: ${response.statusText}`
      );
    }

    // Parse the JSON response
    const adventureDetails = await response.json();
    console.log(adventureDetails);

    // Return the adventure details
    return adventureDetails;
  } catch (error) {
    console.error(error);
    // Return null or handle the error as needed
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  if (!adventure) return; // If adventure is null or undefined, exit the function

  // Extracting details from the adventure object
  const { name, subtitle, images, content } = adventure;

  // Inserting the adventure name and subtitle into the respective HTML elements
  document.getElementById("adventure-name").textContent = name;
  document.getElementById("adventure-subtitle").textContent = subtitle;

  // Get the photo-gallery element where images will be inserted
  const photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = ""; // Clear existing images

  // Loop through the images and add each one to the gallery
  images.forEach((imageUrl) => {
    // Create a new div element for each image
    const imageDiv = document.createElement("div");
    imageDiv.className = "activity-card-image";

    // Create an img element and set its src attribute
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = name; // Set alt text for accessibility
    img.className = "img-fluid"; // Bootstrap class for responsive images

    // Append the img element to the div
    imageDiv.appendChild(img);

    // Append the div to the photo-gallery
    photoGallery.appendChild(imageDiv);
  });

  // Inserting the adventure content into the respective HTML element
  document.getElementById("adventure-content").innerHTML = content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // Get the photo-gallery element where the carousel will be inserted
  const photoGallery = document.getElementById("photo-gallery");

  // Clear existing content
  photoGallery.innerHTML = "";

  // Create carousel container
  const carouselContainer = document.createElement("div");
  carouselContainer.className = "carousel slide";
  carouselContainer.id = "adventureCarousel";

  // Create carousel-inner container
  const carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";
  carouselContainer.appendChild(carouselInner);

  // Loop through images and create carousel-item divs
  images.forEach((imageUrl, index) => {
    // Create a carousel-item div
    const carouselItem = document.createElement("div");
    carouselItem.className = "carousel-item";
    if (index === 0) {
      carouselItem.classList.add("active"); // Set the first item as active
    }

    // Create an img element and set its src attribute
    const img = document.createElement("img");
    img.src = imageUrl;
    img.className = "d-block w-100 "; // Bootstrap class for responsive images
    img.alt = "Adventure Image";

    // Append the img element to the carousel-item div
    carouselItem.appendChild(img);

    // Append the carousel-item div to the carousel-inner
    carouselInner.appendChild(carouselItem);
  });

  // Create carousel controls
  const prevControl = document.createElement("a");
  prevControl.className = "carousel-control-prev";
  prevControl.href = "#adventureCarousel";
  prevControl.role = "button";
  prevControl.setAttribute("data-bs-slide", "prev");

  const prevIcon = document.createElement("span");
  prevIcon.className = "carousel-control-prev-icon";
  prevIcon.setAttribute("aria-hidden", "true");
  prevControl.appendChild(prevIcon);

  const prevText = document.createElement("span");
  prevText.className = "visually-hidden";
  prevText.textContent = "Previous";
  prevControl.appendChild(prevText);

  const nextControl = document.createElement("a");
  nextControl.className = "carousel-control-next";
  nextControl.href = "#adventureCarousel";
  nextControl.role = "button";
  nextControl.setAttribute("data-bs-slide", "next");

  const nextIcon = document.createElement("span");
  nextIcon.className = "carousel-control-next-icon";
  nextIcon.setAttribute("aria-hidden", "true");
  nextControl.appendChild(nextIcon);

  const nextText = document.createElement("span");
  nextText.className = "visually-hidden";
  nextText.textContent = "Next";
  nextControl.appendChild(nextText);

  // Append controls to the carousel container
  carouselContainer.appendChild(prevControl);
  carouselContainer.appendChild(nextControl);

  // Append the carousel container to the photo-gallery
  photoGallery.appendChild(carouselContainer);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  try {
    const reservationPanelAvailable = document.getElementById(
      "reservation-panel-available"
    );
    const reservationPanelSoldOut = document.getElementById(
      "reservation-panel-sold-out"
    );
    const costPerHeadElement = document.getElementById(
      "reservation-person-cost"
    );

    if (adventure.available) {
      // Show the reservation panel and hide the sold-out panel
      reservationPanelAvailable.style.display = "block";
      reservationPanelSoldOut.style.display = "none";

      // Update the cost per head in the DOM
      costPerHeadElement.textContent = adventure.costPerHead;
    } else {
      // Show the sold-out panel and hide the reservation panel
      reservationPanelAvailable.style.display = "none";
      reservationPanelSoldOut.style.display = "block";
    }
  } catch (error) {
    return null;
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  try {
    const reservationCostElement = document.getElementById("reservation-cost");

    // Ensure persons is a number and default to 0 if not valid
    const numberOfPersons = parseInt(persons, 10) || 0;

    // Calculate the total cost
    const totalCost = numberOfPersons * adventure.costPerHead;

    // Update the total cost in the DOM
    reservationCostElement.textContent = totalCost;
  } catch (error) {
    return null;
  }
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  const form = document.getElementById("myForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    // Capture form data
    const name = form.name.value.trim();
    const date = form.date.value;
    const person = form.person.value;

    // Backend endpoint
    const backendEndpoint = "http://localhost:8081/reservations/new";

    // Data to send
    const requestBody = {
      name: name,
      date: date,
      person: parseInt(person, 10), // Convert person count to integer
      adventure: adventure.id,
    };

    try {
      // Make POST request
      const response = await fetch(backendEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Reservation successful
        alert("Success!");
        window.location.reload(); // Refresh the page
      } else {
        // Reservation failed
        alert("Failed!");
      }
    } catch (error) {
      // Handle any network errors or exceptions
      alert("Failed!");
      console.error("Error:", error);
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  const banner = document.getElementById("reserved-banner");

  if (adventure.reserved) {
    banner.style.display = "block"; // Show the banner if the adventure is already reserved
  } else {
    banner.style.display = "none"; // Hide the banner otherwise
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
