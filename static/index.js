"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

/**
 * Function to register the service worker.
 */
async function registerSW() {
  try {
    await navigator.serviceWorker.register("/static/uv-sw.js", {
      scope: __uv$config.prefix,
    });
    console.log("Service worker registered successfully.");
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }
}

/**
 * Function to determine whether input is a valid URL or a search query.
 * @param {string} input
 * @param {string} searchEngineURL
 * @returns {string} Formatted URL
 */
function search(input, searchEngineURL) {
  let url;

  if (!isUrl(input)) {
    // If it's not a URL, create a search URL using the search engine template
    url = searchEngineURL.replace("%s", encodeURIComponent(input));
    console.log("Search URL:", url);
  } else {
    // Otherwise, it's a URL, make sure it has http:// or https://
    if (!(input.startsWith("https://") || input.startsWith("http://"))) {
      url = "https://" + input;
    } else {
      url = input;
    }
    console.log("Entered URL:", url);
  }

  return url;
}

/**
 * Function to validate if the string is a URL.
 * @param {string} str
 * @returns {boolean}
 */
function isUrl(str = "") {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

/**
 * Handle form submission.
 */
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    return;
  }

  // Retrieve the search engine URL from the hidden input field
  const searchEngineURL = searchEngine.value;

  // Call the search function to handle URL or search query
  const url = search(address.value.trim(), searchEngineURL);

  // Encode the final URL using the __uv$config.encodeUrl method
  const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(url);
  console.log("Encoded URL:", encodedUrl);

  // Redirect to the edu.html page with the encoded URL as a query parameter
  window.parent.location.href = "/static/edu.html?url=" + encodeURIComponent(encodedUrl);
});
