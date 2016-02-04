//util.inherits
//util.inherits(constructor, superConstructor)是一个实现对象间原型继承 的函数。
//JavaScript 的面向对象特性是基于原型的，与常见的基于类的不同。JavaScript 没有 提供对象继承的语言级别特性，而是通过原型复制来实现的。
//在这里我们只介绍util.inherits 的用法，示例如下：
var util = require('util');
function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function() {
        console.log('Hello ' + this.name);
    };
}
Base.prototype.showName = function() {
    console.log(this.name);
};
function Sub() {
    this.name = 'sub';
}
util.inherits(Sub, Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
var objSub = new Sub();
objSub.showName();
//objSub.sayHello();
console.log(objSub);


//util.inspect
// util.inspect(object,[showHidden],[depth],[colors])
var util = require('util');
function Person() {
    this.name = 'byvoid';
    this.toString = function() {
        return this.name;
    };
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));

var util = require('util');

//isArray
util.isArray([])
// true
util.isArray(new Array)
// true
util.isArray({})
// false

//util.isRegExp(object)
//如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。
var util = require('util');
util.isRegExp(/some regexp/)
// true
util.isRegExp(new RegExp('another regexp'))
// true
util.isRegExp({})
// false

//util.isDate(object)
//如果给定的参数 "object" 是一个日期返回true，否则返回false。
var util = require('util');
util.isDate(new Date())
// true
util.isDate(Date())
// false (without 'new' returns a String)
util.isDate({})
// false

//util.isError(object)
//如果给定的参数 "object" 是一个错误对象返回true，否则返回false。
var util = require('util');
util.isError(new Error())
// true
util.isError(new TypeError())
// true
util.isError({ name: 'Error', message: 'an error occurred' })
// false