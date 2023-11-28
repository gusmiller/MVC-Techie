/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * 
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/15/2023 6:29:35 AM
 *******************************************************************/
document.addEventListener("DOMContentLoaded", function () {

     const selectedcat = document.getElementById("category_id");
     const selectedmem = document.getElementById("memberslist");
     const articles = document.querySelectorAll('[id^="articlespost"]');
     const recycle = document.getElementById("refresharticles");

     const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
     const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

     /**
      * This function will iterate through all the post elements and hide
      * the ones which don't match what has been selected by the user. The 
      * process is simple it retrieves the current user and it validate against the 
      * current post to verify user can reply to comment.
      */
     function filterCategory() {
          const selectedValue = selectedcat.value; //Retrieve user selection

          for (var i = 0; i < articles.length; i++) {

               // For each element we retrieve the category that is loaded in a
               // data-attributes. This allows me to compare with what has been selected
               const value = articles[i].getAttribute('data-category');

               if (value != selectedValue && selectedValue != 0) {
                    articles[i].setAttribute('hidden', true)
               } else {
                    if (articles[i].hasAttribute("hidden")) {
                         articles[i].removeAttribute("hidden");
                    }
               }
          };
     }

     /**
      * This function will iterate through all the post elements and hide
      * the ones which don't match what has been selected by the user. The 
      * process is simple it retrieves the current user and it validate against the 
      * current post to verify user can reply to comment.
      */
     function filterMembers() {
          const selectedValue = selectedmem.value; //Retrieve user selection

          for (var i = 0; i < articles.length; i++) {

               // For each element we retrieve the member id which is loaded in a
               // data-attributes. This allows me to compare with what has been selected
               const value = articles[i].getAttribute('data-memberid');

               if (value != selectedValue && selectedValue != 0) {
                    articles[i].setAttribute('hidden', true)
               } else {
                    if (articles[i].hasAttribute("hidden")) {
                         articles[i].removeAttribute("hidden");
                    }
               }
          };
     }

     /**
      * This will call an APi that will run a sequelize raw SQL to retrieve 
      * only categories that have been used. This way we avoid empty screens.
      */
     const loadCategory = async () => {

          const response = await fetch('/api/categories/categories', {
               method: 'GET',
               headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
               const data = await response.json();

               let selectoptions = document.getElementById("category_id");

               for (var i = 0; i < data.length; i++) {
                    let optionitem = document.createElement('option');
                    optionitem.value = data[i].id;
                    optionitem.innerHTML = data[i].name;
                    optionitem.setAttribute('id', 'categoryId' + data[i].id)
                    selectoptions.appendChild(optionitem);
               }

          } else {
               Swal.fire({
                    icon: 'error',
                    title: 'Yiakes!',
                    text: `Something went wrong! we could not load the categories. ${response}`,
                    timer: 3500
                  })

          }
     };

     /**
      * This will call an APi that will run a sequelize raw SQL to retrieve 
      * a list of all member. This way we avoid empty screens.
      */
     const loadMembers = async () => {

          const response = await fetch('/api/articles/members', {
               method: 'GET',
               headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
               const data = await response.json();

               let selectoptions = document.getElementById("memberslist");

               for (var i = 0; i < data.length; i++) {
                    let optionitem = document.createElement('option');
                    optionitem.value = data[i].id;
                    optionitem.innerHTML = data[i].name;
                    optionitem.setAttribute('id', 'memberId' + data[i].id)
                    selectoptions.appendChild(optionitem);
               }

          } else {
               alert(response.statusText);
          }

     }

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
               showConfirmButton: false,
               timer: closein,
               title: value
          })

     }

     const refreshData = async () => {
          window.location.reload();
     }

     // Entry point start process
     function initialize() {

          loadCategory(); // Load categories - only those used
          loadMembers() // Load TechieBlog members
          configureDelete(); //Initializes event for all Delete buttons

          selectedcat.addEventListener("change", filterCategory);
          selectedmem.addEventListener("change", filterMembers);
          recycle.addEventListener("click", refreshData)

     }

     initialize();
});