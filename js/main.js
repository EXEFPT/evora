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

// Fetch JSON data sinh nhat
fetch('data.json') 
    .then(response => response.json())
    .then(data => {
        const sinhNhat = document.getElementById('sinh-nhat');
        let rowHtml = ''; 
        data.event.sinhnhat.forEach((item, index) => {
            const menuItem = `
                <div class="col-lg-6 mb-4">
                    <div class="d-flex h-100">
                        <div class="flex-shrink-0">
                            <img class="img-fluid" src="./${item.image}.jpg" alt="" style="width: 150px; height: 85px;">
                            <h4 class="bg-dark text-primary p-2 m-0">$${item.price}.00</h4>
                        </div>
                        <div class="d-flex flex-column justify-content-center text-start bg-secondary border-inner px-4">
                            <h5 class="text-uppercase">${item.name}</h5>
                            <span>${item.about}</span>
                            <span>Địa chỉ: ${item.address}</span>
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
        sinhNhat.innerHTML = rowHtml;
    })
    .catch(error => console.error('Error fetching data:', error));

// Fetch JSON data tiec cuoi
fetch('data.json') 
    .then(response => response.json())
    .then(data => {
        const tiecCuoi = document.getElementById('tiec-cuoi');
        let rowHtml = '';
        data.event.tieccuoi.forEach((item, index) => {
            const menuItem = `
                <div class="col-lg-6 mb-4">
                    <div class="d-flex h-100">
                        <div class="flex-shrink-0">
                            <img class="img-fluid" src="./${item.image}.jpg" alt="" style="width: 150px; height: 85px;">
                            <h4 class="bg-dark text-primary p-2 m-0">$${item.price}.00</h4>
                        </div>
                        <div class="d-flex flex-column justify-content-center text-start bg-secondary border-inner px-4">
                            <h5 class="text-uppercase">${item.name}</h5>
                            <span>${item.about}</span>
                            <span>Địa chỉ: ${item.address}</span>
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
        tiecCuoi.innerHTML = rowHtml;
    })
    .catch(error => console.error('Error fetching data:', error));

// Fetch JSON data thoi noi
fetch('data.json') 
    .then(response => response.json())
    .then(data => {
        const thoiNoi = document.getElementById('thoi-noi');
        let rowHtml = ''; 
        data.event.thoinoi.forEach((item, index) => {
            const menuItem = `
                <div class="col-lg-6 mb-4">
                    <div class="d-flex h-100">
                        <div class="flex-shrink-0">
                            <img class="img-fluid" src="./${item.image}.jpg" alt="" style="width: 150px; height: 85px;">
                            <h4 class="bg-dark text-primary p-2 m-0">$${item.price}.00</h4>
                        </div>
                        <div class="d-flex flex-column justify-content-center text-start bg-secondary border-inner px-4">
                            <h5 class="text-uppercase">${item.name}</h5>
                            <span>${item.about}</span>
                            <span>Địa chỉ: ${item.address}</span>
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
        thoiNoi.innerHTML = rowHtml;
    })
    .catch(error => console.error('Error fetching data:', error));


