import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  
  try {
    // Construct API URL using the backendEndpoint and /reservations API endpoint
    const url = 'http://localhost:8081/reservations/';

    // Fetch the reservations data
    const response = await fetch(url);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch reservations: ${response.statusText}`);
    }

    // Parse the response as JSON
    const reservations = await response.json();

    // Return the fetched reservations
    return reservations;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return null; // Handle any error by returning null or an empty array
  }
  


  // Place holder for functionality to work in the Stubs
 
}



//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {

  // Conditional rendering of no-reservation-banner and reservation-table-parent
  const noReservationBanner = document.getElementById("no-reservation-banner");
  const reservationTableParent = document.getElementById("reservation-table-parent");
  const reservationTable = document.getElementById("reservation-table");

  // Clear any existing rows in the table
  reservationTable.innerHTML = "";

  if (!reservations || reservations.length === 0) {
    // Show the banner if there are no reservations
    noReservationBanner.style.display = "block";
    reservationTableParent.style.display = "none";
    return;
  }

  // Hide the banner and show the table if there are reservations
  noReservationBanner.style.display = "none";
  reservationTableParent.style.display = "block";

  // Loop through each reservation and add rows to the table
  reservations.forEach((reservation) => {
    // Create a new row
    const row = document.createElement("tr");

    // Format date and booking time
    const date = new Date(reservation.date).toLocaleDateString("en-IN");
    const bookingTime = new Date(reservation.time).toLocaleString("en-IN", {
      dateStyle: "long",
      timeStyle: "medium"
    });

    // Construct the action link to the adventure page
    const adventureLink = `../detail/?adventure=${reservation.adventure}`;

    // Add the columns to the row
    row.innerHTML = `
      <td>${reservation.id}</td>
      <td>${reservation.name}</td>
      <td>${reservation.adventureName}</td>
      <td>${reservation.person}</td>
      <td>${date}</td>
      <td>${reservation.price}</td>
      <td>${bookingTime}</td>
      <td>
      <ahref="${adventureLink}" class="reservation-visit-button">Visit Adventure</a>
      </td>
    `;

    // Append the row to the table
    reservationTable.appendChild(row);
  });

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
