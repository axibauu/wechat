// diwp 自定义验证规则
var customFormValidation = function () {

    var handleCustomValidation = function () {

        $.validator.addMethod("noChinese", function (value, element, params) {
            var noChinese = /[\u4E00-\u9FA5]/g;
            return this.optional(element) || !(noChinese.test(value));
        }, "不能输入中文！");

        $.validator.addMethod("phoneNum", function (value, element, params) {
            var phoneNum = /^1[3|4|5|7|8][0-9]{9}$/;
            return this.optional(element) || (phoneNum.test(value));
        }, "号码格式不正确！");
    };

    return {
        init: function () {
            handleCustomValidation();
        }
    }
}();

jQuery(document).ready(function () {
    customFormValidation.init();
});