var ObjectURL = require('./ObjectURL');
var inheritPrototype = require('./inheritPrototype');
var AsynObject = require('./AsynObject');
var SubFileReader = require('./SubFileReader');
var CORSRequest = require('./CORSRequest');

//使参数友好混合，找到src中合法的属性并将其值（必须为非isNaN)赋值给dest中对应的属性
var mix = function (dest,src) {
    for( var key in src ) {
        if( dest.hasOwnProperty(key) && !isNaN(src[key]) && src[key] != "" ) {
            dest[key] = Number(src[key]);
        }
    }
    return dest;
};

//图片包装器构造函数 （注意现阶段url非blob URL)
var SubImage = function (target,callback) {
    AsynObject.call(this,Image,callback);
    this.image = null;			//现仅提供width和height
    this.canvas = null;
    this.drew;					//记录画布是否有内容，在嵌套调用时使用
    this.initialize(target,callback);
};

//使SubImage继承AsynObject
inheritPrototype(SubImage,AsynObject);

//图片包装器初始化
SubImage.prototype.initialize = function (target,callback) {
    var __this = this;		//SubImage
    if ( target instanceof ImageData) {
        alert("暂不支持ImageData");
    } else if( target instanceof Blob && target.type.substring(0,6) === "image/" ) {	//本地图片文件
        new SubFileReader(target,function (status) {
            if( status == 0 ) {			 //读取失败
                return callback.call(__this,0);
            }
            __this.obj.src = this.obj.result;	//注意这里的上下文为这个SubFileReader实例对象
        }).readAsDataURL();  			//需要告诉以什么形式去读取，没有指明则不会触发回调，注意和SubImage的区别
    } else if( target.substring(0,11) === "data:image/" ) {	//图片数据URI
        this.obj.src = target;
        //找到图片格式
        var formats = ["png", "jpeg", "webp", "vnd.ms-photo"];
        for (var i = 0; i < formats.length; i++) {
            if (target.substring(5, 11 + formats[i].length) === "image/" + formats[i]) {
                __this.originFormat = "image/" + formats[i];
                break;
            }
        }
    } else {		//去请求这张外链图片
        new CORSRequest(target,function (status) {
            if( status == 0 ) {
                return callback.call(__this,0);
            }
            var xhr = this.obj;		//注意这里的上下文为这个CORSRequest实例对象
            if( xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 ) {
                //使用blob URL和canvas将请求到数据转成图像数据URI
                var blob = xhr.response;
                __this.originFormat = blob.type;	//给当前SubImage对象添加原始格式属性，用于导出时使用
                new SubFileReader(blob,function (status) {
                    if( status == 0 ) {
                        return callback.call(__this,0);
                    }
                    __this.obj.src = this.obj.result;
                }).readAsDataURL();
            } else {
                return callback.call(__this,0);
            }
        });
    }
    //将来可能支持blob URL

    //其他属性的赋值
    this.image = {};
    this.canvas = document.createElement("canvas");
    this.drew = false;
};

//获得图片格式
SubImage.prototype.getFormat = function () {
    if( typeof this.originFormat != "undefined" && this.originFormat.length > 0 ) {
        return this.originFormat;
    } else {
        return "image/png";
    }
};

//对某一canvas深拷贝
SubImage.getDeepCopyOfCanvas = function (canvas) {
    var lastCanvas = document.createElement("canvas");
    var ctx = lastCanvas.getContext("2d");
    lastCanvas.width = canvas.width;
    lastCanvas.height = canvas.height;
    ctx.drawImage(canvas,0,0);
    return lastCanvas;
};

SubImage.prototype.toDataURL = function (callback) {
    var img = this.obj;
    var canvas = this.canvas;
    var context = canvas.getContext("2d");
    if( this.drew ) {
        img = SubImage.getDeepCopyOfCanvas(canvas);
    }
    var w = img.width;
    var h = img.height;
    this.image.width = canvas.width = w;
    this.image.height = canvas.height = h;

    context.drawImage(img,0,0);

    this.drew = true;
    var _imgData = canvas.toDataURL(this.getFormat());
    callback.call(this,_imgData);
};

