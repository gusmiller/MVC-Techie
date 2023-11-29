/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * 
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
document.addEventListener("DOMContentLoaded", function () {

     const failedlogin = 'Failed to log in';
     
     const Toast = Swal.mixin({
          toast: true, position: 'top-end', timer: 3000, timerProgressBar: true,
          didOpen: (toast) => {
               toast.addEventListener('mouseenter', Swal.stopTimer)
               toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
     })

     const initApplication = () => {

          document.getElementById('login-form').addEventListener('submit', async () => {
               event.preventDefault();

               const email = document.getElementById('email').value.trim();
               const password = document.getElementById('password').value.trim();

               if (email && password) {
                    const response = await fetch('/api/users/login', {
                         method: 'POST',
                         body: JSON.stringify({ email, password }),
                         headers: { 'Content-Type': 'application/json' },
                    });

                    if (response.ok) {
                         window.history.pushState("","","/articles");
                         window.location.reload;          
                         window.location =  window.origin + "/articles";
                    } else {
                         Toast.fire({ icon: 'error', showConfirmButton: false, title: failedlogin });                         
                    }
               }
          });
     }

     initApplication();

});