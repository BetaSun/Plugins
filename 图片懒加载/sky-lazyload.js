/**
 * Version: 1.0.0
 * Author: BetaSun
 * Compatibility：IE 8+
 * Description: 图片懒加载
 */
!(function (window, document) {
    /**
     * container：触发图片加载事件所对应的容器
     * threshold：图片距离可视区域多少距离开始加载，默认0
     * attr：存放实际地址的自定义属性名，默认data-src
     * delay: 延时，默认250ms
     */
    var sky = window.sky || {};

    sky.lazyload = function (options) {
        options = options || {};
        var attr = options.attr || 'data-src';
        var threshold = options.threshold ? parseInt(options.threshold) : 0;
        var container = options.container || window;
        var delay = options.delay || 200;
        var images = Array.prototype.slice.call(document.querySelectorAll('[' + attr + ']'), 0);
        var pollTimer = null;

        /**
         * 判断元素是否在可视区域内
         * @param {DOM} dom 需要判断的dom元素
         * @param {Number} threshold 区域的扩展距离
         * @return {Boolean} true在，false不在
         */
        var _inView = function (dom) {
            var coordinate = dom.getBoundingClientRect();
            return (coordinate.bottom >= -threshold && coordinate.top <= document.documentElement.clientHeight + threshold) && (coordinate.right >= -threshold && coordinate.left <= document.documentElement.clientWidth + threshold);
        };

        /**
         * 将在可视区域中的图片的地址替换为真实地址
         */
        var _pollImages = function () {
            var list = images;
            var item;
            for (var i=list.length-1; i>=0; i--) {
                item = list[i];
                if (_inView(item)) {
                    item.src = item.getAttribute(attr);
                    list.splice(i, 1);
                }
            }
        };

        /**
         * 延时程序
         */
        var _throttle = function () {
            clearTimeout(pollTimer);
            pollTimer = setTimeout(_pollImages, delay);
        };

        _pollImages();

        if (document.addEventListener) {
            container.addEventListener('scroll', _throttle, false);
            container.addEventListener('resize', _throttle, false);
		} else {
			container.attachEvent('onscroll', _throttle);
			container.attachEvent('resize', _throttle);
        }
    };

    window.sky = sky;
})(window, document);