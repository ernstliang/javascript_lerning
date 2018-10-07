//开启严格模式
"use strict";

// 3.9
scope = "global";
function checkscope() {
    var scope = "local";
    return scope;
}
console.log("run js?");
console.log("global: " + scope);
console.log(checkscope());
// console.log("global: " + scope);

var scope = "global scope";
function checkscope2() {
    var scope = "local scope";
    function nested() {
        var scope = "nested scope";
        return scope;
    }
    return nested();
}
console.log("checkscope2: " + checkscope2());
console.log("global scope: " + scope);

// 3.10.1
function test(o) {
    var i = 0;
    console.log(typeof o);
    if (typeof o == "object") {
        var j = 0;
        for (var k = 0; k < 10; k++) {
            // console.log(k);
        }
        console.log(k);
    }
    console.log(j);
}
test(null);

// 3.10.2
var truevar = 1;
var fakevar = 2;
this.fakevar2 = 3;
console.log(truevar);
console.log(fakevar);
// console.log(fakevar2);
// console.log(delete truevar);
// console.log(delete fakevar);
console.log(delete this.fakevar2);

// 4.12.2 eval
var geval = eval;
var x = 'global', y = 'global';

function f() {
    var x = 'local';
    eval("x += 'changed';");
    return x;
}
function g() {
    
    var y = "local";
    geval("y += 'changed';");//会执行全局变量修改， y += 'changed'; y = 'global' + 'changed'; y = 'globalchanged'
    return y;
}
var g2 = function xg() {
    var y = "local";
    y = g();
    return y;
}
// console.log(g2(), y);
// console.log(f(), x);
// console.log(g(), y); // g() -> 'local'; y -> 'globalchanged'

// 标签语句
var token = 10;
mloop:
    while(token > 0) {
        console.log(token--);
        continue mloop;
    }

// 5.6.5 throw
console.log('5.6.5');
function factorial(x) {
    if (x < 0) throw new Error("x不能是负数");
    for (var f = 1; x > 1; f *= x, x--); /* empty */
    // console.log("f: " + f);
    return f;
}
console.log(factorial(10));
console.log(factorial(5));
// console.log(factorial(1));

// 5.6.6
console.log('5.6.6');
function testCatch(x) {
    var f = 0;
    try {
        return factorial(x);
    } catch(e) {
        console.log(e);
    } finally {
        console.log('x: ' + x + " finally");
    }
    return f;
}
console.log(testCatch(-1));
console.log(testCatch(10));

// try {
//     var n = Number(prompt("请输入一个正整数", ""));
//     var f = factorial(n);
//     alert(n + "| = " + f);
// } catch (ex) {
//     alert(ex);
// }

//5.7.2
function f3(o) {
    if (o == undefined) debugger;
    console.log(typeof o);
}
f3(new Date());

// 6.1.1
console.log('6.1.1');
var empty = {}; //没有任何属性的对象
var point = {x:0, y:0}; //两个属性
var point2 = { x:point.x, y:point.y+1 }; //使用point属性的对象
var book = {
    "main title": "JavaScript", //属性名字里有空格，必须使用字符串表示
    "sub-title": "The Definitive Guide", //属性名字里有连字符，必须使用字符串表示
    "for": "all audiences", // "for"是保留字，必须用引号
    author: { //这个属性的值是一个对象
        firstname: "David", //注意，这里的属性名都没有引号
        surname: "Flanagan"
    }
};

// 6.1.2 通过new创建对象
var o = new Object(); //创建空对象
var a = new Array(); //空数组
var d = new Date(); //时间的date对象
// var r = new ReqExp("js"); //创建一个可以进行模式匹配的RegExp对象

console.log(typeof o);
console.log(typeof a);

var o1 = Object.create({x:1, y:2});
console.log("x:" + o1.x + "y:" + o1.y);
var p1 = Object.create(point);
p1.x = 1;
p1.y = 2;
console.log("x:" + p1.x + " y:" + p1.y);

var o2 = Object.create(null);
var o3 = Object.create(Object.prototype);

// inherit() 返回一个继承自原型对象p的属性的新对象
// 优先使用ECMAScript 5中的Object.create()函数
// 如果不存在Object.create(), 则退化使用其他方法
function inherit(p) {
    if (p == null) throw TypeError(); // p是一个对象，但不能是null
    if (Object.create)
        return Object.create(p);
    var t = typeof p;
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {}
    f.prototype = p;
    return new f();
}

var o10 = {x:"don't change this value"};
// library_function(inherit(o10)); //防止对o10的意外修改

// 6.2 属性的查询和设置
var author = book.author;
console.log("name: " + author.surname);
var title = book["main title"];
console.log("title: " + title);

book.edition = 6;
book["main title"] = "ECMAScript 5";
console.log("title: " + book["main title"]);

// 6.2.2继承
console.log("6.2.2");
var o11 = {};
o11.x = 1;
var p = inherit(o11);
p.y = 2;
p.x = 5;
var q = inherit(p);
q.z = 3;
var s = q.toString();
console.log(q.x + q.y);
console.log("o11.x: " + o11.x);
console.log(s);

// 9.1
console.log('9.1');
// 这个工厂方法返回一个新的“范围对象”
function range(from, to) {
    // 使用inherit()函数来创建对象
    var r = inherit(range.methods);

    r.from = from;
    r.to = to;
    return r;
}

range.methods = {
    includes: function(x) {
        return this.from <= x && x <= this.to;
    },

    foreach: function(f) {
        for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },

    toString: function() {return "(" + this.from + "..." + this.to + ")";}
};

var r = range(1, 3);
r.includes(2);
r.foreach(console.log);
console.log(r);