$(document).ready(function(){


    // check browser and OS
    var vendor = window.navigator.vendor,
        platform = window.navigator.platform,
        userAgent = window.navigator.userAgent;

    var browser;

    if (navigator.userAgent.search("OPR") >= 0) {
        browser = 'opera';
    } else if (navigator.userAgent.search("YaBrowser") >= 0) {
        browser = 'yandex';
    } else if (navigator.userAgent.search("Edg") >= 0) {
        browser = 'edge';
    } else if (navigator.userAgent.search("Chrome") >= 0) {
        browser = 'chrome';
    } else if (navigator.userAgent.search("Firefox") >= 0) {
        browser = 'firefox';
    } else if (navigator.userAgent.search("Trident") >= 0) {
        browser = 'ie';
    } else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        browser = 'safari';
    }

    var macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];

    var os;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'mac';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = "ios";
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Windows Phone/.test(userAgent)) {
        os = 'windows-phone';
    } else if (/Android/.test(userAgent)) {
        os = 'android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'linux';
    }

    if (browser != undefined) {
        $('body').addClass(browser + '-browser')
    }

    if (os != undefined) {
        $('body').addClass(os + '-os')
    }
    // check browser and OS


    //fix css transition onload
    setTimeout(function(){
        $("body").removeClass("transition-none");
    }, 200);
    //fix css transition onload


    $('html').keydown(function(eventObject){
      if (event.keyCode == 117) {
        $('#modal_wheel').arcticmodal({
            openEffect:{speed:200},
            beforeOpen: function(data, el) {

                //disableScroll()
            },
            afterOpen: function(data, el) {
//                if (target_modal == "#success-modal") {
//                    $('.arcticmodal-container').addClass('for-success')
//                }
            },
            beforeClose: function(data, el) {
//                if (!$("#js-menu-container").hasClass("opened")) {
//                    enableScroll()
//                }
            },
            afterClose: function(data, el) {


            },
            closeOnOverlayClick: false
        });
      }
    });

    //open modal
    $('.getModal').on('click', function(e){
        e.preventDefault();
        var thisLink = $(this)
        var target_modal = $(this).attr('data-href');
        $(target_modal).arcticmodal({
            openEffect:{speed:200},
            beforeOpen: function(data, el) {
                if (target_modal == '#password-recovery') {
                    $("#login-modal").arcticmodal('close')
                }
                if (thisLink.hasClass('toLoginModal')) {
                    $("#password-recovery").arcticmodal('close')
                }
                if (thisLink.hasClass('toRegModal')) {
                    $("#login-modal").arcticmodal('close')
                }

                disableScroll()
            },
            afterOpen: function(data, el) {
                if (target_modal == "#success-modal") {
                    $('.arcticmodal-container').addClass('for-success')
                }
            },
            beforeClose: function(data, el) {
                if (!$("#js-menu-container").hasClass("opened")) {
                    enableScroll()
                }
            },
            afterClose: function(data, el) {


            },
            closeOnOverlayClick: false
        });
    });


    $('.modal_close').on('click', function(){
        $(this).arcticmodal('close');
    });
    //open modal


