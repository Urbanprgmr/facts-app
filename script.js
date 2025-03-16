document.getElementById("get-fact").addEventListener("click", async () => {
  const category = document.getElementById("category").value;
  let apiUrl;

  // Set API URL based on category
  switch (category) {
    case "trivia":
      apiUrl = "http://numbersapi.com/random/trivia?json";
      break;
    case "math":
      apiUrl = "http://numbersapi.com/random/math?json";
      break;
    case "date":
      apiUrl = "http://numbersapi.com/random/date?json";
      break;
    case "year":
      apiUrl = "http://numbersapi.com/random/year?json";
      break;
    default:
      apiUrl = "http://numbersapi.com/random/trivia?json";
  }

  try {
    // Fetch fact from API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Display fact
    document.getElementById("fact-text").textContent = data.text;
    document.getElementById("fact-link").href = `https://en.wikipedia.org/wiki/${data.number}`;
    document.getElementById("fact-display").classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching fact:", error);
    document.getElementById("fact-text").textContent = "Failed to fetch a fact. Please try again.";
    document.getElementById("fact-display").classList.remove("hidden");
  }
});
