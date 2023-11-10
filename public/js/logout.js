/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under MIT
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
const logout = async () => {
     const response = await fetch('/api/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
     });

     if (response.ok) {
          document.location.replace('/login');
     } else {
          alert(response.statusText);
     }
};

document.querySelector('#logout').addEventListener('click', logout);
