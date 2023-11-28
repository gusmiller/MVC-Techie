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

     const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
               toast.addEventListener('mouseenter', Swal.stopTimer)
               toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
     })

     /**
      * This function will configure all the eventes for the delete buttons. This is similar to
      * oter functions. The event linked is a Delete API/Endpoint. The id of the article to delete
      * is stored in the button. This function uses the Sweet Alert dialog box to prompt user 
      * for confirmation and it uses a async method, which waits for the fetch to return a value.
      */
     function configureDelete() {
          const deleteButtons = document.querySelectorAll('[id^="delete"]');

          deleteButtons.forEach(function (deleteArticle) {

               // Attach callback function to each button
               deleteArticle.addEventListener('click', async function () {
                    const postidnumber = deleteArticle.getAttribute('data-post');

                    Swal.fire({
                         title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
                         showCancelButton: true,
                         confirmButtonColor: '#d33',
                         cancelButtonColor: '#3085d6',
                         confirmButtonText: 'Yes, delete it!',
                         preConfirm: () => {
                              return fetch(`/api/articles/delete/${postidnumber}`, {
                                   method: 'DELETE',
                                   headers: { 'Content-Type': 'application/json' },
                              }).then(response => {
                                   if (!response.ok) {
                                        throw new Error(response.statusText)
                                   }
                                   return response.json()
                              }).catch(error => {
                                   Swal.showValidationMessage(`Request failed: ${error}`)
                              })
                         },
                         allowOutsideClick: () => !Swal.isLoading()
                    }).then((result) => {
                         debugger;
                         if (result.isConfirmed) {
                              showConfirmed('Your article has been deleted!', 'success');
                              document.location.reload(true);
                         }
                    })

               });

          });
     }

     /**
      * This function will display a message on the screen.
      * @param {string} value - Mesage to display
      * @param {string} severity - message type
      */
     function showConfirmed(value, severity, closein = 2500) {

          Toast.fire({
               icon: severity,
               title: value
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

          Swal.fire({
               position: 'top-end',
               icon: 'success',
               title: 'Your have been logged out!',
               showConfirmButton: false,
               timer: 2500
          }).then((result) => {
               const response = fetch('/api/users/logout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
               });
          })
     }

     // Script entry point - start process
     const initApplication = () => {

          const logoutControl = document.querySelector("#logout");
          //document.querySelector("#login").addEventListener('click', logUserIn);
          //logoutControl.addEventListener('click', logUserOut);

          commentEvents();
          handleRespondLink(); //Initialize events for editable article
          configureDelete(); //Initializes event for all Delete buttons
     }


     initApplication();

});