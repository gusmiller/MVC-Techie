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

     /**
      * This functon will validate each of the post and hide/show them 
      * based on selected category. It select all the comments block and it 
      * compares with logged in user
      */
     function handleRespondLink() {
          const postbuttons = document.querySelectorAll('[id^="commentblock"]');

          postbuttons.forEach(function (element) {
               element.addEventListener('mouseover', async function () {
                    const currentUser = document.getElementById("dashboard").getAttribute('data-user');
                    const userLoggedIn = element.parentElement.parentElement.parentElement.getAttribute('data-owner');

                    if (userLoggedIn === currentUser) {
                         const linkElement = element.children[1]
                         linkElement.removeAttribute('hidden');
                    }

               });
               element.addEventListener('mouseout', async function () {
                    const linkElement = element.children[1]
                    linkElement.setAttribute('hidden', true);
               });
          });
     }

     // Add a click event listener to each matching element. User will click on the button when sending 
     // a commment to the post
     function commentEvents() {

          const postbuttons = document.querySelectorAll('[id^="postreply"]');

          postbuttons.forEach(function (element) {
               element.addEventListener('click', async function () {

                    const postbuttons = document.getElementById(element.id);
                    const postid = parseInt(postbuttons.getAttribute("data-postid"), 10)

                    await fetch(`api/posts/create/${postid}`, {
                         method: 'GET',
                         headers: {
                              'Content-Type': 'application/json',
                         },
                    });

               });
          });
     }

     const logUserIn = async () => {
          document.location.replace('/login');
     }

     /**
      * This function will log the user out of the system - it calls the lgout api and 
      * destroy the session cookie. Then it returns to the main page portal.
      */
     const logUserOut = async () => {
          const response = await fetch('api/users/logout', {
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
          document.querySelector("#login").addEventListener('click', logUserIn);
          logoutControl.addEventListener('click', logUserOut);

          commentEvents();
          handleRespondLink();
     }


     initApplication();

});