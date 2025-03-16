const UNSPLASH_API_KEY = "CVXmjr7EWKDOvC9lVoKibLMfH129Yzxp_v0Qd4bgGDM"; // Replace with your Unsplash API key

// Fact Generator
document.getElementById("get-fact").addEventListener("click", async () => {
  const category = document.getElementById("category").value;

  try {
    // Fetch fact from Useless Facts API
    const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
    const data = await response.json();
    const factText = data.text;

    // Extract keywords from the fact text
    const keywords = extractKeywords(factText);

    // Fetch related image from Unsplash based on keywords
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/photos/random?query=${keywords[0]}&client_id=${UNSPLASH_API_KEY}`
    );
    const unsplashData = await unsplashResponse.json();
    const imageUrl = unsplashData.urls.regular;

    // Display fact and image
    document.getElementById("fact-text").textContent = factText;
    document.getElementById("fact-image").src = imageUrl;
    document.getElementById("fact-link").href = `https://en.wikipedia.org/wiki/${keywords[0]}`;
    document.getElementById("fact-display").classList.add("visible");

    // Set up social sharing and voice narration
    setupSocialSharing(factText, imageUrl, "fact");
    setupVoiceNarration(factText, "fact");
  } catch (error) {
    console.error("Error fetching fact or image:", error);
    document.getElementById("fact-text").textContent = "Failed to fetch a fact. Please try again.";
    document.getElementById("fact-display").classList.add("visible");
  }
});

// Message Generator
document.getElementById("get-message").addEventListener("click", async () => {
  const category = document.getElementById("message-category").value;

  try {
    // Fetch message from Quotes REST API
    const response = await fetch(`https://api.quotable.io/random?tags=${category}`);
    const data = await response.json();
    const messageText = data.content;

    // Fetch related image from Unsplash based on the category
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/photos/random?query=${category}&client_id=${UNSPLASH_API_KEY}`
    );
    const unsplashData = await unsplashResponse.json();
    const imageUrl = unsplashData.urls.regular;

    // Display message and image
    document.getElementById("message-text").textContent = messageText;
    document.getElementById("message-image").src = imageUrl;
    document.getElementById("message-display").classList.add("visible");

    // Set up social sharing and voice narration
    setupSocialSharing(messageText, imageUrl, "message");
    setupVoiceNarration(messageText, "message");
  } catch (error) {
    console.error("Error fetching message or image:", error);
    document.getElementById("message-text").textContent = "Failed to fetch a message. Please try again.";
    document.getElementById("message-display").classList.add("visible");
  }
});

// Extract keywords from the fact text
function extractKeywords(text) {
  // Remove common stopwords and extract meaningful keywords
  const stopwords = ["the", "a", "an", "in", "on", "at", "for", "of", "and", "or", "is", "are", "was", "were"];
  const words = text
    .toLowerCase()
    .replace(/[^a-zA-Z\s]/g, "")
    .split(" ")
    .filter((word) => !stopwords.includes(word) && word.length > 3);
  return words;
}

// Social sharing setup
function setupSocialSharing(text, imageUrl, type) {
  const twitterButton = document.getElementById(`share-twitter-${type}`);
  const facebookButton = document.getElementById(`share-facebook-${type}`);
  const whatsappButton = document.getElementById(`share-whatsapp-${type}`);

  const shareUrl = window.location.href;
  const shareText = `Check out this ${type === "fact" ? "random fact" : "message"}: ${text}`;

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

// Voice narration setup
function setupVoiceNarration(text, type) {
  const listenButton = document.getElementById(`listen-${type}`);
  const synth = window.speechSynthesis;

  listenButton.onclick = () => {
    if (synth.speaking) {
      synth.cancel(); // Stop speaking if already speaking
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = synth.getVoices()[0]; // Use the default voice
    synth.speak(utterance);
  };
}
