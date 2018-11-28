$(function () {
    // 美食轮播
    $.fn.rvc = function(obj) {
        return this.each(function() {
            var self = $(this);
            var startX = 0
              , startY = 0;
            var temPos;
            var iCurr = 0;
            var oPosition = {};
            var ww;
            var sw;
            var rvcw = self.children('.rvc-wrapper');
            var rvcw_ul = rvcw.find('ul');
            var clone1 = rvcw.find('li').clone();
            var clone2 = rvcw.find('li').clone();
            rvcw_ul.append(clone1);
            rvcw_ul.append(clone2);
            var rvcw_li = rvcw.find('li');
            var liw;
            var liNum = obj.liNum;
            var plr = obj.plr;
            var sb = obj.spaceBetween;
            var time = obj.time;
            var size = rvcw_li.length;
            var rvcww;
            var prv = self.find(obj.prv);
            var next = self.find(obj.next);
            var iL;
            var iCurr = size / 3;
            var onload = true;
            var iTime;
            var st;
            var next_b = false;
            var prv_b = false;
            var next_num = true;
            var prv_num = true;
            var system = {
                win: false,
                mac: false,
                xll: false
            };
            var p = navigator.platform;
            system.win = p.indexOf("Win") == 0;
            system.mac = p.indexOf("Mac") == 0;
            system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
            $(window).on('load resize', function() {
                ww = $(window).width();
                self.css('width', ww - plr * 2);
                sw = self.width();
                rvcw.css('width', sw - sb * 2);
                rvcww = rvcw.width();
                prv.width(sb)
                next.width(sb)
                if (ww >= 1024) {
                    liw = (rvcww - (obj.spaceBetween * (liNum + 1))) / liNum
                }
                if (ww >= 768 && ww < 1024) {
                    liw = (rvcww - (obj.spaceBetween * (3))) / 2
                }
                if (ww < 768) {
                    liw = (rvcww - (obj.spaceBetween * (2))) / 1
                }
                rvcw_li.css({
                    'width': liw,
                    'margin-left': obj.spaceBetween
                });
                rvcw_ul.css('width', (liw + sb) * size);
                if (onload) {
                    rvcw_ul.css('left', -(liw + sb) * (size / 3));
                    onload = false;
                }
            })
            function move_left() {
                next_b = true;
                rvcw_ul.stop().animate({
                    left: -iCurr * (liw + sb)
                }, time, function() {
                    iCurr++;
                    next_b = false;
                    if (iCurr == (size / 3) * 2 + 1) {
                        rvcw_ul.css({
                            left: -(liw + sb) * (size / 3)
                        });
                        iCurr = size / 3 + 1;
                    }
                });
            }
            $(next).on('click', function() {
                prv_num = true;
                if (next_num) {
                    if (iCurr == size / 3) {
                        iCurr++;
                    } else {
                        iCurr += 2;
                    }
                    next_num = false;
                } else {}
                if (next_b) {
                    return;
                } else {
                    move_left();
                }
            })
            function move_right() {
                prv_b = true;
                rvcw_ul.stop().animate({
                    left: -iCurr * (liw + sb)
                }, time, function() {
                    iCurr--;
                    prv_b = false;
                    if (iCurr == -1) {
                        rvcw_ul.css({
                            left: -(liw + sb) * (size / 3)
                        });
                        iCurr = size / 3 - 1;
                    }
                });
            }
            $(prv).on('click', function() {
                next_num = true;
                if (prv_num) {
                    if (iCurr == size / 3) {
                        iCurr--;
                    } else {
                        iCurr -= 2;
                    }
                    prv_num = false;
                } else {}
                if (prv_b) {
                    return;
                } else {
                    move_right();
                }
            })
            function touchPos(e) {
                var touches = e.changedTouches, l = touches.length, touch, tagX, tagY;
                for (var i = 0; i < l; i++) {
                    touch = touches[i];
                    tagX = touch.clientX;
                    tagY = touch.clientY;
                }
                oPosition.x = tagX;
                oPosition.y = tagY;
                return oPosition;
            }
            function touchStartFunc(e) {
                touchPos(e);
                startX = oPosition.x;
                startY = oPosition.y;
                temPos = rvcw_ul.position().left;
                st = parseInt(rvcw_ul.css('left'));
            }
            function touchMoveFunc(e) {
                touchPos(e);
                var moveX = oPosition.x - startX;
                var moveY = oPosition.y - startY;
                var stm = st + moveX;
                rvcw_ul.css('left', stm);
            }
            function touchEndFunc(e) {
                touchPos(e);
                var moveX = oPosition.x - startX;
                var moveY = oPosition.y - startY;
                if (Math.abs(moveY) < Math.abs(moveX)) {
                    if (moveX > 0) {
                        move_right();
                    } else {
                        move_left();
                    }
                }
            }
            if (system.win || system.mac || system.xll) {
                rvcw_ul.mousedown(function(event) {
                    var event = event || window.event;
                    var disX = event.clientX;
                    var ol = parseInt(rvcw_ul.css('left'));
                    $(document).mousemove(function(event) {
                        var event = event || window.event;
                        iL = event.clientX - disX;
                        iul = iL + ol;
                        rvcw_ul.css('left', iul);
                        return false
                    })
                    $(document).mouseup(function() {
                        $(document).unbind('mousemove');
                        $(document).unbind('mouseup');
                        if (iL > 0) {
                            move_right();
                        } else {
                            move_left();
                        }
                    })
                    return false
                })
            } else {
                rvcw_ul.get(0).addEventListener('touchstart', touchStartFunc, false);
                rvcw_ul.get(0).addEventListener('touchend', touchEndFunc, false);
                rvcw_ul.get(0).addEventListener('touchmove', touchMoveFunc, false);
            }
        })
    }
    $('#rvc2').rvc({
        liNum: 4,//2~5之间的整数
        spaceBetween: 15,//li项之间的距离
        plr: 20,//当屏幕小于1024时，rvc的padding-left，padding-right值
        time: 400,//动画时间
        prv: '.rvc-prv',//前一个按钮
        next: '.rvc-next'//下一个按钮
    })

    // 历史文化轮播图
    var slider = $(".shutter");
    if (isDomExist(slider)) {
        slider.shutter({
            shutterW: 360, // 容器宽度
            shutterH: 220, // 容器高度
            isAutoPlay: true, // 是否自动播放
            playInterval: 3000, // 自动播放时间
            curDisplay: 1, // 当前显示页
            fullPage: false // 是否全屏展示
        });
    }

    // 面包屑导航
    $("#breadcrumbs").rcrumbs();

    var pos = 0;
    var totalSlides = $('#slider-wrap ul li').length;
    var sliderWidth = $('#slider-wrap').width();

    function slideLeft() {
        pos--;
        if (pos == -1) {
            pos = totalSlides - 1;
        }
        $('#slider-wrap ul#slider').css('left', -(sliderWidth * pos));
        // countSlides();
        pagination();
    }

    function slideRight() {
        pos++;
        if (pos == totalSlides) {
            pos = 0;
        }
        $('#slider-wrap ul#slider').css('left', -(sliderWidth * pos));
        // countSlides();
        pagination();
    }

    function countSlides() {
        $('#counter').html(pos + 1 + ' / ' + totalSlides);
    }

    function pagination() {
        $('#pagination-wrap ul li').removeClass('active');
        $('#pagination-wrap ul li:eq(' + pos + ')').addClass('active');
    }
    $('#slider-wrap ul#slider').width(sliderWidth * totalSlides);
    $('#next').click(function() {
        slideRight();
    });
    $('#previous').click(function() {
        slideLeft();
    });
    var autoSlider = setInterval(slideRight, 3000);
    $.each($('#slider-wrap ul li'), function() {
        var c = $(this).attr("data-image");
        $(this).css("background-image", "url('"+c+"')");
        $(this).css("width", $("#slider-wrap").width())
        var li = document.createElement('li');
        $('#pagination-wrap ul').append(li);
        $('#pagination-wrap').css("margin-top", $("#slider-wrap").height() - $('#pagination-wrap').height() * 2)
    });
    // countSlides();
    pagination();
    $('#slider-wrap').hover(function() {
        $(this).addClass('active');
        clearInterval(autoSlider);
    }, function() {
        $(this).removeClass('active');
        autoSlider = setInterval(slideRight, 3000);
    });


})

