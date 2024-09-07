import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  try{
  const urlParam = new URLSearchParams(search);
  const adventureId = urlParam.get('adventure');
  return adventureId;
} catch(error){
  return null;
}
 



  // Place holder for functionality to work in the Stubs

  // Return the adventure ID or null if it doesn't exis
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

 // Construct the API URL with the adventure ID
 

 try {
  const url = `http://localhost:8081/adventures/detail?adventure=${adventureId}`;
   // Make the fetch call to the API
   const response = await fetch(url);

   // Check if the response is successful
   if (!response.ok) {
     throw new Error(`Error fetching adventure details: ${response.statusText}`);
   }

   // Parse the JSON response
   const adventureDetails = await response.json();

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
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  if (!adventure) return; // If adventure is null or undefined, exit the function

  // Extracting details from the adventure object
  const { name, subtitle, images, content } = adventure;

  // Inserting the adventure name and subtitle into the respective HTML elements
  document.getElementById('adventure-name').textContent = name;
  document.getElementById('adventure-subtitle').textContent = subtitle;

  // Get the photo-gallery element where images will be inserted
  const photoGallery = document.getElementById('photo-gallery');
  photoGallery.innerHTML = ''; // Clear existing images

  // Loop through the images and add each one to the gallery
  images.forEach(imageUrl => {
    // Create a new div element for each image
    const imageDiv = document.createElement('div');
    imageDiv.className = 'activity-card-image';
    
    // Create an img element and set its src attribute
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = name; // Set alt text for accessibility
    img.className = 'img-fluid'; // Bootstrap class for responsive images
    
    // Append the img element to the div
    imageDiv.appendChild(img);
    
    // Append the div to the photo-gallery
    photoGallery.appendChild(imageDiv);
  });

  // Inserting the adventure content into the respective HTML element
  document.getElementById('adventure-content').innerHTML = content;


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

   // Get the photo-gallery element where the carousel will be inserted
   const photoGallery = document.getElementById('photo-gallery');
  
   // Clear existing content
   photoGallery.innerHTML = '';
 
   // Create carousel container
   const carouselContainer = document.createElement('div');
   carouselContainer.className = 'carousel slide';
   carouselContainer.id = 'adventureCarousel';
 
   // Create carousel-inner container
   const carouselInner = document.createElement('div');
   carouselInner.className = 'carousel-inner';
   carouselContainer.appendChild(carouselInner);
 
   // Loop through images and create carousel-item divs
   images.forEach((imageUrl, index) => {
     // Create a carousel-item div
     const carouselItem = document.createElement('div');
     carouselItem.className = 'carousel-item';
     if (index === 0) {
       carouselItem.classList.add('active'); // Set the first item as active
     }
 
     // Create an img element and set its src attribute
     const img = document.createElement('img');
     img.src = imageUrl;
     img.className = 'd-block w-100'; // Bootstrap class for responsive images
     img.alt = 'Adventure Image';
 
     // Append the img element to the carousel-item div
     carouselItem.appendChild(img);
 
     // Append the carousel-item div to the carousel-inner
     carouselInner.appendChild(carouselItem);
   });
 
   // Create carousel controls
   const prevControl = document.createElement('a');
   prevControl.className = 'carousel-control-prev';
   prevControl.href = '#adventureCarousel';
   prevControl.role = 'button';
   prevControl.setAttribute('data-bs-slide', 'prev');
   
   const prevIcon = document.createElement('span');
   prevIcon.className = 'carousel-control-prev-icon';
   prevIcon.setAttribute('aria-hidden', 'true');
   prevControl.appendChild(prevIcon);
 
   const prevText = document.createElement('span');
   prevText.className = 'visually-hidden';
   prevText.textContent = 'Previous';
   prevControl.appendChild(prevText);
 
   const nextControl = document.createElement('a');
   nextControl.className = 'carousel-control-next';
   nextControl.href = '#adventureCarousel';
   nextControl.role = 'button';
   nextControl.setAttribute('data-bs-slide', 'next');
   
   const nextIcon = document.createElement('span');
   nextIcon.className = 'carousel-control-next-icon';
   nextIcon.setAttribute('aria-hidden', 'true');
   nextControl.appendChild(nextIcon);
 
   const nextText = document.createElement('span');
   nextText.className = 'visually-hidden';
   nextText.textContent = 'Next';
   nextControl.appendChild(nextText);
 
   // Append controls to the carousel container
   carouselContainer.appendChild(prevControl);
   carouselContainer.appendChild(nextControl);
 
   // Append the carousel container to the photo-gallery
   photoGallery.appendChild(carouselContainer);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

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
