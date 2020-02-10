let burger_menu, nav_list;
    
  burger_menu = document.querySelector('.burger-menu');
  nav_list = document.querySelector('.nav-list');

  burger_menu.addEventListener('click', (e) => {
    burger_menu.classList.toggle('burger-menu--active');
    nav_list.classList.toggle('nav-list--active');
  })
