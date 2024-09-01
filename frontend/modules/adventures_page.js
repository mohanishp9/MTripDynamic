
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it


   // Create a new URLSearchParams object from the search string
   const params = new URLSearchParams(search);
  
   // Get the value of the 'city' parameter
   const city = params.get('city');
   
   // Return the city value 
   return city;

}
//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try {
    // Construct the API URL using the city name
    const backendEndpoint = "http://localhost:8081/adventures";
    const url = `${backendEndpoint}?city=${city}`;
    
    // Fetch data from the API
    const response = await fetch(url);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the adventures data
    return data;
  } catch (error) {
    console.error("Error fetching adventures:", error);
    return null;
  }
}


//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM


  const container = document.getElementById('data');
  container.innerHTML = ''; // Clear existing content

  adventures.forEach(adventure => {
    const responDiv = document.createElement("div");
    responDiv.className = "col-sm-6 col-lg-3 my-4"; // Bootstrap column classes for responsiveness

    responDiv.innerHTML = `
  <a href="detail/?adventure=${adventure.id}">
    <div class="activity-card">
      <img src="${adventure.image}" alt="${adventure.name}" />
      <div class="category-banner">${adventure.category}</div>
      <div class="card-details d-flex justify-content-between w-100 px-3">
        <div class="text-start">
          <p>${adventure.name}</p>
          <p>Duration:</p>
        </div>
        <div class="text-end">
          <p>&#8377 ${adventure.costPerHead}</p>
          <p>${adventure.duration}hours</p>
        </div>
      </div>
    </div>
  </a>
`;

    container.appendChild(responDiv);
  });


//   // Get the container where the cards will be inserted
//   const dataConatainer = document.getElementById('data');
//   container.innerHTML = '';

//   // Create the card container responcive
//   adventures.forEach(adventure => {
//   const responDiv = document.createElement('div');
//   responDiv.classList.add('col-6 col-lg-3 mb-3');

//   // Create the card container
//   const cardDiv = document.createElement('div');
//   cardDiv.classList.add('activity-card');

//   // Create the image element
//   const img = document.createElement('img');
//   img.src = adventure.image;
//   img.alt = adventure.name;
//   cardDiv.appendChild(img);

//   // Create the category banner
//   const banner = document.createElement('div');
//   banner.classList.add('category-banner');
//   banner.textContent = adventure.category;
//   cardDiv.appendChild(banner);
  
//   // Create the card details
//   const details = document.createElement('div');
//   details.classList.add('card-details');
//   details.innerHTML=`
//   <h3>${adventure.name}</h3>
//   <p>${adventure.costPerHead} ${adventure.currency}</p>
//   <p>Duration: ${adventure.duration} hours</p>`;
  
//   cardDive.appendChild(details);

//   responDiv.appendChild(cardDiv);

//   // Create a link to the adventure details page
//   const link = document.createElement('a');
//   link.href = `detail/?adventure=${adventure.id}`;
//   link.appendChild(responDiv);

//   // Append the card to the container
//   dataContainer.appendChild(link);

// });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
