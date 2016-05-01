
//寄生组合式继承，这里使用寄生式继承来继承超类型的原型
var inheritPrototype = function (subType, superType) {
    var prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
};

module.exports = inheritPrototype;