SubImage.prototype.resize = function (config,callback) {
    var canvas = this.canvas;
    var context = canvas.getContext("2d");
    var img = this.obj;
    if( this.drew ) {
        img = SubImage.getDeepCopyOfCanvas(canvas);
    }
    var w = img.width;
    var h = img.height;

    var maxWidth = parseInt(config.maxWidth);
    var maxHeight = parseInt(config.maxHeight);

    var _w = 0, _h = 0;
    if( maxWidth ) {	//如果明确最大宽度
        maxWidth = maxWidth > w ? w : maxWidth;   //resize后的宽度不能大于原始图片宽度
        _w = maxWidth;
        _h = h * _w / w;	//按原始图片比例缩放
    }
    if( maxHeight ) {	//如果明确最大高度
        maxHeight = maxHeight > h ? h : maxHeight;	 //resize后的高度不能大于原始图片高度
        _h = maxHeight;
        _w = w * _h / h;
    }
    //这里做修正，防止画布宽度超出maxWidth或画布高度maxHeight
    while( _w > maxWidth || _h > maxHeight ) {
        if( _w > maxWidth ) {  //当根据maxHeight计算出的_w，超出了maxWidth
            _w--;
            _h = h * _w / w;
        }
        if( _h > maxHeight ) {	//当根据maxWidth计算出的_h，超出了maxHeight
            _h--;
            _w = w * _h / h;
        }
    }

    this.image.width = canvas.width = _w;
    this.image.height = canvas.height = _h;
    context.drawImage(img, 0, 0, _w, _h);
    this.drew = true;
    var _imgData = canvas.toDataURL(this.getFormat());
    callback.call(this,_imgData);
};

SubImage.prototype.clip = function (config,callback) {
    var img = this.obj;
    var canvas = this.canvas;
    var context = canvas.getContext("2d");
    if( this.drew ) {
        img = SubImage.getDeepCopyOfCanvas(canvas);
    }

    //默认剪切整个图
    var _config = {
        top : 0,
        left : 0,
        right : 0,
        bottom : 0
    };
    mix(_config,config);

    //确定剪切区域的宽度
    var _w = img.width - _config.left - _config.right;
    var _h = img.height - _config.top - _config.bottom;
    this.image.width = canvas.width = _w;
    this.image.height = canvas.height = _h;

    context.drawImage(img,_config.left,_config.top,_w,_h,0,0,_w,_h);
    this.drew = true;
    var _imgData = canvas.toDataURL(this.getFormat());
    callback.call(this,_imgData);
};

SubImage.prototype.rotate = function (config,callback) {
    var img = this.obj;
    var canvas = this.canvas;
    var context = canvas.getContext("2d");
    if( this.drew ) {
        img = SubImage.getDeepCopyOfCanvas(canvas);
    }
    var w = img.width;
    var h = img.height;
    var _config = {
        deg : 0   //旋转角度
    }
    mix(_config,config);
    var _angle = _config.deg * Math.PI / 180;	//转成弧度

    var vertexes = [
        w/2, h/2,
        -w/2, h/2,
        -w/2, -h/2,
        w/2, -h/2
    ];

    //顶点旋转
    for (var i = 0; i < 8; i+=2) {
        var newX = vertexes[i] * Math.cos(_angle) - vertexes[i+1] * Math.sin(_angle);
        var newY = vertexes[i] * Math.sin(_angle) + vertexes[i+1] * Math.cos(_angle);
        vertexes[i] = newX;
        vertexes[i+1] = newY;
    };

    //计算宽和高
    var _w = Math.max(Math.abs(vertexes[0] - vertexes[4]),Math.abs(vertexes[2] - vertexes[6]));
    var _h = Math.max(Math.abs(vertexes[1] - vertexes[5]),Math.abs(vertexes[3] - vertexes[7]));

    //重绘图像
    this.image.width = canvas.width = _w;
    this.image.height = canvas.height = _h;
    context.fillStyle = "rgba(255,255,255,1)";
    context.fillRect(0,0,_w,_h);
    context.translate(_w/2,_h/2);
    context.rotate(_angle);
    context.drawImage(img,-w/2,-h/2);
    this.drew = true;
    var _imgData = canvas.toDataURL(this.getFormat());
    callback.call(this,_imgData);
};

