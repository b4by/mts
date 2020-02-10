let dropdown_toggle_btn = document.querySelectorAll('[data-action="dropdown-toggle"]'),
    dropdown_menu = document.querySelectorAll('[data-target="dropdown"]');

function toggleDropdown() {
  for (let toggle of dropdown_toggle_btn) {
    toggle.addEventListener('click', function(e) {
    if (toggle.classList.contains('toggle--active')) {
      toggle.classList.remove('toggle--active')
    } else {
      toggle.classList.add('toggle--active')
    }
   })
  }
}

toggleDropdown();