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
const validateEmailAddress = async (event) => {
     
     if (event.key === 'Enter') {
          event.preventDefault(); // Prevent form submission

          const useremail = document.querySelector('#useremail').value.trim();
          const errorSpan = document.querySelector('#errorMessage');

          const response = await fetch('/api/users/validate', {
               method: 'POST',
               body: JSON.stringify({ useremail }),
               headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
               return true;
          } else {
               errorSpan.textContent = 'Invalid email address';
               return false;
          }     
     }

}

const registerUser = async (event) => {
     event.preventDefault();

     const useremail = document.querySelector('#useremail').value.trim();
     const userpassword = document.querySelector('#userpassword').value.trim();
     const passwordvalidate = document.querySelector('#passwordvalidate').value.trim();
     const username = document.querySelector('#username').value.trim();
     const errorSpan = document.querySelector('#errorMessage');

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

          if (response.ok) {
               document.location.replace('/');
          } else {
               errorSpan.removeAttribute("hidden");
               errorSpan.textContent = 'Oh boy! Something went wrong. I am sorry please contact me. Urgh... hate when this happens';
          }
     }
};

document
     .querySelector('#registration')
     .addEventListener('submit', registerUser);
