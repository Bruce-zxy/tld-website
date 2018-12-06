var weather_icons = ["qing", "duoyun", "yin", "zhenyu", "leidian", "bingbao", "xiaoxue", "xiaoyu", "dayu", "dayu", "dayu", "dayu", "dayu", "zhenxue", "xiaoxue", "daxue", "daxue", "daxue", "wu", "bingbao", "yangsha", "dayu", "dayu", "dayu", "dayu", "dayu", "daxue", "daxue", "daxue", "yangsha", "yangsha", "yangsha", "mai"];

function toLoadImgsLazily(selector, fn) {
	function loadImg(el, i) {
		var img_dom = el.children[0];
	    if(img_dom.classList.contains("placeholder-img")) {
	    	// 可使用CSS3占位图
	    	var div_loader = createLoadingDiv(el)
	    	// 或使用JPG、GIF占位图
	    	// img_dom.src = "http://dummyimage.com/800x600/4d494d/686a82.gif&text=placeholder+image";
	        var source = img_dom.getAttribute("data-src");
	        var img = new Image();
	        img.src = source;
	        img.onload = function() {
	        	if (!!el.querySelectorAll(".placeholder-img").length) el.removeChild(img_dom);
	        	if (!!el.querySelectorAll(".lazy-load-container").length) el.removeChild(div_loader);
	        	el.appendChild(img);
	        	fn(img, i);
	        }
	    }
	}
	function createLoadingDiv(el) {
		var DIV = document.createElement("div");
		DIV.className = "lazy-load-container";
		var DIV_BASE = document.createElement("div");
		DIV_BASE.className = "lazy-load-base";
		for (var i = 0; i < 9; i++) {
			var DIV_CUBE = document.createElement("div");
			DIV_CUBE.className = "lazy-load-cube";
			DIV_BASE.appendChild(DIV_CUBE);
		}
		DIV.appendChild(DIV_BASE);
		el.appendChild(DIV);
		return DIV;
	}
    var imgs_container = document.querySelectorAll(selector + ' .lazy-load-img');
    Array.prototype.slice.call(imgs_container).forEach(function(img, i) {
        // 所有部分缓加载
        loadImg(img, i);
	})
}

function toSliceDomContent(limit, dom) {
	var content = dom.attr("data-content");
	content = content.replace("...", "");
	if (content.length > limit) {
		dom.html(content.slice(0, limit) + "...");
	} else {
		dom.html(content.slice(0, limit));
	}
}

function onWindowResizing(e) {
	var left_width  = $(".header .left .weather").width() + $(".header .left .sns").width();
	var right_width = $(".header .right").width();
	var dom_content = $(".greeting .greeting-content");
	var windowWidth = $(window).width();
	var font_size   = getComputedStyle(dom_content[0]).fontSize.slice(0, -2);
	if (windowWidth <= 640) {
		$("body").html("请访问移动端页面以获得更好的用户体验！");
		$(window).off("resize").on("resize", function () {
			if ($(window).width() > 640) window.location.reload();
		});
		window.location.href = './mobile/';
	} else {
		toSliceDomContent(Math.floor((windowWidth - (left_width + right_width + 80)) / font_size), dom_content)
	}
}
function isDomExist($dom) {
    return !!$dom.length;
}

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

$(function() {

	// Emmet语法:div.lazy-load-img>img.placeholder-img[data-src=""],同时去掉src属性
	toLoadImgsLazily('body', function(img, i) {
		$($(".lazy-load-img img")[i]).css("margin-left", -img.width/2);
		$($(".lazy-load-img img")[i]).css("margin-top", -img.height/2);
	});

	// 限制greeting的字数，多余的用溢出省略符代替
    onWindowResizing();
    $(window).on("resize", onWindowResizing);

    // 滚动条
    $("body").mCustomScrollbar({
    	scrollInertia: 100,
    	autoDraggerLength: false, 
    	autoHideScrollbar: true, 
    	scrollEasing: "easeOut"
    });

    if (!!$(".search-icon").length) {
    	$(".search-icon").click(function (e) {
	        $(".search-mask").removeClass("active").addClass("active");
	    })
    }
    if (!!$(".search-close").length) {
    	$(".search-close").click(function (e) {
    	    $(".search-mask").removeClass("active");
    	})
    }



    // 天气
	// $.ajax({
	//     type: 'get',
	//     url: 'http://api.k780.com/?app=weather.today&weaid=1122&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json&jsoncallback=data',
	//     dataType: 'jsonp',
	//     jsonp: 'callback',
	//     jsonpCallback: 'data',
	//     success: function(data) {
	//     	let result = data.result;
	//         $('.weather .temperature').html(result.temperature_curr);
	//         $('.weather svg use').attr("xlink:href", "#weather-" + weather_icons[result.weather_iconid]);
	//     },
	//     error: function(data, err) {
	//         console.error("AJAX Get An Error: " + err.toUpperCase());
	//     }
	// });

})


