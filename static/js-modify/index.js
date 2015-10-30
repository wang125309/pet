require("../../bower_components/zepto/zepto.js");
require("../../bower_components/zeptojs/src/touch.js");
require("../../bower_components/velocity/velocity.min.js");
require("../../bower_components/swiper/dist/js/swiper.min.js");
require("../js/share.min.js");

window.onload = function(){

    w = $(window).width();
    h = $(window).height();
    $(document).on("touchmove",function(){
        return false;
    });
    on = false;
    $("#audio").attr({"src":"/static/image/background.mp3"});
    $("#audio")[0].play();
    $(".music").on("click",function(){
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
    });
    var clearAnimation = function(fun) {
        $(".title").hide();
        $(".sound").hide();
        $(".sub-title").hide();
        $(".main").hide();
        $(".desc").hide();
        fun();
    };
    var firstShow = function() {
        $(".page-first .title").show();
        $(".page-first .sound").show();
    };
    var page1Show = function() {
        $(".page1 .title").show();
    };
    var page2Show = function() {
        $(".page2 .title").show();
        $(".page2 .sub-title").show();
    };
    var page3Show = function() {
        $(".page3 .title").show();
        $(".page3 .sub-title").show();
    };
    var page3Show = function() {
        $(".page3 .title").show();
        $(".page3 .sub-title").show();
    };
    var page4Show = function() {
        $(".page4 .title").show();
        $(".page4 .sub-title").show();
    };
    var page5Show = function() {
        $(".page5 .title").show();
        $(".page5 .sub-title").show();
    };
    var page6Show = function() {
        $(".page6 .title").show();
        $(".page6 .sub-title").show();
    };
    var page7Show = function() {
        $(".page7 .title").show();
        $(".page7 .sub-title").show();
        $(".page7 .main").show();
    };
    var page8Show = function() {
        $(".page8 .title").show();
        $(".page8 .sub-title").show();
        $(".page8 .main").show();
    };
    var page9Show = function() {
        $(".page9 .title").show();
        $(".page9 .sub-title").show();
        $(".page9 .main").show();
        $(".page9 .desc").show();
    };
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
            clearAnimation(firstShow);
        },
        onSlideChangeEnd: function(swiper){
            if(swiper.activeIndex == 0) {
                clearAnimation(firstShow);
            }
            else if(swiper.activeIndex == 1) {
                clearAnimation(page1Show);
            }
            else if(swiper.activeIndex == 2) {
                clearAnimation(page2Show);
            }
            else if(swiper.activeIndex == 3) {
                clearAnimation(page3Show);
            }
            else if(swiper.activeIndex == 4) {
                clearAnimation(page4Show);
            }
            else if(swiper.activeIndex == 5) {
                clearAnimation(page5Show);
            }
            else if(swiper.activeIndex == 6) {
                clearAnimation(page6Show);
            }
            else if(swiper.activeIndex == 7) {
                clearAnimation(page7Show);
            }
            else if(swiper.activeIndex == 8) {
                clearAnimation(page8Show);
            }
            else if(swiper.activeIndex == 9) {
                $("#audio")[0].pause();
                clearAnimation(page9Show);
                $(".page9 .main").on("touchstart",function(e){
                    e.preventDefault();
                    time = (new Date()).valueOf();
                    $(".page9 .main-press").show();
                    $(".page9 .tap-bigger").show();
                });
                $(".page9 .main").on("touchend",function(e){
                    e.preventDefault();
                    interval = (new Date()).valueOf() - time;
                    $(".page9 .main-press").hide();
                    $(".page9 .tap-bigger").hide();
                    if ( interval > 1500 ) {
                        clearAnimation(formShow);

                    }
                });
                $(".submit").on("tap",function(){
                    if($("#mobile").val().length != 11) {
                        alert("手机号格式有问题，请修改后再提交");
                    }
                    else {
                        $.post("/wx/football/submit/",{
                            "name":$("#name").val(),
                            "phone":$("#mobile").val()
                        },function(data){
                            if (data.status == 'success') {
                                shareShow();
                            }
                            else {
                                alert("您已经报过名了")
                            }
                        }); 
                    }
                });
            }
        }
    });
}
