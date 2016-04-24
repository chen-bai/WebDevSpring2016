(function () {
    angular
        .module("jgaSortable", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable(FieldService) {
        var start = null;
        var end = null;

        var fixHelperModified = function(e, tr) {
            var $originals = tr.children();
            var $helper = tr.clone();
            $helper.children().each(function(index)
            {
                $(this).width($originals.eq(index).width())
            });
            return $helper;
        };

        function link(scope, element) {
            //var jgaAxis = attributes.jgaAxis;
            $(element).sortable({
                //axis: jgaAxis,
                helper: fixHelperModified,
                start: function (event, ui) {
                    start = ui.item.index();
                },
                stop: function (event, ui) {
                    end = ui.item.index();
                    if (end > start) {
                        var temp = scope.fields[start];
                        for (var i = start; i < end; i++) {
                            scope.fields[i] = scope.fields[i + 1];
                        }
                        scope.fields[end] = temp;
                    }else{
                        var temp = scope.fields[start];
                        for (var i = start; i > end; i--) {
                            scope.fields[i] = scope.fields[i - 1];
                        }
                        scope.fields[end] = temp;
                    }
                    scope.$apply();
                    FieldService.updateAllFieldsForForm(scope.form._id, scope.fields)
                        .then(function (response) {})
                }
            });
        }

        return {
            link: link
        }
    }
})();


//var fixHelperModified = function(e, tr) {
//    var $originals = tr.children();
//    var $helper = tr.clone();
//    $helper.children().each(function(index)
//    {
//        $(this).width($originals.eq(index).width())
//    });
//    return $helper;
//};
//
//$("#sort tbody").sortable({
//    helper: fixHelperModified
//}).disableSelection();