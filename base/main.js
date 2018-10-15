//开启严格模式
// "use strict";

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
console.log(fakevar2);
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
console.log(g2(), y);
console.log(f(), x);
console.log(g(), y); // g() -> 'local'; y -> 'globalchanged'

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


// function inherit(Target, Origin) {
//     function F() {}
//     F.prototype = Origin.prototype;
//     Target.prototype = new F();
//     Target.prototype.constuctor = Target;
//     Target.prototype.uber = Origin.prototype;
// }

//圣杯模式
var inherit = (function () {
    var F = function () {};
    return function (Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constuctor = Target;
        Target.prototype.uber = Origin.prototype;
    };
}());

Father.prototype.lastName = "Liang";
function Father() {
    this.secondName = "xiaoqing";
}

function Son() {
    this.secondName = "jingcheng";
}

inherit(Son, Father);

var son = new Son();
var father = new Father();

// var num = window.promp

function mul(n) {
    if (n <= 1)
        return 1;
    return n * mul(n - 1);
}

var str = false + 1;
document.write(str);

var demo = false == 1;
document.write(demo);

if (typeof(a) && -true + (+undefined) + "") {
    document.write('基础扎实');
}

if (11 + "11" * 2 == 33) {
    document.write('基础扎实2');
}

var x = 1;
if (function f() {}) {
    x += typeof f;
    console.log(typeof f);
}
console.log(x);

var index_random = Math.random() * 4;
var index = Math.floor(index_random);
console.log(index_random);
console.log(index);

console.log("this");
var a = 5;
function test() {
    a = 0;
    console.log(a);
    console.log("this is " + this);
    console.log(this.a);
    var a;
    console.log(a);
}
test();
new test();

console.log("this2");

function print() {
    var marty = {
        name: "marty",
        printName: function(){console.log(this.name);}
    }
    var test1 = { name: "test1" };
    var test2 = { name: "test2" };
    var test3 = { name: "test3" };
    test3.printName = marty.printName;
    var printName2 = marty.printName.bind({name: 123});
    marty.printName.call(test1);
    marty.printName.apply(test2);
    marty.printName();
    printName2();
    test3.printName();
}
print();