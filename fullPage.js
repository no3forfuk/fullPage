(function() {


    function FullPage(option) {

        this.isVertical = 'true';
        extend(this, option);
        //动态创建ol
      	
        this.resetStyle();
        
    }

    function scroll() {
        return {
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
        }
    }

    FullPage.prototype = {
            resetStyle: function() {
                if (!this.isVertical) {
                    var body = document.querySelector('body'),
                        html = document.querySelector('html');
                    html.style.width = '100%';
                    html.style.height = '100%';
                    body.style.width = '100%';
                    body.style.height = '100%';
                    var _width = document.body.clientWidth,
                        _height = document.body.clientHeight;
                    var _container = this.getContainer(),
                        _ul = this.getTarget();
                    var i = 0,
                        l = _ul.children.length;
                    _container.style.width = _width + 'px';
                    _container.style.height = '100%';
                    _container.style.position = 'relative' ;
                    _container.style.overflow = 'hidden';
                    _ul.style.width = l * _width + 'px';
                    _ul.style.height = '100%';
                    _ul.style.position = 'absolute';
                    _ul.style.top = 0 ;
                    _ul.style.transition = 'all 0.8s'
                    for (; i < l; i++) {
                        _ul.children[i].style.float = 'left';
                        _ul.children[i].style.width = _width + 'px';
                        _ul.children[i].style.height = '100%';
                    }
                    this.addClickEvent2();
                }else {
                	var body = document.querySelector('body'),
                        html = document.querySelector('html');
                    html.style.width = '100%';
                    html.style.height = '100%';
                    body.style.width = '100%';
                    body.style.height = '100%';
                    var _width = document.body.clientWidth,
                        _height = document.body.clientHeight;
                    var _container = this.getContainer(),
                        _ul = this.getTarget();
                    var i = 0,
                        l = _ul.children.length;
                    _container.style.width = '100%';
                    _container.style.height = '100%';
                    _ul.style.width = '100%';

                    for (; i < l; i++) {
                        _ul.children[i].style.width = '100%';
                        _ul.children[i].style.height = _height + 'px';
                    }
                    this.addClickEvent();
                }

            },
            getTarget: function() {
                return document.querySelector(this.target);
            },
            getContainer: function() {
                return document.querySelector(this.container);
            },
            createOl: function() {
                //拿到dom元素
                var _container = this.getContainer(),
                    _ul = this.getTarget(),
                    _li = _ul.children,
                    _ol = document.createElement('ol');
                var i = 0,
                    l = _li.length;
                for (; i < l; i++) {
                    var li = document.createElement('li');
                    //设置配置颜色
                    _li[i].style.backgroundColor = this.colors[i];
                    li.style.backgroundColor = this.colors[i];
                    _ol.appendChild(li);
                }
                _container.appendChild(_ol);
                return _ol;
            },
            addClickEvent: function() {
                var self = this;
                var ol = this.createOl(),
                    ul = this.getTarget(),
                    ullis = ul.children,
                    lis = ol.children;
                var i = 0,
                    l = lis.length;
                var timer = null;

                for (; i < l; i++) {
                    lis[i].index = i; //分别保存索引i的值到每一个li上
                    lis[i].addEventListener('click', function() {
                        clearInterval(timer);
                        var idx = this.index;
                        var target = ullis[idx].offsetTop;
                        timer = setInterval(function() {
                            var leader = scroll().top,
                                step = (target - leader) / 10;
                            step = step > 0 ? Math.ceil(step) : Math.floor(step);
                            leader += step;
                            window.scrollTo(0,leader);
                            if (leader == target) {
                                clearInterval(timer);
                            }
                        }, 20)
                    })
                }
            },
            addClickEvent2: function() {
                var self = this;
                var ol = this.createOl(),
                    ul = this.getTarget(),
                    ullis = ul.children,
                    lis = ol.children;
                var i = 0,
                    l = lis.length;
                var timer = null;
                var _width = document.body.clientWidth;
                for (; i < l; i++) {
                    lis[i].index = i; //分别保存索引i的值到每一个li上
                    lis[i].addEventListener('click', function() {
                        // clearInterval(timer);
                        var idx = this.index;
                        var target = ullis[idx].offsetLeft;
                        ul.style.transform = 'translatex(-'+target+'px)';
                    })
                }
            }
        }
        //实现继承
    function extend(target) {
        if (!target) {
            return;
        }
        var i = 1,
            l = arguments.length,
            k,
            obj;
        for (; i < l; i++) {
            obj = arguments[i];
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    target[k] = obj[k];
                }
            }
        }
        return target;
    }

    function fullPage(option) {
        //接受配置
        if (!option || !option.target) {
            return null;
        }
        return new FullPage(option);
    }
    //暴露到全局
    window.fullPage = fullPage;
})();
