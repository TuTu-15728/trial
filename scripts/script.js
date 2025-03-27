// Function to include HTML dynamically
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute("include-html");
      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              elmnt.innerHTML = this.responseText;
              setActiveLink();
              // handleModal();
            }
            if (this.status == 404) {
              elmnt.innerHTML = "Page not found.";
            }
            elmnt.removeAttribute("include-html");
            includeHTML(); // Recursive call for loading other elements
          }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
        return; // Exit the function once the request is made
      }
    }
  }
  
  // Function to highlight the active link based on the current URL
  function setActiveLink() {
    const navLinks = document.querySelectorAll(".nav-link");
    const currentUrl = window.location.pathname;
  
    navLinks.forEach(link => {
      const linkPath = link.getAttribute("href");
      if (linkPath === currentUrl) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
  
  // Function to handle modal open and close actions
  // function handleModal() {
  //   const modal = document.getElementById("myModal");
  //   const enquiryLink = document.getElementById("enquiryLink");
  //   const closeBtn = document.getElementsByClassName("close")[0];
  
  //   if (enquiryLink && modal && closeBtn) {
  //     enquiryLink.addEventListener('click', function(event) {
  //       event.preventDefault();
  //       modal.style.display = "block";
  //     });
  
  //     closeBtn.addEventListener('click', function() {
  //       modal.style.display = "none";
  //     });

  //     window.addEventListener('click', function(event) {
  //       if (event.target === modal) {
  //         modal.style.display = "none";
  //       }
  //     });
  //   } else {
  //     console.error("Modal or enquiry link not found");
  //   }
  // }
  
  // Ensure the JS runs after the DOM content is fully loaded
  document.addEventListener("DOMContentLoaded", function() {
    includeHTML();
  });
  