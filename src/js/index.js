import '../css/main.scss'
import $ from 'jquery';


import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

global.jQuery = $;
global.$ = $;


formValid();

$(".mobile-menu-toggle-button").click (function(){
    $("html").toggleClass("mobile-menu-open");
  });

// swiper
Swiper.use([Navigation, Pagination, Autoplay]);

const swiper = new Swiper('#review_slider', {
  effect: 'slide',
  fadeEffect: {
      crossFade: true
    },
  modules: [Navigation, Pagination, Autoplay],
  loop: false,
  slidesPerView: 1,
  spaceBetween: 20,
  slidesPerGroup: 2,
  breakpoints: {
    670: {
        slidesPerView: 2,
    },
    999: {
      slidesPerView: 3,
    },
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      clickable: true,
  },
  pagination: {
      el: '.reviews-slider-pagination',
      type: 'bullets',
      clickable: true,
  },
});

$(".toggle-button").click (function(){
  $(this).parent().toggleClass('open'); 
});

$(".label").click (function(){
  $(this).parent().toggleClass('empty'); 
});

function formValid() {
    const form = document.getElementById("feedback_form");
    form.addEventListener("submit", formSend);


    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
          form.classList.add('sending');
          
          let response = await fetch('mail.php', {
            method: 'POST',
            body: formData
          });

          if (response.ok) {
            let result = await response.json();
            alert(result.message);
            form.reset();
            form.classList.remove('sending');

          } else {
            alert('Ошибка');
            form.classList.remove('sending');
          }
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll(".req")

        console.log('kfdsfe');

        for (let index = 0; index < formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);

            if(input.getAttribute("type") === "checkbox" && input.checked === false){
                formAddError(input);
                error++;
            }else{
                if (input.value === ""){
                    formAddError(input);
                    error++;
                }
            }
            console.log('123');
        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add("error");
        input.classList.add("error")
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove("error");
        input.classList.remove("error");
    }
    

};
