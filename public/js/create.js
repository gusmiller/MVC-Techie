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
                    errormessage.innerText = errMess + "Title but not the Article, please write your article an try again."
               } else if (title === "" && description !== "") {
                    errormessage.innerText = errMess + "Article but not the Title, give your article a descriptive Title that can attract readers to read. Please try again."
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
                         title: 'Great job!',
                         text: "Your new article has been posted! You will see it next.",
                         icon: 'success',
                         showCancelButton: false,
                         confirmButtonColor: '#3085d6',
                         confirmButtonText: 'Ok!'
                    }).then((result) => {
                         if (result.isConfirmed) {
                              document.location.replace('/articles');
                         }
                    })

               } else {
                    alert(response.statusText);
               }
          }
     };

     // Entry point start process
     function initialize() {

          document.querySelector('#create-post').addEventListener('submit', createpost);
     }

     initialize();
});