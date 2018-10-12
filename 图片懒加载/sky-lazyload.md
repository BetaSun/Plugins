# 参数说明
* container
> scroll事件监听对象,默认为window
* attr
> 图片实际地址存放的自定义属性名，默认为data-src，确保通过该属性获取到的元素只限于需要懒加载的图片
* threshold
> 视窗的扩展大小，即图片距离视窗多少距离就开始加载，默认为0
* delay
> 滚动事件延时多少时间执行，默认为200，单位ms

# 原理说明
* 将图片的实际地址存放在data-src属性中
* src属性放loading.gif图片
* 当图片进入视窗以后就将data-src中的值取出放入src中