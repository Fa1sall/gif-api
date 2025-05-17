const API_KEY = "5OrdBBo1esx6GpW2q8bahTWPRcp85Naq";
const img = document.getElementById("gif");
const searchInput = document.getElementById("input");
const button = document.getElementById("search");
const statusDiv = document.getElementById("status");
const spinner = document.querySelector(".spinner");

async function loadGif(searchTerm) {
  try {
    spinner.style.display = "block";
    img.style.visibility = "hidden";

    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=5OrdBBo1esx6GpW2q8bahTWPRcp85Naq&s=${searchTerm}`,
      { mode: "cors" }
    );

    if (!response.ok) {
      alert("Network response not ok");
      throw new Error("Network response not ok");
    }

    const data = await response.json();
    const gifUrl = data.data.images.original.url;

    img.onload = () => {
      spinner.style.display = "none";
      img.style.visibility = "visible";
      statusDiv.textContent = "";
    };

    img.onerror = () => {
      spinner.style.display = "none";
      statusDiv.textContent = "Failed to load GIF. Enter valid search term.";
      img.style.visibility = "none";
    };
    img.src = gifUrl;
  } catch (e) {
    spinner.style.display = "none";
    img.style.visibility = "hidden";
    console.log(`Error: ${e}`);
    statusDiv.textContent = e.message || "Unable to load GIF, Try Again!";
  }
}

window.onload = () => {
  loadGif("cats");
};

function addEventListeners() {
  const getInput = () => searchInput.value.trim();
  button.addEventListener("click", () => {
    if (getInput() === "") {
      statusDiv.textContent = "Please Enter a search term.";
      img.src = "";
    } else {
      loadGif(getInput());
    }
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      if (getInput() === "") {
        statusDiv.textContent = "Please Enter a search term.";
        img.src = "";
      } else {
        loadGif(getInput());
      }
    }
  });
}

addEventListeners();
