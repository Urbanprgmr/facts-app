const UNSPLASH_API_KEY = "CVXmjr7EWKDOvC9lVoKibLMfH129Yzxp_v0Qd4bgGDM"; // Replace with your Unsplash API key

document.getElementById("get-fact").addEventListener("click", async () => {
  const category = document.getElementById("category").value;

  try {
    // Fetch fact from Useless Facts API
    const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
    const data = await response.json();
    const factText = data.text;

    // Fetch related image from Unsplash based on the fact's content
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/photos/random?query=${category}&client_id=${UNSPLASH_API_KEY}`
    );
    const unsplashData = await unsplashResponse.json();
    const imageUrl = unsplashData.urls.regular;

    // Display fact and image
    document.getElementById("fact-text").textContent = factText;
    document.getElementById("fact-image").src = imageUrl;
    document.getElementById("fact-link").href = `https://en.wikipedia.org/wiki/${category}`;
    document.getElementById("fact-display").classList.add("visible");

    // Set up social sharing
    setupSocialSharing(factText, imageUrl);
  } catch (error) {
    console.error("Error fetching fact or image:", error);
    document.getElementById("fact-text").textContent = "Failed to fetch a fact. Please try again.";
    document.getElementById("fact-display").classList.add("visible");
  }
});

// Social sharing setup
function setupSocialSharing(factText, imageUrl) {
  const twitterButton = document.getElementById("share-twitter");
  const facebookButton = document.getElementById("share-facebook");
  const whatsappButton = document.getElementById("share-whatsapp");

  const shareUrl = window.location.href;
  const shareText = `Check out this random fact: ${factText}`;

  // Twitter
  twitterButton.onclick = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank");
  };

  // Facebook
  facebookButton.onclick = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, "_blank");
  };

  // WhatsApp
  whatsappButton.onclick = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(whatsappUrl, "_blank");
  };
}
