
function onLoadFunc(){
loadFooter();
loadTopNav();

}
function loadFooter(){
    fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    })
}
function loadTopNav(){
    fetch("topnav.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navContainer").innerHTML = data;
    const currentPage = document.body.dataset.page;
    const navLinks = document.querySelectorAll('#navbar a[data-page]');
    navLinks.forEach(link => {
        if(link.dataset.page === currentPage){
            link.classList.add("active");
            link.classList.add("page");
        }else{
            link.classList.add("page");
        }
    })
    })
}