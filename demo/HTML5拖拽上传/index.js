/*
    obj.dragBoxId,必选,string,目标区域的ID
    obj.showImgId,必选,string,显示区域ID
    obj.fileSize,可选,int,默认500(KB),文件大小，
    obj.strRegExp,可选,string,默认*,正则表达式
    obj.activeClass,可选，string，携带目标进去可放区域时，可放区域的样式改变

*/
function dragUpload(obj) {
    var $dragBox = $(obj.dragBox), //jQuery对象
        JdragBox = $dragBox[0], //原生对象
        $ImgCon = $(obj.showImg), //显示区域
        activeClass = obj.activeClass,
        maxSize = obj.fileSize || 500,
        reg = obj.strRegExp || /[*]/;

    //阻止浏览器默认行。 
    $(document).on({
        dragleave: function(e) { //拖离 
            e.preventDefault();
        },
        drop: function(e) { //拖后放 
            e.preventDefault();
        },
        dragenter: function(e) { //拖进 
            e.preventDefault();
        },
        dragover: function(e) { //拖来拖去 
            e.preventDefault();
        }
    });

    $dragBox.on({
        //携带目标进来的时候
        dragenter: function() {
            $dragBox.addClass(activeClass);
        },
        //携带目标出去的时候
        dragleave: function() {
            $dragBox.removeClass(activeClass);
        }
    });

    //携带目标释放
    JdragBox.addEventListener('drop', function(e) {
        var fileList = e.dataTransfer.files; //获取文件对象

        //如果没有文件，直接结束方法
        if (fileList.length == 0) {
            return fasle;
        }
        //为每一个file对象添加方法
        for (var i = 0; i < fileList.length; i++) {
            Domake(fileList[i]);
        }
        $dragBox.removeClass(activeClass);
    }, false);

    //拿到file对象，判断类型，警告，以及渲染，操作
    function Domake(fileObj) {
        var obj = fileObj,
            fileType = fileObj.type,
            fileSize = fileObj.size,
            reader = new FileReader();

        //检查类型
        if (!reg.test(fileType)) {
            alert('不是正确的数据类型');
            return false;
        }

        if (fileSize > maxSize * 1024) {
            alert('素材大于了' + maxSize + 'KB');
            return false;
        }

        //readAsDataURL(file),读取文件，将文件以数据URL的形式保存在result的属性中
        reader.readAsDataURL(obj);
        // 如果文件加载完成，那么渲染
        reader.onload = function(e) {
            var $img = $('<img>').attr("src", e.target.result);
            $ImgCon.append($img)
        }

    }
    //Domake end!
}
//dragUpload end

$(function() {
    var aaa = new dragUpload({
        dragBox: '#upLoadBut',
        showImg: '#showImg',
        fileSize: 500,
        strRegExp: /(image)/,
        activeClass: 'comein'
    });
});