SubImage.prototype.transfor = function (config,callback) {
    var img = this.obj;
    var canvas = this.canvas;
    var context = canvas.getContext("2d");
    if( this.drew ) {
        img = SubImage.getDeepCopyOfCanvas(canvas);
    }
    var w = img.width;
    var h = img.height;
    this.image.width = canvas.width = w;
    this.image.height = canvas.height = h;
    context.drawImage(img,0,0,w,h);
    this.drew = true;

    //不同浏览器对转换图片格式支持存在差异
    var _config = {
        type : "png",			//"png"(默认),"jpeg","webp","vnd.ms-photo"
        encoderOptions : 1.0		// [0,1]	jpeg或webp的质量等级
    };
    var _type = _config.type;	//保留默认类型，防止传参类型错误
    var type = config.type;		//调用者要求的格式
    mix(_config,config);	//type字段要求非Number不会混合，主要是获得质量等级数

    var _types = ["png","jpeg","webp","vnd.ms-photo"];
    //png: IE 9+, Edge, Firefox 1.5+(3除外), Safari 2+, Opera 9+, Chrome, IOS版Safari, Android版WebKit
    //jpeg:	IE 9+, Edge, Firefox 1.5+(3除外), Safari 2+, Opera 9+, Chrome, IOS版Safari, Android版WebKit
    //webp: Chrome 23+, Chrome for Android 44+, Opera 12.1+, Opera Mobile 22+, , Android版WebKit 4.3+
    //jxr: none
    for( var i = 0; i < _types.length; i++ ) {
        if( type === _types[i] ) {			//找到要求格式
            _type = "image/" + _types[i];				//转化为toDataURL可以接受的DOMString
            break;
        }
    }

    var _imgData = canvas.toDataURL(_type,_config.encoderOptions);			//当要求格式为image/jpeg或image/webp，质量等级起作用
    var err = _imgData.substring(5,5+_type.length) !== "image/" + type;    //转换后的格式是否和调用者要求type一致
    if( !err ) {
        this.originFormat = _type;	//切换当前实例的图片格式为转换后的
    }
    callback.call(this,_imgData,err);
};

SubImage.prototype.watermark = function (config,callback) {
    var _this = this;
    var _config = {  //mark位置参数
        position : {
            top : undefined,
            left : undefined,
            right : undefined,
            bottom : undefined
        },
        mark : config.mark
    }
    mix(_config.position,config.position);

    var doMark = function (status) {  //此时上下文为mark实例
        _this.mark = this;		//给背景SubImage添加mark（mark也是SubImage实例）
        var img = _this.obj;	//背景Image对象
        var mark = this.obj;	//水印Image对象
        var canvas = _this.canvas;
        var context = canvas.getContext("2d");
        if( _this.drew ) {
            img = SubImage.getDeepCopyOfCanvas(canvas);
        }
        var w = img.width;
        var h = img.height;
        var mw = mark.width;
        var mh = mark.height;

        //绘背景
        this.image.width = canvas.width = w;
        this.image.height = canvas.height = h;
        context.drawImage(img,0,0);
        _this.drew = true;

        var startX = 0;   //mark的x,y坐标
        var startY = 0;
        var _position = _config.position;
        //如果规定了right
        if( typeof _position.right !== "undefined"  ) {
            startX = w - mw - _position.right;
            context.textAlign = "end";
        }
        if( typeof _position.bottom !== "undefined") {
            startY = h - mh - _position.bottom;
            context.textBaseline = "bottom";
        }

        //当right和left同时规定是使用left
        if( typeof _position.left !== "undefined") {
            startX = _position.left;
            context.textAlign = "start";
        }
        if( typeof _position.top !== "undefined" ) {
            startY = _position.top;
            context.textBaseline = "top";
        }

        if( status == 0 ) {		//如果mark加载失败,则贴上mark url（也可能是一段意义的文字）
            var fontSize = 14;	//给了个死数
            var text = _config.mark;
            context.fillStyle = "rgba(255,255,255,0.3)";
            context.font = fontSize + "px Microsoft YaHei";
            context.fillText(text,startX,startY);
        } else {	//添加水印图片到背景
            context.drawImage(mark,0,0,mw,mh,startX,startY,mw,mh);
        }

        try {
            var _imgData = canvas.toDataURL(_this.getFormat());
        } catch (e) {
            return callback.call(_this,null);
        }
        callback.call(_this,_imgData);
    };

    //创建mark实例(SubImage类型）
    new SubImage(_config.mark,doMark);
};

