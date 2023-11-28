/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
$(document).ready(function () {

     let postidnumber = 0;

     /**
      * This function will configure all the eventes for the delete buttons. This is similar to
      * oter functions. The event linked is a Delete API/Endpoint. The id of the article to delete
      * is stored in the button.
      */
     function configureDelete() {
          const deleteButtons = document.querySelectorAll('[id^="delete"]');

          deleteButtons.forEach(function (deleteArticle) {

               // Attach callback function to each button
               deleteArticle.addEventListener('click', async function () {
                    const postidnumber = deleteArticle.getAttribute('data-post');

                    if (confirmDelete === true) {

                         // call Delete api/endpoint
                         const response = await fetch(`/api/articles/delete/${postidnumber}`, {
                              method: 'DELETE',
                              headers: { 'Content-Type': 'application/json' },
                         });


                         if (response.ok) {
                              document.location.reload(true);
                              showConfirmed('Your article has been deleted!','success');
                         } else {
                              showConfirmed('Something went wrong!','error');
                         }

                    } else {

                    }
               });

          });
     }

     /**
      * This function will display a message on the screen.
      * @param {string} value - Mesage to display
      * @param {string} severity - message type
      */
     function showConfirmed(value, severity) {
          Swal.fire({
               position: 'top-end',
               icon: severity,
               title: value,
               showConfirmButton: false,
               timer: 1500
          })
     }

     /**
      * 
      */
     function confirmDelete() {
          Swal.fire({
               title: 'Are you sure?',
               text: "You won't be able to revert this!",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
               if (result.isConfirmed) {
                    return true;
               } else {
                    return false;
               }
          })
     }

     /**
      * This functon will validate each of the post and hide/show them based on selected category.
      * It select all the comments block and it compares with logged in user
      */
     function handleRespondLink() {
          const postbuttons = document.querySelectorAll('[id^="articlespost"]');

          postbuttons.forEach(function (posttag) {
               posttag.addEventListener('mouseover', async function () {
                    const currentUser = document.getElementById("dashboard").getAttribute('data-user');
                    postidnumber = posttag.getAttribute('data-post');
                    const userLoggedIn = posttag.getAttribute('data-owner');
                    const linkElement = document.getElementById("edit" + postidnumber)
                    const deleteElement = document.getElementById("delete" + postidnumber)

                    if (userLoggedIn === currentUser) {
                         linkElement.removeAttribute('hidden');
                         deleteElement.removeAttribute('hidden');
                    }

               });
               posttag.addEventListener('mouseout', async function () {
                    const postidnumber = posttag.getAttribute('data-post');
                    const linkElement = document.getElementById("edit" + postidnumber)
                    const deleteElement = document.getElementById("delete" + postidnumber)

                    linkElement.setAttribute('hidden', true);
                    deleteElement.setAttribute('hidden', true);
               });
          });
     }

     /**
      * Add a click event listener to each matching element. User will click on the button when 
      * sending a commment to the post
      */
     function commentEvents() {

          const postbuttons = document.querySelectorAll('[id^="postreply"]');

          postbuttons.forEach(function (element) {
               element.addEventListener('click', async function () {

                    const postbuttons = document.getElementById(element.id);
                    const postid = parseInt(postbuttons.getAttribute("data-postid"), 10)

                    await fetch(`/api/posts/create/${postid}`, {
                         method: 'GET',
                         headers: {
                              'Content-Type': 'application/json',
                         },
                    });

               });
          });
     }

     /**
      * This function will log the user out of the system - it calls the lgout api and 
      * destroy the session cookie. Then it returns to the main page portal.
      */
     const logUserOut = async () => {
          const response = await fetch('/api/users/logout', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
               document.location.replace('/');
          } else {
               alert(response.statusText);
          }
     }

     // Script entry point - start process
     const initApplication = () => {

          const logoutControl = document.querySelector("#logout");
          //document.querySelector("#login").addEventListener('click', logUserIn);
          logoutControl.addEventListener('click', logUserOut);

          commentEvents();
          handleRespondLink(); //Initialize events for editable article
          configureDelete(); //Initializes event for all Delete buttons
     }


     initApplication();

});