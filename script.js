const questionOneItems = document.querySelectorAll("#group-one > li");
const questionTwoItems = document.querySelectorAll("#group-two > li");
const resultName = document.querySelector("#result-name");
const resultImage = document.querySelector("#result-image");
const resultDescription = document.querySelector("#result-description");
let myResult;

// Prevent the form from submitting
// so we can make our API call
$('#quiz-form').submit(function () {
  return false;
});

function getCharacter() {
  // Fade out and remove the submit button
  fadeOut(submitButton);
  // Fade in the loading animation
  fadeIn(loadingWrapper);
  //handler function that throws any encountered error
  const handleError = (response) => {
    // If the response is not ok
    if (!response.ok) {
      // Throw an error with the response status and text
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      // Or, if no error, give us the data
      return response.json();
    }
  };

  // Get the value from question one and make it a number
  const answerOne = Number(
    document.querySelector('input[name="one"]:checked').value
  );
  // Get the value from question two and make it a number
  const answerTwo = Number(
    document.querySelector('input[name="two"]:checked').value
  );
  // Start our fetch (API call) the URL is our endpoint
  fetch("https://baldium.autocode.dev/editorial-alma-quiz@dev/", {
    // Define our method and headers
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // Set our body which is the data we're sending to Airtable
    body: JSON.stringify({
      Answer1: answerOne,
      Answer2: answerTwo,
    }),
  })
    // Skips to .catch if error is thrown
    .then(handleError)
    // If there is no error, let's work with the data
    .then((data) => {
      // Here we set a variable with data returned from our API call
      myResult = data.result_send;
      // Here we set attributes for an image
      // First we set the src for the image
      resultImage.setAttribute("src", data.result_image);
      // Then we set the alt text
      resultImage.setAttribute(
        "alt",
        `${data.result_send} - Editorial Alma Quiz`
      );
      // Put the result from Airtable in our span
      // that's holding results in Webflow
      resultName.innerText = data.result_send;
      // Put the result description from Airtable
      // in our paragraph that's holding results in Webflow
      resultDescription.innerText = data.result_description;
    })
    .catch(function writeError(err) {
      // Catches the error and logs it
      console.log(err);
    })
    .finally(() => {
      // Fade the loading animation out
      fadeOut(loadingWrapper);
      // Fade in the results
      fadeIn(resultWrapper);
      // Focus on the results wrapper --
      // we do this to make sure results are
      // easily accessible for folks using a
      // screenreader
      resultWrapper.setAttribute("tabindex", "-1");
      resultWrapper.focus();
    });
}

// Function to fade an element in
function fadeIn(e) {
  e.parentElement.style.display = "block";
  setTimeout(() => {
    e.classList.remove("fade");
  }, 300);
}

// Function to fade an element out and remove it
function fadeOut(e) {
  e.classList.add("fade");
  setTimeout(() => {
    e.remove();
  }, 300);
}
