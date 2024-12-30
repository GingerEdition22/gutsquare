
function onLoadFunc(){
loadTopNav();
loadMidnightMath();
//loadFooter();
}
function loadFooter(){
    fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    })
}
function loadTopNav(){
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