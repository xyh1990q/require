/**
 * Created by 文韬 on 2016/7/22.
 * 封装常用的功能函数
 */
(function() {
    'use strict';

    var BaseService = function ($http, $timeout, $q) {
        var self = this;

        /*
         *获取url参数
         */
        self.getUrlParam = function(url, param){
            var temp,
                params = url.split("?")[1]? url.split("?")[1].split("&") : [];

            for(var i = 0; i < params.length; i++){
                temp = params[i].split("=");
                if(temp[0] == param){
                    return temp[1];
                }
            }
            return "";
        }

        /*
         * 功能：验证是否为数字
         * 参数：
         * value： 需要验证的值
         */
        self.isNumber = function(value){
            return !isNaN(Number(value));
        }

        /*
         *功能：填充get请求url
         * 参数：
         *  url： 请求url
         *  req： 请求参数
         */
        self.fillUrl = function(url, req){
            var arr = [];

            for(var key in req) arr.push(key + "=" + req[key]);

            for(var i = 0; i < arr.length; i++){
                if(i == 0) url += "?" + arr[i];
                else url += "&" + arr[i];
            }

            return url;
        }

        /*
         *功能： 计算日历中的下一天
         * 输入参数：
         *   timestamp： 当天的时间戳，秒
         *返回参数：{}日历中的下一天的相关数据
         */
        self.getNextDate = function(timestamp){

            var date = new Date(Number(timestamp)),
                y = date.getFullYear(),
                m = date.getMonth() + 1,
                d = date.getDate(),
                time = "", r_y = y, r_m = m, r_d = d,
                type = 1, //1平年，2闰年,四个平年才一个闰年
                me = this;

            if((y % 4 == 0 && y % 100 != 0) || y % 400 == 0){
                //闰年，可以被4整除，整百（个位和十位均为0）的年数必须是可以被400整除的才是闰年
                type = 2;
            } else {
                //平年，平年二月有28天 闰年二月有29天
                type = 1;
            }
            if(m == 12 && d == 31){
                r_y = y+1;
                r_m = 1;
                r_d = 1;
            }else if(m == 2){
                if((type == 1 && d == 28) || (type == 2 && d == 29)){
                    r_m = m + 1;
                    r_d = 1;
                }else{
                    r_m = m;
                    r_d = d + 1;
                }
            }else if(m >= 1 && m <= 7){
                if((me.isEven(m) && d == 30) || (!me.isEven(m) && d == 31)){
                    r_m = m + 1;
                    r_d = 1;
                }else{
                    r_m = m;
                    r_d = d + 1;
                }
            }else if(m >= 8 && m <= 12){
                if((me.isEven(m) && d == 31) || (!me.isEven(m) && d == 30)){
                    r_m = m + 1;
                    r_d = 1;
                }else{
                    r_m = m;
                    r_d = d + 1;
                }
            }

            time = r_y + "-" + r_m + "-" + r_d;

            return {
                time: time, //2016-8-31
                year: r_y, //2016
                month: r_m,//8
                date: r_d,//31
                timestamp: new Date(time).getTime() //时间戳
            };

        }

        /*
         *功能： 判断奇数、偶数
         * 传入参数：
         *   number： 带判断的数
         *放回参数：
         *   state： true偶数，false奇数
         */
        self.isEven = function(number){

            var state = true;

            if(Number(number)%2 != 0)  state = false;

            return state;

        }

        /*
         *功能：dataURL转blob
         *说明：dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字
         * 传入参数：
         *   data： dataURL格式数据
         * 返回参数：
         *   blob： blob对象, blob.size获取图片文件的大小
         */
        self.dataURLtoBlob = function(data){

            var blob, uIntA;

            if(!data) return;
            data = data.split(',')[1];
            //window.btoa()编码，window.atob解码
            data = window.atob(data);
            //获取8位无符号整数值的类型化数组
            uIntA = new Uint8Array(data.length);
            for (var i = 0; i < data.length; i++) {
                //返回在指定的位置的字符的 Unicode 编码
                uIntA[i] = data.charCodeAt(i);
            };
            blob = new Blob([uIntA], {
                type: "image/jpeg"
            });
            return blob;

        }

        /*
         功能： 获取元素的计算样式
         参数：
         obj： html元素
         attr： css属性
         */
        self.getStyle = function(obj, attr) {

            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj, false)[attr];
            }

        }

        /*
         功能： 给元素添加事件监听器
         参数：
         oTarget： 添加事件的html元素
         sEventType： 事件类型，没有on
         fnHandler： 事件处理函数
         */
        self.addEventHandler = function(oTarget, sEventType, fnHandler) {

            if (oTarget.addEventListener) {
                oTarget.addEventListener(sEventType, fnHandler, false);
            } else if (oTarget.attachEvent) {
                oTarget.attachEvent("on" + sEventType, fnHandler);
            } else {
                oTarget["on" + sEventType] = fnHandler;
            }

        }

        /*
         功能： 删除元素事件监听器
         参数：
         oTarget： 删除事件监听器的html元素
         sEventType： 事件类型，没有on
         fnHandler： 事件处理函数
         */
        self.removeEventHandler = function(oTarget, sEventType, fnHandler) {

            if (oTarget.removeEventListener) {
                oTarget.removeEventListener(sEventType, fnHandler, false);
            } else if (oTarget.detachEvent) {
                oTarget.detachEvent("on" + sEventType, fnHandler);
            } else {
                oTarget["on" + sEventType] = null;
            }

        }

        /*
         功能：改变fun的上下文为object,fun之后的参数做为fun的参数调用，改变fun的上下文
         */
        self.Bind = function(object, fun) {

            var args = Array.prototype.slice.call(arguments).slice(2);
            return function () {
                return fun.apply(object, args);
            }

        }

        /*
         功能：给给object元素绑定事件监听器fun,fun之后的参数做为fun的参数调用,改变fun的上下文
         */
        self.BindAsEventListener = function (object, fun) {

            var args = Array.prototype.slice.call(arguments).slice(2);
            return function (event) {
                return fun.apply(object, [event || window.event].concat(args));
            }

        }

        /*
         功能: 获取元素节点在视口中的位置，参考点为页面的左上角
         参数:
         node html元素节点
         */
        self.getNodePosition = function(node) {

            var nodeTemp = node, l = 0, t = 0;

            while (nodeTemp != document.body && nodeTemp != null) {
                l += nodeTemp.offsetLeft;
                t += nodeTemp.offsetTop;
                nodeTemp = nodeTemp.offsetParent;
            }
            return {
                left: l,
                top: t
            }
        }

        /*
         *功能： url验证
         * 传入参数：
         *   url： 要验证的url
         *放回参数：
         *   ret： true正确的url,false错误的url
         */
        self.urlVerify = function(url){

            var reg_=/^http|(https):\/\/(?:[\w-\.]{0,255})(?:(?:\/?[^\s]{0,255}){0,255})/g,
                ret = reg_.test(url),
                http = url.split(":")[0],
                length = http == "http"? 7: 8;

            if(url.length <= length) ret = false;
            return ret;
        }

        /**
         * 格式化时间
         * @param time：秒
         * @returns {*}： 格式00：00：00
         */
        self.secondToHMS = function(time){

            var h, m, s, ret;

            h = parseInt(time / 3600);
            m = parseInt(time % 3600 / 60);
            s = parseInt(time % 3600 % 60);
            ret = (function(){

                var str = "";

                str += h < 10? ("0" + h.toString()): h.toString();
                str += ":" + (m < 10? ("0" + m.toString()): m.toString());
                str += ":" + (s < 10? ("0" + s.toString()): s.toString());

                return str;

            })();

            return ret;

        }

        /**
         * 格式化时间
         * @param time：秒
         * @returns {*}： 格式00：00：00
         */
        self.hmsToSecond = function(time){

            var arr = time.split(":").reverse(),
                ret = 0;

            for(var i = 0; i < arr.length; i++){
                if(i == 0){
                    // 秒
                    ret += Number(arr[i]);
                    continue;
                }
                if(i == 1){
                    //分
                    ret += Number(arr[i]) * 60;
                    continue;
                }
                if(i == 2){
                    // 时
                    ret += Number(arr[i]) * 60 * 60;
                    continue;
                }
            }

            return ret;

        }

    };

    myApp.provide.factory('baseService', [
        "$http", '$timeout', '$q',
        function ($http, $timeout, $q) {
            return new BaseService($http, $timeout, $q);
        }
    ]);
}());