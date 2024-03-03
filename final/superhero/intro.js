let timer
let deleteFirstPhotoDelay

async function start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    createBreedList(data.message)
  } catch (e) {
    console.log("There was a problem fetching the breed list.")
  }
}

start()

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
  <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function (breed) {
          return `<option>${breed}</option>`
        }).join('')}
      </select>
  `
}

async function loadByBreed(breed) {
  if (breed != "Choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    const data = await response.json()
    createSlideshow(data.message)
  }
}

function createSlideshow(images) {
  let currentPosition = 0
  clearInterval(timer)
  clearTimeout(deleteFirstPhotoDelay)
  
  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>
  `
  currentPosition += 2
  if (images.length == 2) currentPosition = 0
  timer = setInterval(nextSlide, 3000)
  } else {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide"></div>
  `
  }

  function nextSlide() {
    document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove()
    }, 1000)
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0
    } else {
      currentPosition++
    }
  }
}
/* Troy Donner JavaScript */

// Variables
const apiUrl = "https://www.superheroapi.com/api.php/1471066966784349/";
const heroList = document.getElementById("herolist"); // Get the reference to the HTML element with the id "herolist"

// When the page loads
window.addEventListener("load", updateHeroList);

// Retrieve hero list
function getHeroList() {
  // Fetch superhero data from the API and parse the JSON response
  return fetch(apiUrl + "search/all")
    .then((response) => response.json())
    .then((data) => data.results);
}

// Update hero list in the dropdown
function updateHeroList() {
  // Get the list of superheroes and update the dropdown
  getHeroList().then(function (data) {
    // Clear existing options in the dropdown
    heroList.innerHTML = "";
    // Iterate through each superhero and add them to the dropdown
    for (const heroId in data) {
      let option = createOption(data[heroId].name, heroId);
      heroList.appendChild(option);
    }
  });
}

// Append select list
function createOption(text, value) {
  // Create an option element with the specified text and value
  let option = document.createElement("option");
  option.textContent = text;
  option.value = value;
  return option;
}

// Event listener for dropdown change
heroList.addEventListener("change", function () {
  // Get the selected superhero ID from the dropdown
  const selectedHeroId = heroList.value;
  // If a superhero is selected, fetch and log their name
  if (selectedHeroId) {
    getHeroName(selectedHeroId).then(function (heroName) {
      console.log("Selected Hero Name:", heroName);
      // You can use the heroName as needed
    });
  }
});

// Retrieve hero name by ID
function getHeroName(heroId) {
  // Fetch the superhero's name from the API based on their ID
  return fetch(apiUrl + heroId)
    .then((response) => response.json())
    .then((data) => data.name);
}

// Variables
const apiUrl2 = "https://www.superheroapi.com/api.php/1471066966784349/";
const work = document.getElementById("work"); // Get the reference to the HTML element with the id "work"

// When the page loads
window.addEventListener("load", updatework);

// Retrieve hero list
function getwork() {
  // Fetch superhero data from the API and parse the JSON response
  return fetch(apiUrl + "search/all")
    .then((response) => response.json())
    .then((data) => data.results);
}

// Update hero list in the dropdown
function updatework() {
  // Get the list of superheroes and update the dropdown
  getHeroList().then(function (data) {
    // Clear existing options in the dropdown
    heroList.innerHTML = "";
    // Iterate through each superhero and add them to the dropdown
    for (const heroId in data) {
      let option = createOption(data[heroId].name, heroId);
      heroList.appendChild(option);
    }
  });
}

// Append select list
function createOption(text, value) {
  // Create an option element with the specified text and value
  let option = document.createElement("option");
  option.textContent = text;
  option.value = value;
  return option;
}

// Event listener for dropdown change
heroList.addEventListener("change", function () {
  // Get the selected superhero ID from the dropdown
  const selectedHeroId = heroList.value;
  // If a superhero is selected, fetch and log their name
  if (selectedHeroId) {
    getHeroName(selectedHeroId).then(function (heroName) {
      console.log("Selected Hero Name:", heroName);
      // You can use the heroName as needed
    });
  }
});

// Retrieve hero name by ID
function getHeroName(heroId) {
  // Fetch the superhero's name from the API based on their ID
  return fetch(apiUrl + heroId)
    .then((response) => response.json())
    .then((data) => data.name);
}