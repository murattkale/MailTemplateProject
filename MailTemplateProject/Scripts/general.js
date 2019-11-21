
(function ($) {
    "use strict";

    var postArray = [];
    $.ajx = function (url, data, successMethod, error) {
        //if (typeof data != "string" && data != null) {
        //    data = JSON.stringify(data);
        //}
        var post = $.post(url, data, successMethod)
            .fail(function (e, exception) {
                if (error) {
                    error = $.fn.errorSend(e, exception);
                    console.log(error);
                }
            });
        postArray.push(post);
    };

    $.errorSend = function (e, exception) {
        var error = '';
        if (e.status === 0) {
            error = 'Not connect. Verify Network.';
        } else if (e.status === 404) {
            error = 'Requested page not found. [404]';
        } else if (e.status === 500) {
            error = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            error = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            error = 'Time out error.';
        } else if (exception === 'abort') {
            error = 'Ajax request aborted.';
        } else {
            error = 'Uncaught Error. \n' + error.responseText;
        }
        var data = { error: error };

        return error;
    };

    $.fn.addOption = function (selectValues, value, text, dpChange, dpSuccess, selectValue, selectText, attrName, attrValue) {
        var id = this;
        $(id).html('');

        if (selectValue === "Seçiniz") {
            var optionsAll = $("<option></option>")
                .attr("value", selectValue)
                .text('Seçiniz');
            $(id).append(optionsAll);
        }

        $.each(selectValues, function (i, item) {
            var optionsAll = $("<option></option>")
                .attr("value", item[value])
                .text(item[text]);

            if (attrName)
                $(optionsAll).attr(attrName, attrValue);

            if (selectValue === item[value]) {
                $(optionsAll).attr('selected', "selected");
            }
            if (selectText === item[text]) {
                $(optionsAll).attr('selected', "selected");
            }

            $(id).append(optionsAll);
        });

        if (dpChange)
            $(document).on('change', '#' + $(id)[0].id, function () { dpChange(); });

        if (dpSuccess)
            dpSuccess();
    };

    $.fn.addOptionAjax = function (url, param, value, text, dpChange, dpSuccess, selectValue, selectText, attrName, attrValue) {
        var id = this;
        $(id).LoadingOverlay("show");
        $(id).html('');

        $.ajx(url, param, function (dataResult) {
            $(id).addOption(dataResult, value, text, dpChange, dpSuccess, selectValue, selectText, attrName, attrValue);
            $(id).LoadingOverlay("hide");
        }, null);

    };

    $.fn.toForm = function (id) {//serialize data function
        var formArray = $(id).serializeArray();
        var returnArray = {};

        for (var i = 0; i < formArray.length; i++) {
            var finame = (formArray[i]['name']).toString();
            var fivalue = (formArray[i]['value']).toString();
            if (finame.indexOf("Id") != -1 && fivalue == "-1") {
                returnArray[formArray[i]['name']] = null;
            }
            else {
                returnArray[formArray[i]['name']] = fivalue;
            }
        }
        $(id + ' select[disabled]').each(function () {
            returnArray[$(this).attr('name')] = $(this).val();
        });
        $(id + ' input[disabled]').each(function () {
            returnArray[$(this).attr('name')] = $(this).val();
        });

        $(id + ' textarea').each(function () {
            try {
                returnArray[$(this).attr('name')] = CKEDITOR.instances[this.id].getData();
            } catch (e) {
                returnArray[$(this).attr('name')] = $(this).val();
            }

        });

        return returnArray;
    };


})(jQuery);