var Square = function(speed) {
        this.statu = 0; //记录当前状态
        this.speed = speed || 400; //记录当前速度
        this.lockspeed = this.speed;
        this.squareType; //记录方块类型
        this.timeDo = null; //定时下落
        this.keyLock = false; //事件未锁定
        this.score = 0; //所得分数
        this.contentDiv = null;
        this.speedDiv = null;
        this.loddingData = {
            arr: null,
            type: 0,
            x: 3,
            y: 0,
            width: 0,
            height: 0
        }; //记录当前类型
        /*初始化数组*/
        this.sqarr = new Array();
        this.linenumber = 15;
        this.objs = {}; //存放对象的地方
        for (var i = 0; i < this.linenumber; i++) {
            this.sqarr[i] = new Array();
            for (var j = 0; j < 10; j++) {
                this.sqarr[i][j] = 0;
            }
        }
        this.sqareDiv = this.createDiv();
    }
    //启动  start
Square.prototype.start = function() {
        this.createEvent();
        var $this = this;
        this.contentDiv = this.createNode({
            className: 'rightDiv'
        });
        this.speedDiv = this.createNode({
            className: 'speedDiv'
        });
        this.contentDiv.innerHTML = "score:0";
        this.speedDiv.innerHTML = "speed:" + this.speed + "ms";
        this.run();
    }
    //执行 run
Square.prototype.run = function() {
        this.loddingData = this.createTypeArr();
        if (this.ifIndata()) {
            this.showAll();
            this.clearAndShow(null, this.loddingData);
            var obj = this;
            obj.keyLock = false;
            obj.speed = obj.lockspeed;
            obj.timeDo = window.setTimeout(function() {
                obj.downData(obj);
            }, obj.speed);
        } else {
            var $this = this;
            var button = this.createNode({
                tagName: 'BUTTON',
                parentNode: $this.contentDiv
            });
            var textNode = document.createTextNode("重新开始");
            button.appendChild(textNode);
            var obj = this;
            var al = document.createTextNode("click this button to play again!");
            this.contentDiv.appendChild(al);
            button.onclick = function() {
                obj.contentDiv.parentNode.removeChild(obj.contentDiv);
                obj.sqareDiv.parentNode.removeChild(obj.sqareDiv);
                obj.speedDiv.parentNode.removeChild(obj.speedDiv);
                var square = new Square();
                square.start();
            }
        }
    }
    //循环下落  fall down
Square.prototype.downData = function(obj) {
        if (obj.ifIndata()) {
            var data = obj.extendData(obj.loddingData, {});
            obj.loddingData.y = obj.loddingData.y + 1;
            if (!obj.ifIndata()) {
                obj.loddingData = data;
                if (obj.timeDo != null) {
                    window.clearTimeout(obj.timeDo);
                    obj.timeDo = null;
                }
                obj.indata();
                obj.showAll();
                var line = obj.harvest();
                if (line > 0) {
                    obj.contentDiv.innerHTML = "score:" + obj.score;
                    obj.speedDiv.innerHTML = "speed:" + obj.speed + "ms";
                    window.setTimeout(function() {
                        obj.showAll(obj)
                    }, 50);
                }
                obj.run();
            } else {
                obj.showAll();
                obj.clearAndShow(data, obj.loddingData);
                obj.speedDiv.innerHTML = "speed:" + obj.speed + "ms";
                obj.timeDo = window.setTimeout(function() {
                    obj.downData(obj);
                }, obj.speed);
            }
        } else {
            if (obj.timeDo != null) {
                window.clearTimeout(obj.timeDo);
                obj.timeDo = null;
            }
            obj.indata();
            obj.showAll();
            var line = obj.harvest();
            if (line > 0) {
                obj.contentDiv.innerHTML = "score:" + obj.score;
                obj.speedDiv.innerHTML = "speed:" + obj.speed + "ms";
                window.setTimeout(function() {
                    obj.showAll(obj)
                }, 50);
            }
            obj.run();
        }
    }
    //判断是否可以移动  if can move
Square.prototype.ifIndata = function() {
        var data = this.loddingData;
        if (data.y < 0 || this.sqarr.length < data.y + data.height) {
            return false;
        }
        if (data.x < 0 || this.sqarr[0].length < data.x + data.width) {
            return false;
        }
        for (var i = 0; i < data.height; i++) {
            var y = data.y + i;
            var sqarrcopyX = this.sqarr[y];
            for (var j = 0; j < data.width; j++) {
                var x = data.x + j;
                if (data.arr[i][j] == 1 && sqarrcopyX[x] == 1) {
                    return false;
                }
            }
        }
        return true;
    }
    //移动 合并数据
