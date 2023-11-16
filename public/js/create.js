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
const createpost = async (event) => {
     event.preventDefault();

     const title = document.querySelector('#title').value.trim();
     const description = document.querySelector('#description').value.trim();
     const categoryid = document.querySelector('#category_id').value;
     const user_id = document.querySelector('#user_id').value;

     const response = await fetch('api/articles/create', {
          method: 'POST',
          body: JSON.stringify({ title, description, categoryid, user_id }),
          headers: { 'Content-Type': 'application/json' },
     });

     if (response.ok) {
          document.location.replace('/articles');
     } else {
          alert(response.statusText);
     }
};

document
     .querySelector('#create-post')
     .addEventListener('submit', createpost);