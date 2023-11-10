/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
module.exports = {
     get_emoji: () => {
          const randomNum = Math.random();
          let book = "📗";

          if (randomNum > 0.7) {
               book = "📘";
          } else if (randomNum > 0.4) {
               book = "📙";
          }

          return `<span for="img" aria-label="book">${book}</span>`;
     },
};
