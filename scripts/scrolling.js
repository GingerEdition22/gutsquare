function scrollToEndOfSection() {
    const targetElement = document.getElementById('landing');
    const bottomOfTarget = targetElement.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({
      top: bottomOfTarget, // Scroll to the bottom of the target
      behavior: 'smooth'   // Smooth scrolling
    });
  }
  function hamburgerMenu(){
    const navlinks = document.querySelector(".navlinks");
    const logo = document.querySelector(".logo");
    logo.style.transform = "scale(0)";
    navlinks.style.transform = "scale(1)";
    navlinks.style.height = "100vh"; 
    navlinks.style.backgroundColor = "var(--gray)";
  }