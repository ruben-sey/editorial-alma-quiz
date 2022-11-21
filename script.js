// Let's set our global variables
const resultArea = document.querySelector("#result-area");
const resultWrapper = document.querySelector("#result-wrapper");
const loadingWrapper = document.querySelector("#loading-wrapper");
const submitButton = document.querySelector("#submit");
const questionTwo = document.querySelector("#two-wrapper");
const questionThree = document.querySelector("#three-wrapper");
const questionFour = document.querySelector("#four-wrapper");
const questionFive = document.querySelector("#five-wrapper");
const questionSix = document.querySelector("#six-wrapper");
const questionSeven = document.querySelector("#seven-wrapper");
const questionEight = document.querySelector("#eight-wrapper");
const resultTarget = document.querySelector("#result");
const questionOneItems = document.querySelectorAll("#group-one > li");
const questionTwoItems = document.querySelectorAll("#group-two > li");
const questionThreeItems = document.querySelectorAll("#group-three > li");
const questionFourItems = document.querySelectorAll("#group-four > li");
const questionFiveItems = document.querySelectorAll("#group-five > li");
const questionSixItems = document.querySelectorAll("#group-six > li");
const questionSevenItems = document.querySelectorAll("#group-seven > li");
const questionEightItems = document.querySelectorAll("#group-eight > li");
const resultName = document.querySelector("#result-name");
const resultImage = document.querySelector("#result-image");
const resultDescription = document.querySelector("#result-description");
const overviewGrid = document.querySelector("#overview-grid");
const overviewCell = document.querySelector("#overview-cell");
const hiddenDiv = document.querySelector("#hidden");
let myResult;

// On page load, let's do some work
window.onload = (event) => {
  // Get all the list items in question one
  // bind the toQuestionTwo() function to it
  questionOneItems.forEach((item) => {
    item.addEventListener("click", toQuestionTwo);
  });
  // Get all the list items in question two
  // bind the toQuestionThree() function to it
  questionTwoItems.forEach((item) => {
    item.addEventListener("click", toQuestionThree);
  });
  // Get all the list items in question three
  // bind the toQuestionFour() function to it
  questionThreeItems.forEach((item) => {
    item.addEventListener("click", toQuestionFour);
  });
    // Get all the list items in question three
  // bind the toQuestionFour() function to it
  questionFourItems.forEach((item) => {
    item.addEventListener("click", toQuestionFive);
  });
    // Get all the list items in question three
  // bind the toQuestionFour() function to it
  questionFiveItems.forEach((item) => {
    item.addEventListener("click", toQuestionSix);
  });
    // Get all the list items in question three
  // bind the toQuestionFour() function to it
  questionSixItems.forEach((item) => {
    item.addEventListener("click", toQuestionSeven);
  });
    // Get all the list items in question three
  // bind the toQuestionFour() function to it
  questionSevenItems.forEach((item) => {
    item.addEventListener("click", toQuestionEight);
  });
};

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
  // Get the value from question three and make it a number
  const answerThree = Number(
    document.querySelector('input[name="three"]:checked').value
  );
  // Get the value from question four and make it a number
  const answerFour = Number(
    document.querySelector('input[name="four"]:checked').value
  );
    // Get the value from question five and make it a number
    const answerFive = Number(
      document.querySelector('input[name="five"]:checked').value
    );
      // Get the value from question six and make it a number
  const answerSix = Number(
    document.querySelector('input[name="six"]:checked').value
  );
    // Get the value from question seven and make it a number
    const answerSeven = Number(
      document.querySelector('input[name="seven"]:checked').value
    );
      // Get the value from question eight and make it a number
  const answerEight = Number(
    document.querySelector('input[name="eight"]:checked').value
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
      Answer3: answerThree,
      Answer4: answerFour,
      Answer5: answerFive,
      Answer6: answerSix,
      Answer7: answerSeven,
      Answer8: answerEight,
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
