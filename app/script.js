$(document).ready(function() {
    // Constants
    const $window = $(window);
    const $header = $('header');
    const $mainNav = $('.main-nav');
    const $mobileNav = $('.mobile-nav');
    const $mobileMenu = $('.mobile-menu');
    const $menuToggle = $('.menu-toggle');
  
    // Submenu Hover Effect
    function setupSubmenus() {
      $mainNav.find('li').hover(
        function() {
          const $submenu = $(this).children('ul');
          if ($submenu.length) {
            $submenu.stop(true, true).fadeIn(300);
          }
        },
        function() {
          const $submenu = $(this).children('ul');
          if ($submenu.length) {
            $submenu.stop(true, true).fadeOut(200);
          }
        }
      );
    }
  
    // Mobile Menu Toggle
    function setupMobileMenu() {
      $menuToggle.on('click', function() {
        $mobileMenu.toggleClass('open');
        $mobileNav.toggleClass('open');
      });
  
      $mobileMenu.find('li').each(function() {
        const $submenu = $(this).children('ul');
        if ($submenu.length) {
          $(this).append('<span class="submenu-toggle">+</span>');
        }
      });
  
      $mobileMenu.on('click', '.submenu-toggle', function(e) {
        e.preventDefault();
        const $li = $(this).parent('li');
        const $submenu = $li.children('ul');
        $submenu.slideToggle(300);
        $(this).text($(this).text() === '+' ? '-' : '+');
      });
    }
  
    // Dynamic Navbar Resize
    function setupDynamicNavbar() {
      const scrollThreshold = 100;
      const smallHeaderClass = 'header-small';
  
      $window.scroll(function() {
        if ($window.scrollTop() > scrollThreshold) {
          if (!$header.hasClass(smallHeaderClass)) {
            $header.addClass(smallHeaderClass);
            $mainNav.slideUp(200, function() {
              $mainNav.addClass('nav-small').slideDown(200);
            });
          }
        } else {
          if ($header.hasClass(smallHeaderClass)) {
            $header.removeClass(smallHeaderClass);
            $mainNav.slideUp(200, function() {
              $mainNav.removeClass('nav-small').slideDown(200);
            });
          }
        }
      });
  
      // Throttle scroll event for performance
      let scrollTimeout;
      $window.on('scroll', function() {
        if (!scrollTimeout) {
          scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
            $window.trigger('throttled-scroll');
          }, 100);
        }
      });
  
      $window.on('throttled-scroll', function() {
        if ($window.scrollTop() > scrollThreshold) {
          if (!$header.hasClass(smallHeaderClass)) {
            $header.addClass(smallHeaderClass);
            $mainNav.addClass('nav-small');
          }
        } else {
          if ($header.hasClass(smallHeaderClass)) {
            $header.removeClass(smallHeaderClass);
            $mainNav.removeClass('nav-small');
          }
        }
      });
    }
  
    // Search Functionality
    function setupSearch() {
      const $searchIcon = $('.search-icon a');
      const $searchOverlay = $('<div class="search-overlay"></div>');
      const $searchForm = $(`
        <form class="search-form">
          <input type="text" placeholder="Search...">
          <button type="submit"><i class="material-icons">search</i></button>
          <button type="button" class="close-search"><i class="material-icons">close</i></button>
        </form>
      `);
  
      $searchOverlay.append($searchForm).appendTo('body').hide();
  
      $searchIcon.on('click', function(e) {
        e.preventDefault();
        $searchOverlay.fadeIn(300);
        $searchForm.find('input').focus();
      });
  
      $searchForm.on('submit', function(e) {
        e.preventDefault();
        // Add your search logic here
        alert('Searching for: ' + $(this).find('input').val());
      });
  
      $searchForm.find('.close-search').on('click', function() {
        $searchOverlay.fadeOut(300);
      });
    }

    // Initialize
    function init() {
      setupSubmenus();
      setupMobileMenu();
      setupDynamicNavbar();
      setupSearch();
    }
  
    init();
  });

  // Trigger in-page search
function triggerSearch() {
  let searchTerm = prompt("Enter the text to search for:");
  if (searchTerm) {
    if (!window.find(searchTerm)) {
      alert("No matches found.");
    }
  }
}