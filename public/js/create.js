/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * 
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/12/2023 8:28:41 AM
 *******************************************************************/
const logout = async () => {
     const response = await fetch('/api/posts/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
     });

     if (response.ok) {
          document.location.replace('/login');
     } else {
          alert(response.statusText);
     }
};

document.querySelector('#create-post').addEventListener('click', logout);