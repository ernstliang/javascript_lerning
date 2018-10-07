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