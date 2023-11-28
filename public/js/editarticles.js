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
     const selectedid = document.getElementById("categoryid").value;

     /**
      * This will call an APi that will run a sequelize raw SQL to retrieve 
      * only categories that have been used. This way we avoid empty screens.
      * http://localhost:3001/edit/articles
      */
     const loadCategory = async () => {

          // This is a tough one. This script is called from a URL that already contains
          // an href in this case http://localhost:3001/articles/edit/## this causes the API
          // call to append to the already existing URL. As a result the call fails; this hack
          // fixes this.
          const newURL = new URL(window.location.href); //Create new instance
          newURL.origin = ""; //Clear the origin -which only removes the tail end

          const response = await fetch("/api/categories/categories", {
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
                    if (data[i].id.toString() === selectedid){
                         optionitem.setAttribute('selected', true)
                    }
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
      * This will call a PUT endpoint APi, update the seleced Post/Article. All we need to
      * do is pass the fields to update in the body.
      * @param {object} event 
      */
     const updatepost = async (event) => {
          event.preventDefault();

          // This is a tough one. This script is called from a URL that already contains
          // an href in this case http://localhost:3001/articles/edit/## this causes the API
          // call to append to the already existing URL. As a result the call fails; this hack
          // fixes this.
          const newURL = new URL(window.location.href); //Create new instance
          newURL.origin = ""; //Clear the origin -which only removes the tail end
     
          const title = document.querySelector('#title').value.trim();
          const description = document.querySelector('#description').value.trim();
          const categoryid = document.querySelector('#category_id').value;
          const articleid = document.querySelector('#articleid').value;
     
          const response = await fetch(newURL.origin + `/api/articles/update/${articleid}` , {
               method: 'PUT',
               body: JSON.stringify({ title, description, categoryid }),
               headers: { 'Content-Type': 'application/json' },
          });
     
          if (response.ok) {
               document.location.replace('/articles');
          } else {
               alert(response.statusText);
          }
     };

     // Entry point start process
     function initialize() {

          document.querySelector('#edit-post').addEventListener('submit', updatepost);
          loadCategory();

     }

     initialize();
});