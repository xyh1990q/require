(function () {
    'use strict';

    myApp.directive('cloudUploader', [
        '$q', '$timeout','$parse',
        function ($q, $timeout,$parse) {
            return {
                restrict: "A",
                scope: {
                    oncomplete: "@",
                    onstart: "=",
                    onerror: "=",
                    data: "=",
                    percentage: '=',
                    attachinfo: '=?'
                },
                link: function ($scope, element, attrs) {
                    var input, xhr;
                    input = $('<input type="file" name="file" />').css({
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
                        //input.click();
                    });
                    input.on('change', function () {
                        var files = [], promise;
                        if (input[0].files.length < 1) {
                            return;
                        }
                        for (var i = 0, l = input[0].files.length; i < l; i++) {
                            files.push(input[0].files[i]);
                        }
                        input[0].value = '';
                        if (attrs.multiple) {
                            if (angular.isFunction($scope.onstart)) {
                                promise = $scope.onstart(files);
                            }
                        } else {
                            if (files[0] && attrs.size && files[0].size > attrs.size) {
                                return $scope.onerror('over limit');
                            }
                            if (angular.isFunction($scope.onstart)) {
                                promise = $scope.onstart(files[0]);
                            }
                        }
                        if (promise === false) {
                            return;
                        }
                        promise = promise || $timeout(angular.noop);
                        promise.then(function (res) {
                            var uploadPromises = [];
                            if (res === false) {
                                return;
                            }

                            files.forEach(function (file) {
                                var p = $q(function (resolve, reject) {
                                    var xhr = sendFile(file, attrs.url, $scope.data || {}, function (responseText) {
                                        try {
                                            responseText = JSON.parse(responseText);
                                        } catch (e) {
                                            responseText = {};
                                        }
                                        resolve(responseText);
                                    },function(progressResponse){
                                        if (attrs.percentage) {
                                            $scope.percentage = progressResponse.loaded/progressResponse.total;
                                            $scope.$apply();
                                        }
                                    });
                                });
                                uploadPromises.push(p);
                            });
                            $q.all(uploadPromises).then(function (results) {
                                var complete;
                                $scope.attachinfo = attrs.multiple ? results : results[0].data;

                                if(!attrs.oncomplete){return;}

                                complete = $parse(attrs.oncomplete)($scope.$parent);
                                if(!angular.isFunction(complete)){
                                    return;
                                }
                                if (attrs.multiple) {
                                    complete(results);
                                } else {
                                    complete(results[0]);
                                }
                            });
                        });
                    });
                }
            };
        }]);

    // https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
    function sendFile(file, url, data, callback, progressCallback) {
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Handle response.
                callback(xhr.responseText);
            }
        };
        xhr.upload.onprogress = progressCallback;

        fd.append('file', file);
        // 将 $scope.data的内容一并放入post中
        angular.forEach(data, function (v, k) {
            fd.append(k, v);
        });
        // Initiate a multipart/form-data upload
        xhr.send(fd);
        return xhr;
    }
}());