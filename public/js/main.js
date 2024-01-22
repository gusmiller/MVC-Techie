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
     const logoutControl = document.querySelector("#logout");
     const loginControl = document.querySelector("#login");
     const loginasControl = document.querySelector("#loggeinas");
     const createnewControl = document.querySelector("#createnew");

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
                    const commentElement = document.getElementById("comment" + postidnumber)

                    if (userLoggedIn === currentUser) {
                         linkElement.removeAttribute('hidden');
                         deleteElement.removeAttribute('hidden');
                    }

                    if (currentUser.length > 0 && userLoggedIn !== currentUser) {
                         commentElement.removeAttribute('hidden');
                    }

               });
               posttag.addEventListener('mouseout', async function () {
                    const postidnumber = posttag.getAttribute('data-post');
                    const linkElement = document.getElementById("edit" + postidnumber)
                    const deleteElement = document.getElementById("delete" + postidnumber)
                    const commentElement = document.getElementById("comment" + postidnumber)

                    linkElement.setAttribute('hidden', true);
                    deleteElement.setAttribute('hidden', true);
                    commentElement.setAttribute('hidden', true);
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

          //Call the API REST route to destroy the session
          const response = fetch('/api/users/logout', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
          });

          //Once we destroy the session we then swap the buttons by handling hidden
          //attributes.
          logoutControl.setAttribute('hidden', true);
          loginasControl.setAttribute('hidden', true);
          createnewControl.setAttribute('hidden', true);
          loginControl.removeAttribute('hidden');

          const currentUser = document.getElementById("dashboard")
          currentUser.setAttribute('data-user', '');

          Swal.fire({
               position: 'top-end',
               icon: 'success',
               title: 'Your have been logged out!',
               showConfirmButton: false,
               timer: 2500
          })

     }

     // Script entry point - start process
     const initApplication = () => {

          logoutControl.addEventListener('click', logUserOut);

          commentEvents();
          handleRespondLink(); //Initialize events for editable article

     }

     initApplication();

});