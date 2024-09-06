
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

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(adventure => {
    const duration = adventure.duration;
    return duration >= low && duration <= high;
  });
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(adventure => categoryList.includes(adventure.category));
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
    let filteredList = list;
  
    if (filters.duration) {
      const [low, high] = filters.duration.split('-').map(Number);
      filteredList = filterByDuration(filteredList, low, high);
    }
  
    if (filters.category.length > 0) {
      filteredList = filterByCategory(filteredList, filters.category);
    }
  
    return filteredList;
  }
  

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object\
  const filters = localStorage.getItem('filters');
  return filters ? JSON.parse(filters) : null;

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
 // Get the category list element from the DOM
 const categoryList = document.getElementById("category-list");
  
 // Clear any existing filter pills
 categoryList.innerHTML = '';
 
 // Create and append a pill for each selected category
 filters.category.forEach(category => {
   // Create a new div element for the category pill
   const pill = document.createElement("div");
   pill.className = "category-filter";
   pill.textContent = category;

   // Create a remove button for the category pill
   const removeBtn = document.createElement("span");
   removeBtn.textContent = "x";
   removeBtn.style.cursor = "pointer";
   
   // Set up the click event handler for the remove button
   removeBtn.onclick = () => {
     // Remove the category from the filters
     filters.category = filters.category.filter(c => c !== category);
     
     // Save updated filters to local storage
     saveFiltersToLocalStorage(filters);
     
     // Regenerate filter pills and update the DOM
     generateFilterPillsAndUpdateDOM(filters);
     
     // Filter adventures based on the updated filters
     const filteredAdventures = filterFunction(adventures, filters);
     
     // Update the DOM with the filtered adventures
     addAdventureToDOM(filteredAdventures);
   };
   
   // Append the remove button to the pill
   pill.appendChild(removeBtn);
   
   // Append the pill to the category list
   categoryList.appendChild(pill);
 });

 // Update duration filter dropdown
 const durationSelect = document.getElementById("duration-select");
 durationSelect.value = filters.duration || "";
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
