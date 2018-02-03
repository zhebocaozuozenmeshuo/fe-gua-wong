// 1.点击展开的菜单
// 1. 写出html 
// 2. 给按钮绑定事件
// 3. 在点击按钮的时候切换内容的显示
// var bindEventToggle = function() {
//     var b = e('.gua-menu-toggle')
//     bindEvent(b, 'click', function(){
//         console.log('click button')
//         var c = e('.gua-menu-content')
//         toggleClass(c, 'gua-hide')
//     })
// }

// var bindEventsToggle = function() {
//     var selector = '.gua-menu-toggle'
//     bindAll(selector, 'click', function(event){
//         var p = event.target.parentElement
//         var c = find(p, '.gua-menu-content')
//         toggleClass(c, 'gua-hide')
//     })
// }

// bindEventsToggle() 

// 2. 鼠标滑过的菜单选择效果

var bindEventItems = function() {
    var selector = '.gua-item'
    bindAll(selector, 'mouseenter', function(event){
        log('mouse over')
        var item = event.target
        removeClassAll('gua-highlight')
        if(item.classList.contains('gua-item')) {
            item.classList.add('gua-highlight')
        }
    })
    
}
bindEventItems()

// 3. 轮播图
// 写个div 里面有很多图
// 只显示一个图片
// 加一个按钮
bindEventSlide = function() {
    var selector = '.gua-slide-button'
    bindAll(selector, 'click', function() {
        // 找到 slide div
        var slide = event.target.parentElement
        // 得到图片总数和当前图片下标
        var numberOfImgs = parseInt(slide.dataset.imgs) 
        var activeIndex = parseInt(slide.dataset.active)
        log('numberOfImgs', numberOfImgs, 'activeIndex', activeIndex)
        // 求出下一张图片的 id
        var nextIndex = (activeIndex + 1) % numberOfImgs
        var nextSelector = `#id-guaimage-${nextIndex}`
        log('nextSelctor', nextSelector)
        // 设置父节点的 data-active
        slide.dataset.active = nextIndex
        // 删除当前图片的 class 给下一张图片加上 active
        var className = 'active'
        removeClassAll(className)
        var img = e(nextSelector)
        img.classList.add(className)
    })
}
bindEventSlide()