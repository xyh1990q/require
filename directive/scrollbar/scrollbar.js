/*global cloud:true */
/*global $:true */

(function() {
    'use strict';
    /**
     * 监听 childList 变化更新滚动条
     */
    window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if (MutationObserver) {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // 解决火狐下一个很诡异的问题
                var changeField = $.browser.mozilla ? (mutation.target.scrollTop + mutation.target.scrollHeight) : mutation.target.scrollHeight;
                if ($(mutation.target).data('height') != changeField) {
                }
                $(mutation.target).data('height', changeField);
            });
        });
        var observeConfig = {attributes: true, childList: true, characterData: false };
    }

    myApp.compileProvider.directive('cloudscrollbar', ['$parse', function($parse) {
                return {
                    restrict: 'A',
                    priority: 100000,
                    scope: {
                        cloudscrollbar:'=?',
                        options:'@',
                        onbottom: '=',
                        ontop: '=',
                        scroll: '='
                    },
                    link: function($scope, element, attrs) {
                        var defaultStyle = {
                            /*cursorwidth: 8,
                            cursoropacitymax: 0.6,
                            background: 'none',
                            scrollspeed: 10,
                            horizrailenabled: false,
                            opacity: 0.3,
                            zindex: 10*/
                            wheelSpeed: 1,
                            wheelPropagation: 0,
                            swipePropagation: 1,
                            minScrollbarLength: null,
                            maxScrollbarLength: null,
                            useBothWheelAxes: false,
                            useKeyboard: 1,
                            suppressScrollX: 0,
                            suppressScrollY: 0,
                            scrollXMarginOffset: 0,
                            scrollYMarginOffset: 0,
                            stopPropagationOnClick: 1
                        };
                        if($scope.options){
                            var opt = JSON.parse($scope.options);
                            $.extend(defaultStyle,opt);
                        }

                        setTimeout(function(){
                            if (!element || !element[0] || !(element[0] instanceof Element)){return;};
                            if (window.getComputedStyle(element[0]).position === 'static') {
                                element.css('position', 'relative');
                            }
                            observer && observer.observe(element[0], observeConfig);

                        },0);

                        element.on('scroll', function () {
                            var style,fixHeight = 0;
                            if (element.scrollTop() === 0) {
                                angular.isFunction($scope.ontop) && $scope.ontop();
                            }

                            style = (document.defaultView.getComputedStyle||window.getComputedStyle)(element[0],null);
                            fixHeight = parseInt(style.borderTopWidth,10) + parseInt(style.borderBottomWidth,10);

                            if (element.scrollTop() + element.outerHeight() > element[0].scrollHeight + fixHeight - 5) {
                                angular.isFunction($scope.onbottom) && $scope.onbottom();
                            }
                        });

                        /*加入滚动事件*/
                        if(attrs.scroll){
                            element.on('scroll',function(e){
                                $scope.scroll(e);
                            });
                        }
                    }
                };
            }]);
}());