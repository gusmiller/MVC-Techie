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
     const articles = document.querySelectorAll('[id^="articlespost"]');

     /**
      * This function will iterate through all the post elements and hide
      * the ones which don't match what has been selected by the user. The 
      * process is simple it retrieves the current user and it validate against the 
      * current post to verify user can reply to comment.
      */
     function filterCategory() {
          const selectedValue = selectedcat.value; //Retrieve user selection

          for (var i = 0; i < articles.length; i++) {

               // For each element we retrieve the category that is loade in their
               // data-attributes. This allows me to compare with what has been selected
               const value = articles[i].getAttribute('data-category');

               if (value != selectedValue) {
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
          const response = await fetch('api/articles/categories', {
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
               alert(response.statusText);
          }
     };

     // Entry point start process
     function initialize() {

          console.log(selectedcat);
          loadCategory();

          selectedcat.addEventListener("change", filterCategory);

     }

     initialize();
});