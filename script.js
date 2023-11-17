"use strict";
const url =
  "https://random-word-by-api-ninjas.p.rapidapi.com/v1/randomword?type=verb";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "933dd869dfmshf1f3a072ed514c8p10f195jsnb79edd185c2b",
    "X-RapidAPI-Host": "random-word-by-api-ninjas.p.rapidapi.com",
  },
};

let guesses = 5;
let blankSpace = [];
let successFlag = false;
let successGuess = 0;
let inputWord = "";
let winFlag = false;
let lossflag = false;
let guessedLetters = [];
let wordLength = 0;
function randomWord() {
  let wordList = [
    "affix",
    "avenue",
    "awkward",
    "beekeeper",
    "boggle",
    "cobweb",
    "cycle",
    "disavow",
    "duplex",
    "equip",
    "exodus",
    "funny",
    "galaxy",
    "gossip",
    "icebox",
    "injury",
    "ivory",
    "jackpot",
    "jelly",
    "jockey",
    "joking",
    "joyful",
    "jumbo",
    "kayak",
    "khaki",
    "kiosk",
    "lengths",
    "lucky",
    "luxury",
    "lymph",
    "nightclub",
    "onyx",
    "ovary",
    "pajama",
    "pneumonia",
    "pshaw",
    "puppy",
    "scratch",
    "staff",
    "stretch",
  ];
  let listLength = wordList.length;
  let listNumber = Math.floor(Math.random() * listLength);
  inputWord = wordList[listNumber];
  return inputWord;
}

async function apiWord() {
  // grabs a random word from the provided API
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    readyGame(result.word); // praying that this works
  } catch (error) {
    console.error(error);
  }
}

function checkWord() {
  successFlag = false;
  let wordGuess = guessEl.value;
  console.log(wordGuess);
  wordGuess = wordGuess.toLowerCase();

  for (let i = 0; i < wordLength; i++) {
    if (inputWord.charAt(i) === wordGuess) {
      blankSpace[i] = wordGuess;
      successGuess++;
      successFlag = true;
    }
  }

  if (successFlag === false) {
    guesses--;
    guessedLetters.push(wordGuess);
    let feedbackEl = document.querySelector("#feedback");
    feedbackEl.innerHTML = "You have " + guesses + " guesses left!";
    let letterAreaEl = document.querySelector("#letterArea");
    letterAreaEl.innerHTML = guessedLetters;
    hangMan();
  } else {
    console.log("Correct letter detected");
    let feedbackEl = document.querySelector("#feedback");
    feedbackEl.innerHTML = "Correct";
  }
  let wordAreaEl = document.querySelector("#wordArea");
  wordAreaEl.innerHTML = blankSpace;
  if (successGuess === wordLength) {
    winFlag = true;
    console.log("win flag active");
  }

  if (guesses <= 0) {
    lossflag = true;
  }
}

function checkState() {
  //after a letter has been entered, checks if the player has won/lost the game
  if (winFlag === true) {
    let guessButtonEl = document.querySelector("#guessButton");
    guessButtonEl.disabled = "true";
    let gameEndEl = document.querySelector("#gameEnd");
    let gameEndContenteL = document.querySelector("#gameEndContent");
    let correctWordEl = document.querySelector("#correctWord");
    correctWordEl.innerHTML = "The correct word was: " + inputWord;
    gameEndContenteL.innerHTML = "You Win!";
    gameEndEl.style.display = "flex";
  }

  if (lossflag === true) {
    let guessButtonEl = document.querySelector("#guessButton");
    guessButtonEl.disabled = "true";
    let gameEndEl = document.querySelector("#gameEnd");
    let gameEndContenteL = document.querySelector("#gameEndContent");
    let correctWordEl = document.querySelector("#correctWord");
    correctWordEl.innerHTML = "The correct word was: " + inputWord;
    gameEndContenteL.innerHTML = "You Lose!";
    gameEndEl.style.display = "flex";
  }
}

function hangMan() {
  //after an incorrect guess has been made, updates the image
  //  0-  3,5,6,8,10
  let stateImageEl = document.querySelector("#stateImage");
  switch (guesses) {
    case 5:
      console.log("stage5");
      stateImageEl.src = "media/0.jpg";
      break;

    case 4:
      console.log("stage4");
      stateImageEl.src = "media/3.jpg";
      break;

    case 3:
      console.log("stage3");
      stateImageEl.src = "media/5.jpg";

      break;

    case 2:
      console.log("stage2");
      stateImageEl.src = "media/6.jpg";

      break;

    case 1:
      console.log("stage1");
      stateImageEl.src = "media/8.jpg";

      break;

    case 0:
      console.log("stage0");
      stateImageEl.src = "media/10.jpg";

      break;
  }
}

apiWord();

function readyGame(word) {
  //Readys the game for play, creates the array which contains the characters of the word, updates the divs accordingly
  inputWord = word;
  inputWord = inputWord.toLowerCase();
  wordLength = inputWord.length;
  for (let i = 0; i < wordLength; i++) {
    blankSpace[i] = "_";
  }
  let wordAreaEl = document.querySelector("#wordArea");
  wordAreaEl.innerHTML = blankSpace;
  console.log(inputWord, blankSpace);
  let mainFormEl = document.querySelector("#mainForm");
  let guessEl = document.querySelector("#letterGuess");
}
let mainFormEl = document.querySelector("#mainForm");
let guessEl = document.querySelector("#letterGuess");

mainFormEl.addEventListener("submit", function (e) {
  e.preventDefault();
  if (guessEl.value.length === 1) {
    //prevents empty strings
    checkWord();
    console.log(blankSpace);
  } else {
    let feedbackEl = document.querySelector("#feedback");
    feedbackEl.innerHTML = "Please enter a single letter";
  }
  guessEl.value = "";
  checkState();
});
