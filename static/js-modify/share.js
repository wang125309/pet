$(function(){
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
            title:"逃离双11的最佳方式：领养一只拉布拉多宝宝",
            desc:"逃离双11的最佳方式：领养一只拉布拉多宝宝"
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
