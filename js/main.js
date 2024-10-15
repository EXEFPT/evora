(function ($) {
    "use strict";

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('sticky-top');
        } else {
            $('.navbar').removeClass('sticky-top');
        }
    });
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 45,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

// Fetch JSON data menu
function renderMenu(data, sectionId, eventType) {
    const container = document.getElementById(sectionId);
    if (!container) return;

    let rowHtml = '';
    data.event[eventType].forEach((item, index) => {
        const menuItem = `
            <div class="col-lg-6 mb-4">
                <div class="d-flex h-100">
                    <div class="flex-shrink-0">
                        <img class="img-fluid" src="./${item.image}.jpg" alt="" style="width: 150px; height: 150px;">
                    </div>
                    <div class="d-flex flex-column justify-content-center text-start bg-secondary border-inner px-4">
                        <h5 class="text-uppercase">${item.name}</h5>
                        <span style="
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            text-overflow: ellipsis;">${item.about}</span>
                        <span>Địa chỉ: ${item.address}</span>
                        <span>Kinh nghiệm: ${item.experience}</span>
                    </div>
                </div>
            </div>
        `;
        if (index % 2 === 0) {
            rowHtml += '<div class="row">';
        }
        rowHtml += menuItem;
        if (index % 2 === 1) {
            rowHtml += '</div>';
        }
    });

    container.innerHTML = rowHtml;
}

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        renderMenu(data, 'menu-sinh-nhat', 'sinhnhat');
        renderMenu(data, 'menu-tiec-cuoi', 'tieccuoi');
        renderMenu(data, 'menu-thoi-noi', 'thoinoi');
        renderMenu(data, 'menu-khai-truong', 'khaitruong');
    })
    .catch(error => console.error('Error fetching data:', error));

//Fetch JSON data home 

function renderHome(data, sectionId, eventType) {
    const homeContainer = document.getElementById(sectionId);
    if (!homeContainer) return;

    homeContainer.innerHTML = '';

    let rowHtml = '';
    const items = data.event[eventType].slice(0, 4); 
    console.log(`Items for ${eventType}:`, items); 
    items.forEach((item, index) => {
        const homeItem = `
            <div class="col-lg-6 mb-4">
                <div class="d-flex h-100">
                    <div class="flex-shrink-0">
                        <img class="img-fluid" src="./${item.image}.jpg" alt="" style="width: 300px; height: 300px;">
                    </div>
                    <div class="d-flex flex-column justify-content-center text-start bg-secondary border-inner px-4">
                        <h5 class="text-uppercase" style="font-size: 2em;">${item.name}</h5>
                        <span style="
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            font-size: 1.5em;
                            overflow: hidden;
                            text-overflow: ellipsis;">${item.about}</span>
                    </div>
                </div>
            </div>
        `;
        if (index % 2 === 0) {
            rowHtml += '<div class="row">';
        }
        rowHtml += homeItem;
        if (index % 2 === 1) {
            rowHtml += '</div>';
        }
    });

    
    if (items.length % 2 !== 0) {
        rowHtml += '</div>';
    }

    homeContainer.innerHTML = rowHtml;
}

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        renderHome(data, 'sinh-nhat', 'sinhnhat');
        renderHome(data, 'tiec-cuoi', 'tieccuoi');
        renderHome(data, 'thoi-noi', 'thoinoi');
        renderHome(data, 'khai-truong', 'khaitruong');
    })
    .catch(error => console.error('Error fetching data:', error));