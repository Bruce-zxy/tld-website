var weather_icons = ["qing", "duoyun", "yin", "zhenyu", "leidian", "bingbao", "xiaoxue", "xiaoyu", "dayu", "dayu", "dayu", "dayu", "dayu", "zhenxue", "xiaoxue", "daxue", "daxue", "daxue", "wu", "bingbao", "yangsha", "dayu", "dayu", "dayu", "dayu", "dayu", "daxue", "daxue", "daxue", "yangsha", "yangsha", "yangsha", "mai"];

function toLoadImgsLazily(selector) {
	function loadImg(el) {
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
			DIV_BASE.append(DIV_CUBE);
		}
		DIV.appendChild(DIV_BASE);
		el.appendChild(DIV);
		return DIV;
	}
    var imgs_container = document.querySelectorAll(selector + ' .lazy-load-img');
    Array.prototype.slice.call(imgs_container).forEach(function(img) {
        // 所有部分缓加载
        loadImg(img);
	})
}

function toSliceDomContent(limit, dom) {
	var content = sessionStorage.getItem("greeting") || dom.html();
	content = content.replace('...', '');
	if (content.length > limit) {
		dom.html(content.slice(0, limit) + "...");
	} else {
		dom.html(content.slice(0, limit));
	}
}

function onWindowResizing(e) {
	var left_width  = e.data.leftWidth;
	var right_width = e.data.rightWidth;
	var dom_content = e.data.dom;
	var windowWidth = $(window).width();
	var font_size   = getComputedStyle(dom_content[0]).fontSize.slice(0, -2);
	toSliceDomContent(Math.floor((windowWidth - (left_width + right_width + 80)) / font_size), dom_content)
}

$(function() {
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
	
	// Emmet syntax: div.lazy-load-img>img.placeholder-img[data-src=""], 同时去掉src属性
	toLoadImgsLazily('body');

	// 限制greeting的字数，多余的用溢出省略符代替
	var greeting_content    = $('.greeting .greeting-content');
	sessionStorage.greeting = greeting_content.html();
	var header_left_width   = $(".header .left .weather").width() + $(".header .left .sns").width();
	var header_right_width  = $(".header .right").width();
	var resizing_data       = {
        leftWidth: header_left_width,
        rightWidth: header_right_width, 
        dom: greeting_content
    }
    onWindowResizing({ data: resizing_data });
    $(window).on("resize", resizing_data, onWindowResizing);


})


