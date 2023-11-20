/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
document.addEventListener("DOMContentLoaded", function () {
     const logout = async () => {
          const response = await fetch('api/users/logout', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
               document.location.reload(true);
               document.location.replace('/');
               document.location.reload(true);
          } else {
               alert(response.statusText);
          }
     };

     const initApplication = () => {
          document.querySelector('#logout').addEventListener('click', logout);
     }

     initApplication();

});