Square.prototype.indata = function() {
        var data = this.loddingData;
        for (var i = 0; i < data.height; i++) {
            var y = data.y + i;
            var sqarrcopyX = this.sqarr[y];
            for (var j = 0; j < data.width; j++) {
                var x = data.x + j;
                if (data.arr[i][j] == 1) {
                    sqarrcopyX[x] = data.arr[i][j];
                }
            }
        }
    }
    //消除合适组合  get the score
Square.prototype.harvest = function() {
        var sqarr = this.sqarr;
        var line = 0;
        for (var i = 0; i < sqarr.length; i++) {
            var sqarrX = sqarr[i];
            var flag = true;
            for (var j = 0; j < sqarrX.length; j++) {
                if (sqarrX[j] == 0) {
                    flag = false;
                }
            }
            if (flag) {
                sqarr.splice(i, 1);
                sqarr.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                line++;
            }
        }
        switch (line) {
            case 1:
                this.score += 10;
                break;
            case 2:
                this.score += 30;
                break;
            case 3:
                this.score += 60;
                break;
            case 4:
                this.score += 100;
                break;
        }
        return line;
    }
    //工具方法 tool
Square.prototype.cloneArray = function(arr) {
        var array = new Array();
        for (var i = 0; i < arr.length; i++) {
            var yarr = arr[i];
            for (var j = 0; j < yarr.length; j++) {
                array[i][j] = yarr[i];
            }
        }
        return array;
    }
    //显示当前数据 show data
Square.prototype.showAll = function(obj) {
        var obj = obj || this;
        var sqarr = obj.sqarr;
        for (var i = 0; i < sqarr.length; i++) {
            var sqarrX = sqarr[i];
            for (var j = 0; j < sqarrX.length; j++) {
                var node = this.objs["node_" + i + "" + j];
                if (sqarrX[j] == 0) {
                    node.className = "squaresoff";
                } else {
                    node.className = "squareson";
                }
            }
        }
    }
    //显示当前方块数据   show array 
Square.prototype.showArrDIv = function() {
        var data = this.loddingData;
        for (var i = 0; i < data.height; i++) {
            var y = data.y + i;
            var sqarrcopyX = this.sqarr[y];
            for (var j = 0; j < data.width; j++) {
                var x = data.x + j;
                if (data.arr[i][j] == 1) {
                    try {
                        this.objs["node_" + y + "" + x].className = "squareson";
                    } catch (e) {
                        alert(y);
                    }
                }
            }
        }
    }
    //初始化数据 innit this div
Square.prototype.createDiv = function() {
        var centerdiv = this.createNode({
            className: 'centerdiv'
        });
        var sqarr = this.sqarr;
        for (var i = 0; i < sqarr.length; i++) {
            var sqarrX = sqarr[i];
            for (var j = 0; j < sqarrX.length; j++) {
                var node = this.createNode({
                    className: 'squaresoff',
                    parentNode: centerdiv
                });
                this.objs["node_" + i + "" + j] = node;
            }
        }
        return centerdiv;
    }
    //创建节点   tool
Square.prototype.createNode = function(option) {
        var data = this.extendData({
            tagName: 'DIV',
            className: '',
            parentNode: document.body
        }, option || {});
        var node = document.createElement(data.tagName);
        node.className = data.className;
        data.parentNode.appendChild(node);
        return node;
    }
    //数据继承   data inherit
Square.prototype.extendData = function(initData, optionData) {
        var returndata = {};
        for (var n in initData) {
            if (optionData.hasOwnProperty(n)) {
                returndata[n] = optionData[n];
            } else {
                returndata[n] = initData[n];
            }
        }
        return returndata;
    }
    //清楚之前数据，显示当前数据  clear and show data
Square.prototype.clearAndShow = function(olddata, newdata) {
        var data = olddata;
        if (data != null) {
            for (var i = 0; i < data.height; i++) {
                var y = data.y + i;
                var sqarrcopyX = this.sqarr[y];
                for (var j = 0; j < data.width; j++) {
                    var x = data.x + j;
                    if (data.arr[i][j] == 1) {
                        try {
                            this.objs["node_" + y + "" + x].className = "squaresoff";
                        } catch (e) {
                            alert(y);
                        }
                    }
                }
            }
        }
        data = newdata;
        for (var i = 0; i < data.height; i++) {
            var y = data.y + i;
            var sqarrcopyX = this.sqarr[y];
            for (var j = 0; j < data.width; j++) {
                var x = data.x + j;
                if (data.arr[i][j] == 1) {
                    try {
                        this.objs["node_" + y + "" + x].className = "squareson";
                    } catch (e) {
                        alert(y);
                    }
                }
            }
        }
    }
    //初始化事件 init Event
