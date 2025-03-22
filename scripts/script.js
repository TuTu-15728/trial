
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
  
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("include-html");
      
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;  // Successfully loaded
                    } else if (this.status == 404) {
                        /* If 404, try loading from the 'pages/' directory */
                        xhttp.open("GET", "pages/" + file, true);  // Correct relative path
                        xhttp.send();
                    } else {
                        elmnt.innerHTML = "Error loading page.";  // Handle other errors
                    }
                    /* Remove the attribute and run the function again */
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            };
            xhttp.open("GET", file, true);  // First try direct path
            xhttp.send();
            return;
        }
    }
}
