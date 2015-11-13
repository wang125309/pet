require("../../bower_components/zepto/zepto.js");
require("../../bower_components/zeptojs/src/touch.js");
require("../../bower_components/velocity/velocity.min.js");
require("../../bower_components/swiper/dist/js/swiper.min.js");
require("../js/share.min.js");
require("./getParams.js");
window.onload = function(){
    var isself = 0;
    user = getQueryParams("userId");

    $(".like").on("tap",function(){
        flag = false;
        if (localStorage['like']) {
            likes = localStorage['like'].split(",");
        }
        else {
            likes = [];
        }
        for (i in likes){
            if(user) {
                if(likes[i] == user) {
                    flag = true;
                    break;
                }
            }
            else {
                if(likes[i] == 'me') {
                    flag = true;
                    break;
                }
            }
        }
        if(!flag) {
            if(user) {
                $.get("/pet/like/?uid="+user,function(data){
                    $(".share .like .count").html(data.like);
                    if(localStorage['like']) {
                        localStorage['like'] += ','+user;
                    }
                    else {
                        localStorage['like'] = "";
                        localStorage['like'] += user;
                    }
                });
            }
            else {
                $.get("/pet/like/?date="+localStorage['date'],function(data){
                    $(".share .like .count").html(data.like);
                    if(localStorage['like']) {
                        localStorage['like'] += ',me';
                    }
                    else {
                        localStorage['like'] = "";
                        localStorage['like'] += 'me';
                    }
                });
            }
        }
        else {
            alert("您已经投过票了");
        }
    });
    w = $(window).width();
    h = $(window).height();
    $(document).on("touchmove",function(){
        return false;
    });
    var on = false;
    $("#audio").attr({"src":"/static/image/background.mp3"});
    $("#audio")[0].play();
    $(".music").on("tap",function(){
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
    if(localStorage['date']) {
        $.get("/pet/getUserInformation/?date="+localStorage['date'],function(data){
            if(data.desc == 'error') {
                localStorage['date'] = '';
            }
            window.shareUserId = data.id;
            $.post("/portal/wxconfig/",{
                "url":location.href
            },function(data){
                wx.config(data);
                if(window.shareUserId != undefined && window.shareUserId != -1) {
                    link = "http://11.yanyr.com?userId="+window.shareUserId;
                }
                else {
                    link = "http://11.yanyr.com";
                }
                var shareJson = {
                    link:link,
                    imgUrl:"http://11.yanyr.com/static/image/share-image.jpg",
                    title:"逃离“双十一”的最佳方式:送你一只拉布拉多宝宝",
                    desc:"双11来了，大家怎么过节？剁手的剁手，看晚会的看晚会，我就要小白养宠的那只狗狗！！"
                };
                wx.ready(function(){
                    wx.onMenuShareTimeline(shareJson);
                    wx.onMenuShareAppMessage(shareJson);
                });
                wx.error(function(res){
                    $.get("/portal/update_access_token/",function(data){
                        $.post("/portal/wxconfig/",{
                            "url":location.href
                        },function(data){
                            wx.config(data);
                            wx.ready(function(){
                                wx.onMenuShareTimeline(shareJson);
                                wx.onMenuShareAppMessage(shareJson);
                            });
                        });
                    });
                });
            });
        });

    }
    window.shareUserId = '';
    $(".page5 .submit").on('tap',function(){
        alert("活动已结束");
        /*
        if(!localStorage['date']) {
            if($("#name").val().length > 0 && $("#mobile").val().length == 11 && $("#file").val().length) {
                localStorage['date'] = Date.parse(new Date()) + Math.random() * 1000;
                $("#date").val(localStorage['date']);
                var formdata = new FormData($("#form")[0]);
                $.ajax({
                    type : "POST",
                    url : "/pet/submit/",
                    data : formdata,
                    processData : false,
                    contentType : false,
                    success : function(data) {
                        if(data.status == 'success') {
                            $.get("/pet/getUserInformation/?date="+localStorage['date'],function(data){
                                $(".share .border-avatar .avatar").css({"background-image":"url('"+data.avatar+"')"});
                                $(".share #desc").html(data.desc);
                                $(".share .like .count").html(data.like);
                                $(".share .rank .count").html(data.rank);
                                window.shareUserId = data.id;
                                $.post("/portal/wxconfig/",{
                                    "url":location.href
                                },function(data){
                                    wx.config(data);
                                    if(window.shareUserId != undefined) {
                                        link = "http://11.yanyr.com?userId="+window.shareUserId;
                                    }
                                    else {
                                        link = "http://11.yanyr.com";
                                    }
                                    var shareJson = {
                                        link:link,
                                        imgUrl:"http://11.yanyr.com/static/image/share-image.jpg",
                                        title:"逃离“双十一”的最佳方式:送你一只拉布拉多宝宝",
                                        desc:"双11来了，大家怎么过节？剁手的剁手，看晚会的看晚会，我就要小白养宠的那只狗狗！！"
                                    };
                                    wx.ready(function(){
                                        wx.onMenuShareTimeline(shareJson);
                                        wx.onMenuShareAppMessage(shareJson);
                                    });
                                    wx.error(function(res){
                                        $.get("/portal/update_access_token/",function(data){
                                            $.post("/portal/wxconfig/",{
                                                "url":location.href
                                            },function(data){
                                                wx.config(data);
                                                wx.ready(function(){
                                                    wx.onMenuShareTimeline(shareJson);
                                                    wx.onMenuShareAppMessage(shareJson);
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                            $(".share").show();

                        }
                        else {
                            alert(data.reason);
                        }
                    },
                    error: function() {
                        alert("后台异常");
                    }
                });

            }
            else {
                alert("名字是必填项，手机号要保证11位哦，您还要上传您的照片哦");
            }
        }
        else {
            alert('您已经参加过活动了');
        }*/
    });
    $(".go").on('tap',function(){
        $(".share").css({
            "display":"none"
        });
        $(".swiper-container").show();
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
                if(localStorage['date']) {
                    $(".share").show();
                    $.get("/pet/getUserInformation/?date="+localStorage['date'],function(data){
                        $(".share .border-avatar .avatar").css({"background-image":"url('"+data.avatar+"')"});
                        $(".share #desc").html(data.desc);
                        $(".share .like .count").html(data.like);
                        $(".share .rank .count").html(data.rank);
                    });
                }
            }
        }
    });
    });
    $(".share-btn").on('tap',function(){
        $(".share-background").show(); 
    });
    $(".share-background").on('tap',function(){
        $(".share-background").css("display","none");    
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
    $(".page4 .submit").on('tap',function(){
        swiper.slideTo(4);
    });
    if (user) {
        $(".share .title-share").show();
        $.get("/pet/getUserInformation/?uid="+user,function(data){
            $(".share .border-avatar .avatar").css({"background-image":"url('"+data.avatar+"')"});
            $(".share #desc").html(data.desc);
            $(".share .like .count").html(data.like);
            $(".share .rank .count").html(data.rank);
            $(".share").show();
        });
    }
    else {
        $(".swiper-container").show();
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
                    if(localStorage['date']) {
                        $(".share").show();
                        $.get("/pet/getUserInformation/?date="+localStorage['date'],function(data){
                            $(".share .border-avatar .avatar").css({"background-image":"url('"+data.avatar+"')"});
                            $(".share #desc").html(data.desc);
                            $(".share .like .count").html(data.like);
                            $(".share .rank .count").html(data.rank);
                        });
                    }
                }
            }
        });
    }
}
