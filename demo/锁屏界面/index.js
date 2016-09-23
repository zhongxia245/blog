$(function() {
    //svg的
    function doSvg() {
        var $that = $("#nineSvg"), //jquery对象
            that = $that[0], //原始对象
            number = 9, //格子的个数
            canLine = false,
            thisL = '', //d的值
            thisPass = [], //画出的密码
            canDoLine = false, //是否在元素上
            passWord = 1258, //设置的密码
            a;

        //画入9宫格子
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var node = $(document.createElementNS("http://www.w3.org/2000/svg", "circle")).attr({
                    'cx': 110 * j + 90,
                    'cy': 110 * i + 90,
                    'r': 40,
                    'stroke': 'rgba(255,255,255,0.5)',
                    'stroke-width': 2,
                    'fill': 'transparent',
                    'class': 'roundA',
                    'canDo': true

                });
                $that.append(node);
            }
        }
        //画入线段
        var DoLine = $(document.createElementNS("http://www.w3.org/2000/svg", "path")).attr({
            'stroke': '#fff',
            'stroke-width': 2,
            'fill': 'transparent',
            'd': ' '
        });

        $that.append(DoLine);
        //获取九宫格
        var circle = $that.find('circle');

        //在格子上按下
        circle.mousedown(function() {
            //可以画线
            canLine = true;
            var Mx = $(this).attr("cx"),
                My = $(this).attr("cy");

            //初始化原点
            thisL = 'M' + Mx + ' ' + My;



        });

        //在对象上移动
        $that.mousemove(function(e) {

            if (canLine) {
                var NowLin = DoLine.attr('d');
                DoLine.attr({
                    'd': thisL + 'L' + e.offsetX + ' ' + e.offsetY
                });
            }

        });

        // 如果移动的时候进入了圆格子
        circle.mousemove(function() {
            if (canLine && $(this).attr('canDo') == 'true') {
                var X = $(this).attr("cx"),
                    Y = $(this).attr("cy");
                thisL = thisL + ' L' + X + ' ' + Y;
                // 加标记
                markRound($(this));
                // 改变轨迹
                DoLine.attr({
                    'd': thisL
                });
                // 记录密码
                thisPass.push($(this).index() + 1);

                // 标记不可选
                $(this).attr('canDo', false);

                //标记鼠标在元素上
                canDoLine = true;
            }

        });

        //鼠标已经离开了元素的时候做标记
        circle.mouseout(function() {
            canDoLine = false;
        });


        //鼠标抬起
        $that.mouseup(function() {
            var nowPassword = removeSameArr(thisPass).join(''); //密码

            // 清空密码数组
            thisPass = [];

            console.log(nowPassword)
                //如果不元素上,去除后两项
            if (!canDoLine) {
                DoLine.attr({
                    'd': thisL
                });
            }

            //判断密码是否正确
            if (passWord == nowPassword) {
                alert('密码正确');
            } else {
                alert('密码错误');
            }

            //标记不可划线
            canLine = false;

            // 清楚样式
            $(that).find('.roundB').remove();
            $(that).find('.roundA').attr({
                'fill': 'transparent',
                'canDo': true,
                'stroke': 'rgba(255,255,255,0.5)'
            });
            DoLine.attr('d', '');

        });


        //去除相同的元素
        function removeSameArr(arr) {
            var thisArr = [];

            for (var i = 0; i < arr.length; i++) {
                if (thisArr.indexOf(arr[i]) == -1) thisArr.push(arr[i]);
            }
            return thisArr;
        }



        //标记选中的方法
        function markRound(obj) {
            var nowRound = obj,
                round = $(document.createElementNS("http://www.w3.org/2000/svg", "circle")).attr({
                    'cx': nowRound.attr('cx'),
                    'cy': nowRound.attr('cy'),
                    'r': 20,
                    'fill': '#fff',
                    'class': 'roundB'
                });

            $that.append(round);

            nowRound.attr({
                'stroke': '#fff',
                'fill': 'rgba(0,0,0,0.3)'
            });

        }

    } //doSvg

    doSvg();
});
