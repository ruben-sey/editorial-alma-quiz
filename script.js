// Prevent the form from submitting
// so we can make our API call
$("#quiz-form").submit(function () {
  getCharacter();
  return false;
});

function getCharacter() {
  fadeOut(document.querySelector("#submitButton"));
  fadeOut(document.querySelector("#questionWrapperResults"));
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

  // Get the value from questions and make it a number
  const answerOne = Number(
    document.querySelector('input[name="one"]:checked').value
  );
  const answerTwo = Number(
    document.querySelector('input[name="two"]:checked').value
  );
  const answerThree = Number(
    document.querySelector('input[name="three"]:checked').value
  );
  const answerFour = Number(
    document.querySelector('input[name="four"]:checked').value
  );
  const answerFive = Number(
    document.querySelector('input[name="five"]:checked').value
  );
  const answerSix = Number(
    document.querySelector('input[name="six"]:checked').value
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
      answerThree: answerThree,
      answerFour: answerFour,
      answerFive: answerFive,
      answerSix: answerSix,
    }),
  })
    // Skips to .catch if error is thrown
    .then(handleError)
    // If there is no error, let's work with the data
    .then((data) => {
      console.log(data);
      document.querySelector("#quizLink").href = data.fields.quizLink;
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

function fadeOut(e) {
  e.style.transition = "opacity 0.1s";
  e.style.opacity = 0;
  setTimeout(() => {
    e.style.display = "none";
  }, 700);
}

function fadeIn(e) {
  e.style.opacity = 0;
  e.style.display = "block";
  e.style.transition = "opacity 0.1s";
  setTimeout(() => {
    e.style.opacity = 1;
  }, 500);
}
