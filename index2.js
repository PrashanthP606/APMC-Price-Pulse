document.addEventListener("DOMContentLoaded", () => {
  const marketSelector = document.getElementById("market");
  const cropButtons = document.querySelectorAll("#selectcrops button");
  const priceChartSection = document.getElementById("priceChart");
  const chartCanvas = document.getElementById("chartCanvas");

  // Base URL for the backend
  const BASE_URL = "http://127.0.0.1:5000";

  // Function to fetch forecasted data
  async function fetchForecast(cropName, location) {
    const url = `${BASE_URL}/forecast`;

    console.log("Payload:", { crop_name: cropName, location });

    const payload = {
      crop_name: cropName,
      location: location,
    };

    try {
      // Show loading message
      displayLoading();

      // Make POST request
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        return;
      }

      const data = await response.json();

      // Display the forecasted price and graph
      displayForecast(data.forecasted_price, data.graph_path);
    } catch (error) {
      if (error.message === "Failed to fetch") {
        alert("Network error. Please check your connection.");
      } else {
        console.error("Error fetching forecast:", error);
        alert("An unexpected error occurred while fetching the forecast.");
      }
    }
  }

  // Function to display forecasted data
  function displayForecast(price, graphPath) {
    const timestamp = new Date().getTime(); // Prevent caching
    priceChartSection.classList.remove("hidden");
    chartCanvas.innerHTML = `
      <p><strong>Forecasted Price:</strong> ₹${price.toFixed(2)} /kg </p>
      <img src="${graphPath}?t=${timestamp}" alt="Price Trend Graph" style="max-width: 100%; height: auto;">
    `;
  }

  // Function to display a loading message
  function displayLoading() {
    chartCanvas.innerHTML = "<p>Loading forecast data...</p>";
    priceChartSection.classList.remove("hidden");
  }

  // Function to clear chart content
  function clearChart() {
    chartCanvas.innerHTML = ""; // Clear chart content
    priceChartSection.classList.add("hidden"); // Hide the section
  }

  // Event listener for crop selection
  cropButtons.forEach((button) => {

    // Clear chart when click the button 
    button.addEventListener("click", clearChart);

    button.addEventListener("click", () => {
      const selectedCrop = button.value;
      const selectedMarket = marketSelector.value;

      if (!selectedCrop || !selectedMarket) {
        alert("Please select both a crop and a market.");
        return;
      }

      // Fetch forecasted data
      fetchForecast(selectedCrop, selectedMarket);
    });
  });
});
