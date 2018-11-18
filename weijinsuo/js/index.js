// ajax请求轮播图
$(function () {
    // 动态轮播图
    banner();
    initMobileTab();
    $('[data-toggle="tooltip"]').tooltip();
})
// 轮播图函数
var banner = function () {
    // 数据缓存
    var getDate = function (callback) {
        if (window.data) {
            callback && callback(window.data);
        } else {
            $.ajax({
                type: "get",
                url: "js/data.json",
                // data: "data",
                // 知道文件类型 设置 以便强制转化
                dataType: "json",
                success: function (data) {
                    window.data = data;
                    callback && callback(window.data);
                }
            });

        }
    }
    // 回调函数 数据的动态渲染
    var render = function () {
        getDate(function (data) {
            var isMobile = $(window).width() < 768 ? true : false;
            var pointHtml = template('indicatorsTamplate', {
                list: data
            });
            var carouselTamplate = template('carouselTamplate', {
                list: data,
                isMobile: isMobile
            });
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(carouselTamplate);
        })
    }
    // 测试功能 尺寸发生变化事件
    $(window).on('resize', function () {
        render();
    }).trigger('resize');
    /*通过js主动触发某个事件*/

    //  移动端手势事件
    var startX = 0;
    var distanceX = 0;
    var isMove = false;

    $('.wjs_banner').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend', function (e) {
        if (isMove && Math.abs(distanceX) > 50) {
            if (distanceX < 0) {
                console.log('prev');
                $('.carousel').carousel('next');
            } else {
                console.log('next');
                $('.carousel').carousel('prev');
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;
    })

}
// 产品滚动导航栏
var initMobileTab = function () {
    var nabTabs = $('.nav-tabs-parent .nav-tabs');
    var width = 0;
    nabTabs.find('li').each(function (i, e) {
        var currLi = $(this);

        //  width()  内容
        //  innerWidth() 内容+内边距
        //  outerWidth() 内容+内边距+边框
        //  outerWidth(true) 内容+内边距+边框+外边距
        width += currLi.outerWidth(true);
    })
    console.log(width);
    nabTabs.width(width);


    var myScroll = new IScroll($('.nav-tabs-parent')[0], {
        scrollX: true,
        scrollY: false,
        click: true
    });

}