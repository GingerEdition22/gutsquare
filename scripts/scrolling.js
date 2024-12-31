function scrollToEndOfSection() {
    const targetElement = document.getElementById('landing');
    const bottomOfTarget = targetElement.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({
      top: bottomOfTarget, // Scroll to the bottom of the target
      behavior: 'smooth'   // Smooth scrolling
    });
  }

  