//    $('.js-input-number').on('keydown', function(e){
//      if(e.key.length == 1 && e.key.match(/[^0-9+'"]/)){
//        return false;
//      };
//    });

    $('.js-input-number').on('keydown', function(e){
      if(e.key.length == 1 && e.key.match(/[^0-9+'"]/)){
        return false;
      };
    });

    $('.js-input-number').on('focus', function(e){
        let value = $(this).val(),
            input = $(this)

        if (value == '') {
            $(this).val('+')
            
            setTimeout(() => {
                input[0].setSelectionRange(2, 2);
            }, 50)
            
        }
    });


    $('.js-input-number').on('blur', function(e){
        let value = $(this).val()

        if (value == '+') {
            $(this).val('')
            $(this).parent('.input-wrap').removeClass('active')
            $(this).removeClass('active')
            $(this).siblings('label').removeClass('active')
        }
    });


    var wheelWasSpinned = localStorage.getItem("wheelWasSpinned")

    $('#spin-btn').on('click', function(e){
        e.preventDefault()

        let prizeIndex = getRandomPrize()
        let userNumber = $('.modal_wheel .js-input-number').val()

        $('.modal_wheel .js-input-number').parent().removeClass('invalid')

        if ($('.modal_wheel .js-input-number').val().length < 10) {
            $('.modal_wheel .js-input-number').parent().addClass('invalid')
            return
        }

        if ((wheelWasSpinned != null) && (wheelWasSpinned == userNumber)){
            alert('Вы уже крутили колесо. Это можно сделать только один раз')
            return
        }

        if ( ! $('.modal_wheel .form-step-2 input[name="prize"]').length) {
            $('.modal_wheel .form-step-2').append('<input type="hidden" name="prize" value="">');
        }
        if ( ! $('.modal_wheel .form-step-2 input[name="phone"]').length) {
            $('.modal_wheel .form-step-2').append('<input type="hidden" name="phone" value="">');
        }

        let prizes = {
            1: '* Сертификат 2000р',
            2: 'Скидка 10%',
            3: 'Сертификат 500р',
            4: 'Скидка 10%',
            5: '* Сертификат 3000р',
            6: 'Скидка 5%',
        }
        let prize = prizes[prizeIndex]
        $('#js-wheel').addClass('animatedTo'+prizeIndex).removeClass('spin')
        $('.modal_wheel .form-step-2 input[name="prize"]').val(prize)

        setTimeout(function(){
            $('.modal_wheel .modal-title').html(`
                        Ура! Вы выиграли
                        <br><b class="red">— ${prize}!</b>
                    `)
        }, 2000)

        $('.form-step-2 input[name="phone"]').val($('.js-input-number').val())

        setTimeout(function(){
            $('.modal_wheel').addClass('win-modal')
            $('.modal_wheel .form-step-1').remove()
            $('.modal_wheel .form-step-2').fadeIn(500).css('display', 'flex')
            localStorage.setItem('wheelWasSpinned', userNumber)
        }, 2000)

        if ( ! $('.modal_wheel .form-step-2 .submit-btn').length) {
            submitWheelForm();
        }

    })

//    $('.js-submit-btn').on('click', function(e){
//        e.preventDefault()
//        $('.modal_wheel .modal-form').empty()
//        $('.modal_wheel .modal-form').html(`
//            <div class="success-block">
//                <div class="success-block-title">
//                    <b>Подарок</b> и инструкция отправлены!
//                </div>
//                <div class="success-block-subtitle">Проверьте телефон и почту</div>
//            </div>
//        `)
//    })

    function submitWheelForm(e) {
        e && e.preventDefault();

        var self = $(this)
        var proceed = true;

        if(proceed) {

            const send_data = {
                'email': $('.modal_wheel .form-step-2 input[name="email"]').val(),
                'prize': $('.modal_wheel .form-step-2 input[name="prize"]').val(),
                'phone': $('.modal_wheel .form-step-2 input[name="phone"]').val()
            };
            let roistat_visit = false;
            roistat_visit = document.cookie.match(/roistat_visit=(\d+)/);
            if (roistat_visit) {
                send_data.roistat_visit = roistat_visit[1];
            }
            let urlParams = new URLSearchParams(window.location.search);
            let storedUTM = localStorage && localStorage.getItem("utm");
            if (storedUTM) {
                try {
                    storedUTM = JSON.parse(storedUTM);
                } catch (e) {
                    storedUTM = false;
                }
            }
            let utm = {}
            for (let [key, value] of urlParams.entries()) {
                key = key.replace(/^utm_/, '')
                if (["source", "medium", "campaign", "term", "content"].includes(key) && value) {
                    utm[key] = value;
                }
            }
            if (utm.source) {
                send_data.utm = utm;
                localStorage && localStorage.setItem("utm", JSON.stringify());
            } else if (storedUTM) {
                send_data.utm = storedUTM;
            }

            //var send_url = document.location.origin + '/wp-content/themes/advent/send.php';
            var send_url_amo = 'https://ddma.me/external/mylogoped/amo/amo.php';

            if ($(this).data('redirect')) {
                var succes_page = $(this).data('redirect');
                if (typeof succes_page == "undefined") {

                }
            }
            $.ajax({
                type: "POST",
                url: send_url_amo,
                data: send_data,
                success: function (result) {

                    $('.modal_wheel .modal-form').empty()
                    $('.modal_wheel .modal-form').html(`
                        <div class="success-block">
                            <div class="success-block-title">
                                <b>Подарок</b> и инструкция отправлены!
                            </div>
                            <div class="success-block-subtitle">Проверьте телефон и почту</div>
                        </div>
                    `)
                    
                    ym(93969337,'reachGoal','ym-lead-form-confirm')
                },
                error: function (xhr, str) {
                    console.log('amo not send')
                }
            });
        }

        return false;
    }

    /********************  forms  *********************/
    $('.modal_wheel .form-step-2').on('submit', submitWheelForm);

    //input placeholder function
    jQuery("input.input-placeholder, textarea.input-placeholder").each(function() {
        var thisInput = jQuery(this);

        if (thisInput.val() !== "") {
            thisInput.parent().addClass("active");
            thisInput.prev("label").addClass("active");
        }
    });

    jQuery('input.input-placeholder, textarea.input-placeholder').placeholderLabel();
    //input placeholder function




    function getRandomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function getRandomPrize() {
        let random = getRandomBetween(1, 100)

        if (random >= 1 && random <= 100) {
            let prizes = [2, 5]
            let prizeIndex = Math.floor(Math.random() * prizes.length)

            return prizes[prizeIndex]
        } else {
            let prizes = [2, 3, 5]
            let prizeIndex = Math.floor(Math.random() * prizes.length)

            return prizes[prizeIndex]
        }
    }

    const today = new Date();
    today.setDate(today.getDate() + 3);

    var months = ["января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    var newMonth = months[today.getMonth()];
    var newDay = today.getDate();

    $(".js-day").text(newDay);
    $(".js-month").text(newMonth);
});