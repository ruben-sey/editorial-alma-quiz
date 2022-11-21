const questionOneItems = document.querySelectorAll("#group-one > li");
const questionTwoItems = document.querySelectorAll("#group-two > li");
const resultName = document.querySelector("#result-name");
const resultImage = document.querySelector("#result-image");
const resultDescription = document.querySelector("#result-description");
let myResult;

// Prevent the form from submitting
// so we can make our API call
$("#quiz-form").submit(function () {
  getCharacter();
  return false;
});

function getCharacter() {
  // Fade out and remove the submit button
  fadeOut(document.querySelector("#submitButton"));
  // Fade in the loading animation
  fadeIn(document.querySelector(".loading-wrapper"));
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
      answerOne: answerOne,
      answerTwo: answerTwo,
    }),
  })
    // Skips to .catch if error is thrown
    .then(handleError)
    // If there is no error, let's work with the data
    .then((data) => {
      console.log(data);
      document.querySelector("#resultName").innerText = data.fields.resultName;
      document.querySelector("#resultDescription").innerText =
        data.fields.resultDescription;
      document.querySelector("#resultImage").src = data.fields.resultImage;
    })
    .catch(function writeError(err) {
      // Catches the error and logs it
      console.log(err);
    })
    .finally(() => {
      fadeOut(document.querySelector(".loading-wrapper"));
      fadeIn(document.querySelector(".results-wrapper"));
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
