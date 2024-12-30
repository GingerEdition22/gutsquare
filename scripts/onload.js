const fs = require("fs");
const path = require("path");
const { text } = require("stream/consumers");

function onLoadFunc(){
const body = document.querySelector("body");
const loadPage = body.getAttribute("data-load-page");
loadTopNav();
loadFooter();
const loadTypes = loadPage.split(",");
for(let i=0;i<loadTypes.length;i++){
  switch(loadTypes[i]){
    case "math":
      loadMidnightMath();
      break;
    case "index":
      loadIndex();
      break
  }
}
}

function loadFooter(){
    fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    })
}
function loadTopNav(){
    fetch('/data/topnav.json')
        .then(response => response.json())
        .then(data => {
const navbackground = document.createElement("div");
navbackground.className = "navBackground";
const navbar = document.createElement("div");
navbar.className="topnav";
navbar.id = "navbar";
navbar.innerHTML= '<a class="linkedimage" href="index.html"><img src="images/GutsquareIconWhite.png" class="logo"></a>';
const navlinks = document.createElement("div");
navlinks.className="navlinks";
data.forEach(link=>{
  if(link.visible){
  const linkElement = document.createElement("a");
  linkElement.href = link.link;
 linkElement.dataset.page = link.dataPage;
 const classes = link.class.split(" ");
 classes.forEach(className =>{
  linkElement.classList.add(className);
 });
  linkElement.textContent=link.text;

navlinks.appendChild(linkElement);
  }
}

);
navbar.appendChild(navlinks);
navbackground.appendChild(navbar);

            document.getElementById('navContainer').appendChild(navbackground);

            // Highlight the current page
            const currentPage = document.body.dataset.page; // e.g., "home", "about", "mywork"
            const navLinks = document.querySelectorAll('#navbar a[data-page]');
            navLinks.forEach(link => {
                if (link.dataset.page === currentPage) {
                    link.classList.add('active'); // Add the active class
                }
            });
        });
}

function loadMidnightMath(){
    fetch("https://script.google.com/macros/s/AKfycbxVKN7vn53Ro51GSUedcj5OdqMQ_q0ULwKLlnSPp4RAWsukw3x272rS584onJ1otG6xJw/exec")
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      // Create the HTML table dynamically based on the fetched data
      const leaderboardContainer = document.getElementById("leaderboardDiv");
      let html = "<table><tr><th>#</th><th>Name</th><th>Score</th></tr>";

      // Loop through the leaderboard data and create table rows
      data.forEach((entry, index) => {
        html += `
          <tr>
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
          </tr>
        `;
      });

      html += "</table>";
      leaderboardContainer.innerHTML = html; // Insert the HTML into the page
    })
    .catch(error => document.getElementById("leaderboardDiv").innerHTML=('Error fetching leaderboard:', error));
}

function loadIndex(){
fetch("/data/contentBlocks.json")
.then(response => response.json())
.then(blocks=>{
  const container = document.querySelector(".blocksContainer");
  blocks.forEach(block=>{
    if(block.visible){
    const blockElement = createBlockElement(block);
  container.prepend(blockElement);
    }
  }
  )
}
).catch(error => console.error("Error loading blocks:",error));
}


function createBlockElement(block){
  const blockElement = document.createElement("a");
  blockElement.className = "projectPanel";
  if(block.link){
    blockElement.href = block.link;
    if(block.blockClass){
      blockElement.classList.add(block.blockClass);
    }
  }

   if(block.image){
    const image = document.createElement("img");
    image.src = block.image;
    if(block.imageClass){
      image.classList.add(block.imageClass);
    }
    blockElement.appendChild(image);
   }
   if(block.header || block.body){
    const textBox = document.createElement("div");
    textBox.className = "textBox";
    blockElement.appendChild(textBox);
    if(block.header){
      const header = document.createElement("h1");
      header.textContent = block.header;
      if(block.headerClass){
        header.classList.add(block.headerClass);
      }
      textBox.appendChild(header);
      
    }
    if(block.body){
      const body = document.createElement("p");
      body.textContent = block.body;
      if(block.bodyClass){
        body.classList.add(block.bodyClass);
      }
      textBox.appendChild(body);
    }
  }
    return blockElement;
}