SubImage.prototype.cueGraph = function (config,callback) {
    //this.rotate({deg:90},callback);
    debugger;
    var img = this.obj;
    var canvas = this.canvas;
    var context = canvas.getContext("2d");
    if( this.drew ) {
        img = SubImage.getDeepCopyOfCanvas(canvas);
    }

    //先绘图
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img,0,0,img.width,img.height);

    var xLen = img.width;
    var yLen = img.height;
    var imageData = context.getImageData(0,0,xLen,yLen);
    var data = imageData.data;	//图像原数据
    var len = data.length;
    var red;
    var green;
    var blue;
    var alpha; //存储rgba的a的值
    var cutTop = 0; //修剪的头高
    var cutBottom = 0; //修剪的低高
    var cutLeft = 0; //修剪的左宽
    var cutRight = 0; //修剪的右宽
    var edge = config.edge;

    //扫描上边
    for( var i = 0; i < len / (xLen * 4); i++) {
        var flag = 0; //该行是否有非透明点， 默认：无非透明点
        for( var j = i * (xLen * 4); j < (i+1) * (xLen * 4); j += 4 ) {    //遍历当前边每个点
            red = data[j];
            green = data[j+1];
            blue = data[j+2];
            alpha = data[j+3];
            if( red >= edge.R[0] && red <= edge.R[1] 
                && green >= edge.G[0] && green <= edge.G[1] 
                && blue >= edge.B[0] && blue <= edge.B[1] ) {
                flag++;   //
                //break;
            }
        }
        if( flag > 200 && cutTop > (yLen / 4) ) {
            break;       //该边扫描完毕
        } else {
            cutTop++;    //高度无效边计数
        }
    }

    //扫描下边
    for( var i = len / (xLen * 4) - 1; i >= 0; i--) {
        var flag = 0; //该行是否有非透明点， 默认：无非透明点
        for( var j = i * (xLen * 4); j < (i+1) * (xLen * 4); j += 4 ) {  //遍历当前边每个点
            red = data[j];
            green = data[j+1];
            blue = data[j+2];
            alpha = data[j+3];
            if( red >= edge.R[0] && red <= edge.R[1]
                && green >= edge.G[0] && green <= edge.G[1]
                && blue >= edge.B[0] && blue <= edge.B[1] ) {
                flag++;   //找到非透明点
                // break;
            }
        }
        if( flag > 200 ) {
            break;       //该边扫描完毕
        } else {
            cutBottom++;    //高度无效边计数
        }
    }

    //扫描左边
    for( var i = 0;  i < len / (yLen * 4); i++) {
        var flag = 0; 	//该行是否有非透明点， 默认：无非透明点
        for( var j = i * 4; j <= len - ((xLen - i) * 4); j += (xLen * 4) ) {  //遍历当前边每个点
            red = data[j];
            green = data[j+1];
            blue = data[j+2];
            alpha = data[j+3];
            if( red >= edge.R[0] && red <= edge.R[1]
                && green >= edge.G[0] && green <= edge.G[1]
                && blue >= edge.B[0] && blue <= edge.B[1] ) {
                flag++;   //找到非透明点
                // break;
            }
        }
        if( flag > 200 ) {
            break;       //该边扫描完毕
        } else {
            cutLeft++;    //高度无效边计数
        }
    }

    //扫描右边
    for( var i = len / (yLen * 4) - 1;  i >= 0 ; i--) {
        var flag = 0; 	//该行是否有非透明点， 默认：无非透明点
        for( var j = i * 4; j <= len - ((xLen - i) * 4); j += (xLen * 4) ) {  //遍历当前边每个点
            red = data[j];
            green = data[j+1];
            blue = data[j+2];
            alpha = data[j+3];
            if( red >= edge.R[0] && red <= edge.R[1]
                && green >= edge.G[0] && green <= edge.G[1]
                && blue >= edge.B[0] && blue <= edge.B[1] ) {
                flag++;   //找到非透明点
                // break;
            }
        }
        if( flag > 200 ) {
            break;       //该边扫描完毕
        } else {
            cutRight++;    //高度无效边计数
        }
    }

    //确定剪切区域的宽度
    var _w = img.width - cutLeft - cutRight;
    var _h = img.height - cutTop - cutBottom;
    this.image.width = canvas.width = _w;
    this.image.height = canvas.height = _h;

    context.drawImage(img,cutLeft,cutTop,_w,_h,0,0,_w,_h);

    this.drew = true;
    var _imgData = canvas.toDataURL(this.getFormat());
    callback.call(this,_imgData);

    //去除边界
    //创建mark实例(SubImage类型）
    new SubImage(_imgData,function () {
        var img = this.obj;
        var canvas = this.canvas;
        var context = canvas.getContext("2d");
        if( this.drew ) {
            img = SubImage.getDeepCopyOfCanvas(canvas);
        }

        //先绘图
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img,0,0,img.width,img.height);

        //去除边界边
        var xLen = img.width;
        var yLen = img.height;
        var imageData = context.getImageData(0,0,xLen,yLen);
        var data = imageData.data;  //图像原数据
        var len = data.length;
        var red;
        var green;
        var blue;
        var alpha; //存储rgba的a的值
        var cutTop = 0; //修剪的头高
        var cutBottom = 0;  //修剪的低高
        var cutLeft = 0; //修剪的左宽
        var cutRight = 0; //修剪的右宽
        var edge = config.edge;

        //扫描上边
        for( var i = 0; i < len / (xLen * 4); i++) {
            var flag = 0; //该行是否有非透明点， 默认：无非透明点
            for( var j = i * (xLen * 4); j < (i+1) * (xLen * 4); j += 4 ) {    //遍历当前边每个点
                red = data[j];
                green = data[j+1];
                blue = data[j+2];
                alpha = data[j+3];
                if( red >= edge.R[0] && red <= edge.R[1]
                    && green >= edge.G[0] && green <= edge.G[1]
                    && blue >= edge.B[0] && blue <= edge.B[1] ) {
                    flag++;   //
                    //break;
                }
            }
            if( flag > 100 ) {
                cutTop++;    //高度无效边计数
            } else {
                break;       //该边扫描完毕
            }
        }

        //扫描下边
        for( var i = len / (xLen * 4) - 1; i >= 0; i--) {
            var flag = 0; //该行是否有非透明点， 默认：无非透明点
            for( var j = i * (xLen * 4); j < (i+1) * (xLen * 4); j += 4 ) {  //遍历当前边每个点
                red = data[j];
                green = data[j+1];
                blue = data[j+2];
                alpha = data[j+3];
                if( red >= edge.R[0] && red <= edge.R[1]
                    && green >= edge.G[0] && green <= edge.G[1]
                    && blue >= edge.B[0] && blue <= edge.B[1] ) {
                    flag++;   //找到非透明点
                    // break;
                }
            }
            if( flag > 100 ) {
                cutBottom++;    //高度无效边计数
            } else {
                break;       //该边扫描完毕
            }
        }

        //扫描左边
        for( var i = 0;  i < len / (yLen * 4); i++) {
            var flag = 0;   //该行是否有非透明点， 默认：无非透明点
            for( var j = i * 4; j <= len - ((xLen - i) * 4); j += (xLen * 4) ) {  //遍历当前边每个点
                red = data[j];
                green = data[j+1];
                blue = data[j+2];
                alpha = data[j+3];
                if( red >= edge.R[0] && red <= edge.R[1]
                    && green >= edge.G[0] && green <= edge.G[1]
                    && blue >= edge.B[0] && blue <= edge.B[1] ) {
                    flag++;   //找到非透明点
                    // break;
                }
            }
            if( flag > 200 ) {
                cutLeft++;    //高度无效边计数
            } else {
                break;       //该边扫描完毕
            }
        }

        //扫描右边
        for( var i = len / (yLen * 4) - 1;  i >= 0 ; i--) {
            var flag = 0;   //该行是否有非透明点， 默认：无非透明点
            for( var j = i * 4; j <= len - ((xLen - i) * 4); j += (xLen * 4) ) {  //遍历当前边每个点
                red = data[j];
                green = data[j+1];
                blue = data[j+2];
                alpha = data[j+3];
                if( red >= edge.R[0] && red <= edge.R[1]
                    && green >= edge.G[0] && green <= edge.G[1]
                    && blue >= edge.B[0] && blue <= edge.B[1] ) {
                    flag++;   //找到非透明点
                    // break;
                }
            }
            if( flag > 200 ) {
                cutRight++;    //高度无效边计数
            } else {
                break;       //该边扫描完毕
            }
        }

        //确定剪切区域的宽度
        var _w = img.width - cutLeft - cutRight;
        var _h = img.height - cutTop - cutBottom;
        this.image.width = canvas.width = _w;
        this.image.height = canvas.height = _h;

        context.drawImage(img,cutLeft,cutTop,_w,_h,0,0,_w,_h);

        this.drew = true;
        var _imgData = canvas.toDataURL(this.getFormat());
        callback.call(this,_imgData);

        //去除条边
        //创建实例(SubImage类型）
        new SubImage(_imgData,function () {
            var img = this.obj;
            var canvas = this.canvas;
            var context = canvas.getContext("2d");
            if( this.drew ) {
                img = SubImage.getDeepCopyOfCanvas(canvas);
            }

            //先绘图
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img,0,0,img.width,img.height);

            //去除边界边
            var xLen = img.width;
            var yLen = img.height;
            var imageData = context.getImageData(0,0,xLen,yLen);
            var data = imageData.data;  //图像原数据
            var len = data.length;
            var red;
            var green;
            var blue;
            var alpha; //存储rgba的a的值
            var cutTop = 0; //修剪的头高
            var cutBottom = 0;  //修剪的低高
            var cutLeft = 0; //修剪的左宽
            var cutRight = 0; //修剪的右宽
            var edge = config.edge;

            //扫描上边
            for( var i = 0; i < len / (xLen * 4); i++) {
                var flag = 0; //该行是否有非透明点， 默认：无非透明点
                for( var j = i * (xLen * 4); j < (i+1) * (xLen * 4); j += 4 ) {    //遍历当前边每个点
                    red = data[j];
                    green = data[j+1];
                    blue = data[j+2];
                    alpha = data[j+3];
                    if( red >= edge.R[0] && red <= edge.R[1]
                        && green >= edge.G[0] && green <= edge.G[1]
                        && blue >= edge.B[0] && blue <= edge.B[1] ) {
                        flag++;   //
                        //break;
                    }
                }
                if( flag > 100 ) {
                    cutTop++;    //高度无效边计数
                } else {
                    break;       //该边扫描完毕
                }
            }

            //扫描下边
            for( var i = len / (xLen * 4) - 1; i >= 0; i--) {
                var flag = 0; //该行是否有非透明点， 默认：无非透明点
                for( var j = i * (xLen * 4); j < (i+1) * (xLen * 4); j += 4 ) {  //遍历当前边每个点
                    red = data[j];
                    green = data[j+1];
                    blue = data[j+2];
                    alpha = data[j+3];
                    if( red >= edge.R[0] && red <= edge.R[1]
                        && green >= edge.G[0] && green <= edge.G[1]
                        && blue >= edge.B[0] && blue <= edge.B[1] ) {
                        flag++;   //找到非透明点
                        // break;
                    }
                }
                if( flag > 100 ) {
                    cutBottom++;    //高度无效边计数
                } else {
                    break;       //该边扫描完毕
                }
            }

            //扫描左边
            for( var i = 0;  i < len / (yLen * 4); i++) {
                var flag = 0;   //该行是否有非透明点， 默认：无非透明点
                for( var j = i * 4; j <= len - ((xLen - i) * 4); j += (xLen * 4) ) {  //遍历当前边每个点
                    red = data[j];
                    green = data[j+1];
                    blue = data[j+2];
                    alpha = data[j+3];
                    if( red >= edge.R[0] && red <= edge.R[1]
                        && green >= edge.G[0] && green <= edge.G[1]
                        && blue >= edge.B[0] && blue <= edge.B[1] ) {
                        flag++;   //找到非透明点
                        // break;
                    }
                }
                if( flag > 200 ) {
                    cutLeft++;    //高度无效边计数
                } else {
                    break;       //该边扫描完毕
                }
            }

            //扫描右边
            for( var i = len / (yLen * 4) - 1;  i >= 0 ; i--) {
                var flag = 0;   //该行是否有非透明点， 默认：无非透明点
                for( var j = i * 4; j <= len - ((xLen - i) * 4); j += (xLen * 4) ) {  //遍历当前边每个点
                    red = data[j];
                    green = data[j+1];
                    blue = data[j+2];
                    alpha = data[j+3];
                    if( red >= edge.R[0] && red <= edge.R[1]
                        && green >= edge.G[0] && green <= edge.G[1]
                        && blue >= edge.B[0] && blue <= edge.B[1] ) {
                        flag++;   //找到非透明点
                        // break;
                    }
                }
                if( flag > 200 ) {
                    cutRight++;    //高度无效边计数
                } else {
                    break;       //该边扫描完毕
                }
            }

            //确定剪切区域的宽度
            var _w = img.width - cutLeft - cutRight;
            var _h = img.height - cutTop - cutBottom;
            this.image.width = canvas.width = _w;
            this.image.height = canvas.height = _h;

            context.drawImage(img,cutLeft,cutTop,_w,_h,0,0,_w,_h);

            this.drew = true;
            var _imgData = canvas.toDataURL(this.getFormat());
            callback.call(this,_imgData);
        });
    });
}

module.exports = SubImage;