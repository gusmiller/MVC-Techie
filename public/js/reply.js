/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * 
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/15/2023 3:12:44 PM
 *******************************************************************/

/**
 * This call back will call the reply create API. It will pass in its 
 * body the information to save.
 * It was giving me a hard time; it concatenate with the current URL
 * fixe by entering: http://localhost:3001/api/replies/create
 * @param {event form} event 
 */
const createReply = async (event) => {
     event.preventDefault(); // Prevent the rendering of the form

     // Retrieve fields collected
     const replycomment = document.getElementById('replycomment').value.trim();
     const comment_id = document.getElementById('comment_id').value;
     const user_id = document.getElementById('userid').value;

     if (replycomment && comment_id && user_id) {
          console.log(document.location);
          const response = await fetch(`${document.location.origin}/api/replies/create`, {
               method: 'POST',
               body: JSON.stringify({ replycomment, comment_id, user_id }),
               headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
               document.location.replace('/articles'); // redirect to articles
          } else {
               alert(response.statusText);
          }
     }
};

document
     .querySelector('#create-reply')
     .addEventListener('submit', createReply);