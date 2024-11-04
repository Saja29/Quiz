  // Array of items with IDs and names

  // Reference to the container div
  const container = document.getElementById('options');

  // Function to display items and set up click events
  function displayItems() {
    Category.forEach(item => {
      // Create a div for each item
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = item;
      itemDiv.classList.add("option");

      // Add click event to save the item's ID
      itemDiv.addEventListener('click', () => saveItemId(item));

      // Append the div to the container
      container.appendChild(itemDiv);
    });
  }

  // Function to save item ID (for now, logs to console)
  function saveItemId(id) {
    Questions=[];
    localStorage.setItem("showOverlay", "true");
    window.location.href = `question.html?id=${id}`;
    
    // You can also store it in local storage, a variable, or send it to a server here
  }
 
  // Display items on page load
  displayItems();