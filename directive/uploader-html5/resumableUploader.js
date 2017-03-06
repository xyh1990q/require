(function () {
    'use strict';
    define([
        assets + 'ctmedia/lib/spark-md5/spark-md5.js?201504091823',
        assets + 'ctmedia/js/resumable-uploader.js'
    ], function () {
        myApp.compileProvider.directive('resumableUploader', [
            '$q', '$timeout','$parse',
            function ($q, $timeout,$parse) {
                return {
                    restrict: "A",
                    scope: {
                        oncomplete: "@",
                        onstart: "=",
                        data: "=",
                        loading: "=",
                        percentage: '=',
                        attachinfo: '=?'
                    },
                    link: function ($scope, element, attrs) {
                        var input;
                        input = $('<input type="file" name="file" name="file" />').css({
                            position: "fixed",
                            left: "-9999px",
                            zIndex: "-1000"
                        }).insertAfter(element);
                        if (attrs.multiple) {
                            input.attr('multiple', 'multiple');
                        }
                        if (attrs.ext) {
                            input.attr('accept', attrs.ext);
                        }
                        element.on('click', function () {
                            input.trigger('click');
                        });
                        input.on('change', function () {
                            var promise
                            if (angular.isFunction($scope.onstart)) {
                                promise = $scope.onstart(input[0].files,attrs.ext);
                            }
                            promise = promise || $timeout(angular.noop);

                            promise.then(function(){
                                sendFile(input[0], attrs.url, attrs.type || {}, function (responseText) {
                                    try {
                                        responseText = JSON.parse(responseText);
                                    } catch (e) {
                                        responseText = {};
                                    }
                                    var complete = $parse(attrs.oncomplete)($scope.$parent);
                                    complete(responseText);
                                });
                            });

                        });
                    }
                };
            }]);

        function sendFile(file, url, type, callback) {
            var resumableUploader = new ResumableUploader(file, url);
            resumableUploader.register().then(function (res) {
                if (!res.state) {
                    //console.log(res);
                }
                res.size = resumableUploader.info().size;
                if (res && res.url) {
                    res.origin = file.files[0];
                    //console.log(res);
                    return resumableUploader.upload({
                        url: res.url,
                        fid: res.fid,
                        resume: res.resume
                    }, function (now, total) {
                        //console.log('上传进度');
                        //console.log(now);
                        //console.log(total);
                    }, function (err) {
                        //console.log('上传失败');
                        //console.log(err);
                    }).then(function (id) {
                        //console.log('上传成功');
                        //console.log(id);
                        $.post('/cmapi/transcode/'+type, {fid: id, name:res.origin.name,type:'ctmedia/upload'}, function(data) {
                            //console.log(data);
                            callback(data);
                        },'json');
                    })
                } else {
                    //console.log('上传失败2');
                }
            }).fail(function (err) {
                //console.log('上传失败3');
            });
        }
    })

}());