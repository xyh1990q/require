/*global cloud:true */

(function() {
    'use strict';
    define([
        'style!service/modal/style.css',
    ], function () {
        myApp.provide.factory('Modal', ['$modal', function ($modal) {
            var returnFunction;
            var Modal = function (data) {
                var self = this,
                    dialog;
                self.data = data;
                this.open = function () {
                    self.dialog = $modal.open({
                        // keyboard: false,
                        templateUrl: 'service/modal/template.html',
                        backdrop: typeof self.data.backdrop === 'undefined' ? 'static' : self.data.backdrop,
                        controller: function ($scope) {
                            self.data.buttons = self.data.buttons || [{name: "确定", cmd: "ok"}];
                            $scope.type = self.data.type || 'alert';
                            $scope.title = self.data.title || ' ';
                            $scope.body = self.data.content || ' ';
                            $scope.buttons = [];
                            angular.forEach((self.data.buttons), function (button) {
                                button.click = function () {
                                    this.event = this.event || angular.noop;
                                    if (this.event(self) !== false) {
                                        self.dialog.close(this.cmd);
                                    }
                                };
                                $scope.buttons.push(button);
                            });
                        }
                    });
                    return self.dialog.result;
                };
            };

            var simpleModal = function (params, type) {
                var title, content, buttons, modal;
                if (typeof params === 'string') {
                    title = params;
                    content = '';
                } else {
                    title = params.title;
                    content = params.content;
                    buttons = params.buttons
                }
                modal = new Modal({
                    type: type,
                    title: title,
                    content: content,
                    buttons: buttons
                });
                return modal.open();
            }

            returnFunction = function (data) {
                return new Modal(data);
            };
            returnFunction.success = function (params) {
                return simpleModal(params, 'success');
            };

            returnFunction.alert = function (params) {
                return simpleModal(params, 'alert');
            };

            returnFunction.error = function (params) {
                return simpleModal(params, 'error');
            };
            return returnFunction;
        }]);
    });
})();