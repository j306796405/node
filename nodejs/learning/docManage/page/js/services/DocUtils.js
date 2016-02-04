myApp.factory('DocUtils', [function () {
    return {
        getQuarterStartMonth: function (month) {
            if (month <= 2) {
                return 0;
            }
            else if (month <= 5) {
                return 3;
            }
            else if (month <= 8) {
                return 6;
            }
            else {
                return 9;
            }
        },
        getDate: function (year, month, day) {
            return new Date(year, month, day);
        },
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return null;
        },
        formatUserName: function(name){
            var reg = /[a-zA-Z0-9]/g;
            return name.replace(reg, '');
        }
    }
}])