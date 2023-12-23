document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var name = document.getElementById('name').value;
    var username = document.getElementById('signup-username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('signup-password').value;
    var age = document.getElementById('age').value;
    var gender = document.getElementById('gender').value;
    var address = document.getElementById('address').value;
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/signup', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        alert(response.message); // Display the server's response message
        window.location.href = '/indexHTML'; // Redirect to index.html
      }
    };
    
    var data = 'name=' + encodeURIComponent(name) +
               '&username=' + encodeURIComponent(username) +
               '&email=' + encodeURIComponent(email) +
               '&password=' + encodeURIComponent(password) +
               '&age=' + encodeURIComponent(age) +
               '&gender=' + encodeURIComponent(gender) +
               '&address=' + encodeURIComponent(address);
    xhr.send(data);
});
  


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.message=='true') {
          alert("Login Successful, Welcome To Aarogya"); // Display the server's response
          window.location.href = '/profile'; // Redirect to index.html
          // Redirect to profile.html
        } else {
          console.log(response)
          alert("Incorrect Username or Password"); // Display the server's response
        }
      }
    };

    
    var data = 'username=' + encodeURIComponent(username) +
               '&password=' + encodeURIComponent(password);
    xhr.send(data);
});


// const signupForm = document.getElementById('signupForm');
// const loginForm = document.getElementById('loginForm');


// // Event listener for signup form submission
// signupForm.addEventListener('submit', function(event) {
//     event.preventDefault();
  
//     // // Get the form field values
//     const firstName = document.getElementById('name').value;
//     const username = document.getElementById('username').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const age = document.getElementById('age').value;
//     const gender = document.getElementById('gender').value;
//     const address = document.getElementById('address').value;
//     console.log("Clicked Submit Button");

// });
  
  
// loginForm.addEventListener('submit', function(event) {
//       event.preventDefault();
//       const username = document.getElementById('username').value;
//       const password = document.getElementById('password').value;
//       console.log("Clicked Submit Button");

// });




// const signupForm = document.getElementById('signupForm');
// const loginForm = document.getElementById('loginForm');

// // Event listener for signup form submission
// signupForm.addEventListener('submit', function(event) {
//     event.preventDefault();
  
//     // Get the form field values
//     const formData = new FormData(signupForm);

//     // Send the form data to the server using fetch
//     fetch(signupForm.action, {
//         method: signupForm.method,
//         headers: {
//             'X-CSRFToken': getCookie('csrftoken') // Include the CSRF token
//         },
//         body: formData
//     })
//     .then(response => response.text())
//     .then(data => {
//         console.log(data); // Print the response from the server
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });
  
// // Event listener for login form submission
// loginForm.addEventListener('submit', function(event) {
//     event.preventDefault();
  
//     // Get the form field values
//     const formData = new FormData(loginForm);

//     // Send the form data to the server using fetch
//     fetch(loginForm.action, {
//         method: loginForm.method,
//         headers: {
//             'X-CSRFToken': getCookie('csrftoken') // Include the CSRF token
//         },
//         body: formData
//     })
//     .then(response => response.text())
//     .then(data => {
//         console.log(data); // Print the response from the server
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });

// // Function to retrieve the CSRF token from cookies
// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// }




