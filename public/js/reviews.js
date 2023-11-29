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

     const postform = document.getElementById("review-post");
     const createbutton = document.getElementById("submitreview");
     const formElements = postform.elements; // Retrieve the form elements

     const reviewposted = "Your review has been posted! Author will be able to see it.";
     const couldnotpost = "Something went wrong! Review could not be posted.";
     const welcomepage = 'Welcome to Review Page!';

     let Values = {}; // Initial form values

     const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
     const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

     const Toast = Swal.mixin({
          toast: true, position: 'top-end', timer: 4500, timerProgressBar: true,
          didOpen: (toast) => {
               toast.addEventListener('mouseenter', Swal.stopTimer)
               toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
     })

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
          const userid = document.getElementById('userid').value;

          if (replycomment && post_id && userid) {
               const response = await fetch(`${newURL.origin}/api/reviews/create`, {
                    method: 'POST',
                    body: JSON.stringify({ replycomment, post_id, userid }),
                    headers: { 'Content-Type': 'application/json' },
               });

               if (response.ok) {

                    Swal.fire({
                         title: 'Fantastic!', text: reviewposted, icon: 'success', showCancelButton: false,
                         confirmButtonColor: '#3085d6', confirmButtonText: 'Ok!', timer: 3500
                    }).then((result) => {
                         if (result.isConfirmed) {
                              document.location.replace('/articles');
                         }
                    })

               } else {
                    Toast.fire({ icon: 'error', showConfirmButton: true, confirmButtonText: "Got it!", title: couldnotpost })
               }
          }
     };

     /**
      * This function registers an event to all elements in the form. Using this event we can 
      * compare with the array and original value to determine a change was made.
      */
     function registerEvents() {
          for (var i = 0; i < formElements.length; i++) {
               formElements[i].addEventListener('change', function (event) {
                    if (event.target.value !== Values[event.target.name]) {
                         createbutton.removeAttribute('disabled');
                    }
               });
          }
     }

     // Entry point start process
     function initialize() {

          document.getElementById('review-post').addEventListener('submit', createReply);

          // Populate the values for each of the objects in the current form. We use this array to
          // compare with what user enters.
          for (var i = 0; i < formElements.length; i++) {
               var element = formElements[i];
               Values[element.name] = element.value;
          }
          registerEvents();

          Toast.fire({ icon: 'info', showConfirmButton: false, title: welcomepage })

     }

     initialize();

})