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
     const loginFormHandler = async (event) => {
          event.preventDefault();

          const email = document.querySelector('#email-login').value.trim();
          const password = document.querySelector('#password-login').value.trim();

          if (email && password) {
               const response = await fetch('api/users/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: { 'Content-Type': 'application/json' },
               });

               if (response.ok) {
                    document.location.reload(true);
                    document.location.replace('/');
                    document.location.reload(true);
               } else {
                    alert('Failed to log in');
               }
          }
     };

     const initApplication = () => {
          document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
     }

     initApplication();

});