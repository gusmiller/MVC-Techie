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

     function filterCategory() {
          const selectedValue = selectedcat.value;
          fetch(`api/articles/categories/${selectedValue}`)
               .then(response => response.json())
               .then((data) => {
                    console.log(data);
               });
          fetch(`api/articles/categories/${selectedValue}`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
               },
          });
     }

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

     function initialize() {          
          
          console.log(selectedcat);
          loadCategory();
          
          selectedcat.addEventListener("change", filterCategory);

     }

     initialize();
});