Square.prototype.createEvent = function() {
        var obj = this;
        document.onkeydown = function(e) {
            e = e || event;
            var keycode = e.keyCode;
            if (keycode == 37) {
                var data = obj.extendData(obj.loddingData, {});
                obj.loddingData.x = obj.loddingData.x - 1;
                if (obj.loddingData.x < 0 || !obj.ifIndata()) {
                    obj.loddingData = data;
                } else {
                    obj.clearAndShow(data, obj.loddingData);
                }
            } else if (keycode == 38) {
                var data = obj.extendData(obj.loddingData, {});
                obj.loddingData = obj.scroll(data);
                if (obj.loddingData.x < 0 || !obj.ifIndata()) {
                    obj.loddingData = data;
                } else {
                    obj.clearAndShow(data, obj.loddingData);
                }
            } else if (keycode == 39) {
                var data = obj.extendData(obj.loddingData, {});
                obj.loddingData.x = obj.loddingData.x + 1;
                if (!obj.ifIndata()) {
                    obj.loddingData = data;
                } else {
                    obj.clearAndShow(data, obj.loddingData);
                }
            } else if (keycode == 40) {
                if (!obj.keyLock) {
                    obj.speed = 20;
                    obj.keyLock = true;
                }
            } else if (keycode == 32) {
                if (!obj.keyLock) {
                    obj.speed = 0;
                    obj.keyLock = true;
                }
            }
        }
        document.onkeyup = function(e) {
            e = e || event;
            var keycode = e.keyCode;
            if (keycode == 40) {
                obj.speed = obj.lockspeed;
                obj.keyLock = false;
            }
        }
    }
    //获得活动方块  get the square
Square.prototype.createTypeArr = function() {
        var type = Math.floor(Math.random() * 9 + 1);
        var arr = null;
        switch (type) {
            case 1:
            case 2:
                arr = [
                    [1, 1],
                    [1, 1]
                ];
                break;
            case 3:
                arr = [
                    [1, 1, 0],
                    [0, 1, 1]
                ];
                break;
            case 4:
                arr = [
                    [0, 1, 1],
                    [1, 1, 0]
                ];
                break;
            case 5:
                arr = [
                    [0, 1],
                    [1, 1],
                    [0, 1]
                ];
                break;
            case 6:
                arr = [
                    [1, 0],
                    [1, 1],
                    [1, 0]
                ];
                break;
            case 7:
                arr = [
                    [1, 1],
                    [1, 0],
                    [1, 0]
                ];
                break;
            case 8:
                arr = [
                    [1, 1],
                    [0, 1],
                    [0, 1]
                ];
                break;
            case 9:
                arr = [
                    [1],
                    [1],
                    [1],
                    [1]
                ];
                break;
            default:
                arr = [
                    [1, 1, 1, 1]
                ];
        }
        var data = this.extendData({
            arr: null,
            type: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }, {
            arr: arr,
            type: type,
            x: 3,
            y: 0,
            width: arr[0].length,
            height: arr.length
        });
        return data;
    }
    //旋转   round this data
Square.prototype.scroll = function(data) {
        if (data.type == 1) {
            return data;
        }
        var newarr = new Array(data.width);
        for (var j = 0; j < newarr.length; j++) {
            newarr[j] = new Array(data.height);
        }
        for (var i = 0; i < data.height; i++) {
            for (var j = 0; j < data.width; j++) {
                var nar = newarr[j];
                nar[i] = data.arr[i][j];
            }
        }
        var x0 = data.x + data.width / 2.0;
        var y0 = data.y + data.height / 2.0;
        var x = Math.round(x0 - y0 + data.y * 1.0);
        var y = Math.round(-(x - data.x) + data.y);
        for (var i = 0; i < data.width; i++) {
            newarr[i] = newarr[i].reverse();
        }
        if (newarr[0].length > 2) {
            x = x - 1;
        }
        if (newarr.length <= 2) {
            y = y + 1;
        }
        return this.extendData(data, {
            arr: newarr,
            x: x,
            y: y,
            width: newarr[0].length,
            height: newarr.length
        });
    }

    
    //开始  start();
var square = new Square(500);
square.start();
