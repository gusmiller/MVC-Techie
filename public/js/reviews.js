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

document.addEventListener("DOMContentLoaded", function () {

     /**
      * This call back will call the reply create API. It will pass in its 
      * body the information to save.
      * It was giving me a hard time; it concatenate with the current URL
      * fixe by entering: http://localhost:3001/api/reviews/create
      * @param {event form} event 
      */
     const createReply = async (event) => {
          event.preventDefault(); // Prevent the rendering of the form

          // This is a tough one. This script is called from a URL that already contains
          // an href in this case http://localhost:3001/articles/edit/## this causes the API
          // call to append to the already existing URL. As a result the call fails; this hack
          // fixes this.
          const newURL = new URL(window.location.href); //Create new instance
          newURL.origin = ""; //Clear the origin -which only removes the tail end

          // Retrieve fields collected
          const replycomment = document.getElementById('replycomment').value.trim();
          const post_id = document.getElementById('post_id').value;
          const user_id = document.getElementById('user_id').value;

          if (replycomment && post_id && user_id) {
               console.log(document.location);
               const response = await fetch(`${newURL.origin}/api/reviews/create`, {
                    method: 'POST',
                    body: JSON.stringify({ replycomment, post_id, user_id }),
                    headers: { 'Content-Type': 'application/json' },
               });

               if (response.ok) {
                    document.location.replace('/articles'); // redirect to articles
               } else {
                    alert(response.statusText);
               }
          }
     };
     
     // Entry point start process
     function initialize() {

          document.getElementById('review-post').addEventListener('submit', createReply);
     }

     initialize();

})