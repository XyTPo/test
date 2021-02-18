document.addEventListener("DOMContentLoaded", function (e) { 
    // Popup form
    var $popUpForm = $('.pop-up-form');
    var $popUpFormBlock = $('.pop-up-form-block');
    var $body = $('body');
    var $stickyForm = $('.form_sticky');
    var $sliderBottomBtn = $('.r-slider__bottom');
    var $formTop = $('.form__top');
    var width = window.innerWidth; 
    var isInIframe = inIframe();

    // Check if in iframe tag
    if (isInIframe) {
        var btn = document.createElement('button');
        btn.innerText = 'Open pop-up form';
        btn.classList.add('iframe-popup-btn');
        $body.appendChild(btn);
        $(btn).click(showPopUpForm);
    } else {
        $('.js-popup-form').click(showPopUpForm);
    }

    // inIframe helper
    function inIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    function showPopUpForm(e) {
        if (width > 1200) {
            // Hide sticky form
            $stickyForm.addClass('hide-form');
            $popUpForm.addClass('show-popup');
            setTimeout(function () {
                $popUpFormBlock.addClass('animate-form');
            }, 200);
        }
    }

    $popUpForm.click(function (e) {
        if ($(e.target).hasClass('show-popup') || $(e.target).hasClass('pop-up-form__close-btn')) {
            $popUpFormBlock.removeClass('animate-form');

            setTimeout(function () {
                $popUpForm.removeClass('show-popup');
                // Show sticky form
                $stickyForm.removeClass('hide-form');
            }, 200);
        }
    });

    $(document).on('showNoRedirectPopup', function () {
        $popUpFormBlock.removeClass('animate-form');
        setTimeout(function () {
            $popUpForm.removeClass('show-popup');
            // Show sticky form
            $stickyForm.removeClass('hide-form');
        }, 100);
    });

    // Scrolling when clicking on the slider btn
    $sliderBottomBtn.click(function (e) {
        e.preventDefault();

        // Prevent slider btn scroll on desktop
        if (width > 1200) {
            showPopUpForm()
        } else {
            $('html, body').animate({
                scrollTop: $formTop.offset().top - 20
            }, 1000);
        }
    });

    // Scrolling when clicking on the CTA btn
    $('.js-scroll').click(function (e) {
        e.preventDefault();
        const $this = $(this);
        // Prevent scrolling on desktop
        if ($this.hasClass('js-popup-form') && (width > 1200)) {
            return
        }

        $('html, body').animate({
            scrollTop: $("." + this.dataset.scroll).offset().top - 20
        }, 1000);
    });
});