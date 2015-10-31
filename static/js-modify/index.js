require("../../bower_components/zepto/zepto.js");
require("../../bower_components/zeptojs/src/touch.js");
require("../../bower_components/velocity/velocity.min.js");
require("../../bower_components/swiper/dist/js/swiper.min.js");
require("../js/share.min.js");

window.onload = function(){
    var isself = 0;
    
    if(!localStorage['date']) {
        isself = 1;
        localStorage['date'] = new Date();
    }
    if(isself) {

    }
    else {

    }
    w = $(window).width();
    h = $(window).height();
    $(document).on("touchmove",function(){
        return false;
    });
    on = false;
    //$("#audio").attr({"src":"/static/image/background.mp3"});
    //$("#audio")[0].play();
    /*$(".music").on("click",function(){
        if(on) {
            on = false;
            document.getElementById("audio").pause();
            $(".music").removeClass("music-play");
        }   
        else {
            on = true;
            document.getElementById("audio").play();
            $(".music").addClass("music-play");
        }
    });*/
    var clearAnimation = function(fun) {
        $(".title").hide();
        $(".sound").hide();
        $(".desc").hide();
        fun();
    };
    var page1Show = function() {
        $(".page1 .title").show();
    };
    var page2Show = function() {
        $(".page2 .title").show();
    };
    var page3Show = function() {
        $(".page3 .title").show();
    };
    var page3Show = function() {
        $(".page3 .title").show();
    };
    var page4Show = function() {
        $(".page4 .title").show();
    };
    var page5Show = function() {
        $(".page5 .title").show();
    };
    var page6Show = function() {
        $(".page6 .title").show();
    };
    $(".page5 .avatar").on('tap',function(){
        $(".avatar-file").click();
    });
    $(".avatar-file").on('change',function(){
        var fReader = new FileReader();
        file_element = $(".avatar-file")[0];
        fReader.readAsDataURL(file_element.files[0]);
        fReader.onloadend = function(event) {
            upload_image = event.target.result;
            $(".avatar").css({
                "background-image":"url('"+upload_image+"')"
            });
        }
    });
    $(".page5 .submit").on('tap',function(){
        var formdata = new FormData($(".avatar-file")[0]);
        $.ajax({
            type : "POST",
            url : "/pet/submit/",
            data : formdata,
            processData : false,
            contentType : false,
            success : function(data) {
                
            }
        }) 
    });
    
    var formShow = function() {
        $(".page9 .form").show();
        n = Math.ceil(( Math.random() * 9 + 1 ) % 8 + 1 );
        $(".result").css("background-image","url('/static/image/result"+n+".png')");
        $(".result").show();
    };
    var shareShow = function() {
        $(".share").show();  
    };
    var swiper = new Swiper('.swiper-container', {
        direction:'vertical',
        speed:500,
        onInit: function() {
            clearAnimation(page1Show);
        },
        onSlideChangeEnd: function(swiper){
            if(swiper.activeIndex == 0) {
                clearAnimation(page1Show);
            }
            else if(swiper.activeIndex == 1) {
                clearAnimation(page2Show);
            }
            else if(swiper.activeIndex == 2) {
                clearAnimation(page3Show);
            }
            else if(swiper.activeIndex == 3) {
                clearAnimation(page4Show);
            }
            else if(swiper.activeIndex == 4) {
                clearAnimation(page5Show);
            }
            else if(swiper.activeIndex == 5) {
                clearAnimation(page6Show);
            }
        }
    });
}
