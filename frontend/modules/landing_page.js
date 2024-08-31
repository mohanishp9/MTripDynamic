import config from "../conf/index.js";

async function init() {
  debugger;
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  // Log the cities data to verify
  console.log("Cities Data:", cities);

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      debugger;
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  debugger;
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    // Make the API call to the /cities endpoint
    const cityData = await fetch("http://localhost:8081/cities");

    if (!cityData.ok) {
      // Check if the response is successful
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the JSON data from the response
    const data = await cityData.json();

    //return the cities data
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Error fetching cities:", error);
    return []; // Return an empty array in case of error
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  // Create a new div element for the city card
  const cardCity = document.createElement("div");
  cardCity.className = "col-sm-6 col-lg-3 my-4"; // Bootstrap column classes for responsiveness

  cardCity.innerHTML = `
          <a href="pages/adventures/?city=${id}">
            <div class="tile">
              <img src="${image}">
              <div class="tile-text text-center text-white">
                <h5>${city}</h5>
                <p>${description}</p>
              </div>
            </div>
          </a>`;

  // Append the new card to the "data" section in the DOM
  document.getElementById("data").appendChild(cardCity);
}

export { init, fetchCities, addCityToDOM };
