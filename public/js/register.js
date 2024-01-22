/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * 
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/13/2023 12:53:04 PM
 *******************************************************************/
document.addEventListener("DOMContentLoaded", function () {

     const failedregister = "Something went wrong! User account was not registered.";
     const useraccountcreated = "User account has been successfully created! You may have to refresh your browser. In some browsers the main page does not refresh."

     const Toast = Swal.mixin({
          toast: true, position: 'top-end', timer: 3000, timerProgressBar: true,
          didOpen: (toast) => {
               toast.addEventListener('mouseenter', Swal.stopTimer)
               toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
     })

     const registerUser = async (event) => {
          event.preventDefault();

          const useremail = document.getElementById('useremail').value.trim();
          const userpassword = document.getElementById('userpassword').value.trim();
          const passwordvalidate = document.getElementById('passwordvalidate').value.trim();
          const username = document.getElementById('username').value.trim();
          const errorSpan = document.getElementById('errorMessage');

          if (userpassword && (userpassword !== passwordvalidate)) {
               errorSpan.removeAttribute("hidden");
               errorSpan.textContent = 'Invalid password! they need to match.';
               return false;
          }

          if (username && useremail) {

               const response = await fetch('/api/users/register', {
                    method: 'POST',
                    body: JSON.stringify({ username, useremail, userpassword }),
                    headers: { 'Content-Type': 'application/json' },
               });

               debugger;
               let loginProfile = await response.json(); //This will retrieve information 

               if (response.ok) {

                    // Swal.fire({
                    //      title: 'New Account created!', text: 'Please login to start posting!', icon: 'success', showCancelButton: false,
                    //      confirmButtonColor: '#3085d6', confirmButtonText: 'Ok!', timer: 23500,
                    // }).then((result) => {
                    //      if (result.isConfirmed) {
                    //           console.log('OK');
                    //      } else if (result.isDenied) {
                    //           console.log('Not OK');
                    //      }
                    // });

                    window.location.reload;
                    window.location = window.origin + "/articles";

                    debugger;
                    const dashboardControl = document.querySelector('#dashboard');
                    dashboardControl.setAttribute("data-user", loginProfile.username);

               } else {
                    debugger;
                    Toast.fire({ icon: 'error', showConfirmButton: false, title: failedregister });
               }

          }
     };

     // Entry point start process
     function initialize() {

          document.querySelector('#registration').addEventListener('submit', registerUser);

     }

     initialize();
});