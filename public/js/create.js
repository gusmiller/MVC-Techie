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
document.addEventListener("DOMContentLoaded", function () {

     const postform = document.getElementById("create-post");
     const createbutton = document.getElementById("submitarticle");
     const formElements = postform.elements; // Retrieve the form elements

     const articleposted = "Your new article has been posted! You will see it next.";
     const articlenotposted = 'Something went wrong! Article was not posted';
     const welcomepage = 'Welcome to New Article Page!';
     const titlenoarticle = "Title but not the Article, please write your article an try again.";
     const articlenotitle = "Article but not the Title, give your article a descriptive Title that can attract readers to read. Please try again.";

     let Values = {}; // Initial form values

     const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
     const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

     const Toast = Swal.mixin({
          toast: true, position: 'top-end', timer: 3000, timerProgressBar: true,
          didOpen: (toast) => {
               toast.addEventListener('mouseenter', Swal.stopTimer)
               toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
     })

     /**
      * This event will create the post record. It uses sweetalert to display a successfull
      * transaction or error
      * @param {*} event 
      */
     const createpost = async (event) => {
          event.preventDefault();

          const title = document.querySelector('#title').value.trim();
          const description = document.querySelector('#description').value.trim();
          const categoryid = document.querySelector('#category_id').value;
          const user_id = document.querySelector('#user_id').value;

          if (title === "" || description === "") {
               const submitButton = document.getElementById('triggersave');
               const errormessage = document.getElementById('errormessage');
               const errMess = "The information you have entered is not valid! You have entered the ";

               if (title !== "" && description === "") {
                    errormessage.innerText = errMess + titlenoarticle;
               } else if (title === "" && description !== "") {
                    errormessage.innerText = errMess + articlenotitle;
               }

               submitButton.click();
               
          } else {
               const response = await fetch('/api/articles/create', {
                    method: 'POST',
                    body: JSON.stringify({ title, description, categoryid, user_id }),
                    headers: { 'Content-Type': 'application/json' },
               });

               if (response.ok) {

                    Swal.fire({
                         title: 'Great job!', text: articleposted, icon: 'success', showCancelButton: false,
                         confirmButtonColor: '#3085d6', confirmButtonText: 'Ok!',
                    }).then((result) => {
                         if (result.isConfirmed) {
                              document.location.replace('/articles')
                         } else if (result.isDenied) {
                              document.location.replace('/articles')
                         }
                    })

               } else {
                    Toast.fire({ icon: 'error', showConfirmButton: true, confirmButtonText: "Got it!", title: articlenotposted });
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

          document.querySelector('#create-post').addEventListener('submit', createpost);

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
});