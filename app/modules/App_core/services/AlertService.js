angular.module('meetMeApp').service('AlertService', function($rootScope,toaster) {
    var alertService = {
        getClass: function(type) {
            // 1 for success || 0 for error || 2 for warning || default is info
            if (type === 1) {
                return 'success';
            } else if (type === 0) {
                return 'error';
            } else if (type === 2) {
                return 'warning';
            } else {
                return 'info';
            }
        },
        showAlert: function(msg, type) {
            var alertObj = {
                cls: this.getClass(type),
                msg: msg
            };
            $rootScope.app_alert = alertObj;
            toaster.clear();
            toaster.pop(this.getClass(type), "", msg);
            //window.scroll(0, 0);
        },
        showAlertWithOutClear: function(msg, type) {
            var alertObj = {
                cls: this.getClass(type),
                msg: msg
            };
            $rootScope.app_alert = alertObj;
            toaster.pop(this.getClass(type), "", msg);
        },
        toasterClear: function(){
            toaster.clear();
            $rootScope.isDefaultToasterTimeOutValue = 3000;
        }
    };
    return alertService;
});