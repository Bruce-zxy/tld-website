function isInSight(el) {
	// 元素的高度
	var ele_height = el.getBoundingClientRect().height;
	// 元素相对文档的Y轴偏移量
    var ele_offset_top = el.offsetTop;
    // 视口的高度
    var win_height = window.innerHeight;
    // 文档当前的高度，即滑动的高度
    var win_offset_top = window.pageYOffset;
    // 如果只考虑向下滚动加载
    return ele_offset_top + ele_height >= (win_offset_top - 100) && ele_offset_top <= (win_offset_top + win_height + 100);
}

function loadInSightImg(el) {
	var img_dom = el.children[0];
    if(img_dom.classList.contains("placeholder-img")) {
        img_dom.src = img_dom.getAttribute("data-src");
    }
}

function loadOutSightImg(el) {
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

function lazyLoadImgs(selector) {
    var imgs_container = document.querySelectorAll(selector + ' .lazy-load-img');
    Array.from(imgs_container).forEach(img => {
    	// 可见部分自然加载，不可见部分缓加载
        // if(isInSight(img)) {
        //     loadInSightImg(img);
        // } else {
        // 	loadOutSightImg(img);
        // }

        // 所有部分缓加载
        loadOutSightImg(img);
	})
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

// <div class="lazy-load-img">
//     <img class="placeholder-img" data-src="./imgs/banner_01.jpg" alt="">
// </div>
lazyLoadImgs('body');



var weather_icons = ["qing", "duoyun", "yin", "zhenyu", "leidian", "bingbao", "xiaoxue", "xiaoyu", "dayu", "dayu", "dayu", "dayu", "dayu", "zhenxue", "xiaoxue", "daxue", "daxue", "daxue", "wu", "bingbao", "yangsha", "dayu", "dayu", "dayu", "dayu", "dayu", "daxue", "daxue", "daxue", "yangsha", "yangsha", "yangsha", "mai"];

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



