"use strict";

/*
 * calculate
*/
function calculate() {
    var amount = document.getElementById("amount");
    var apr = document.getElementById("apr");
    var years = document.getElementById("years");
    var zipcode = document.getElementById("zipcode");
    var payment = document.getElementById("payment");
    var total = document.getElementById("total");
    var totalinterest = document.getElementById("totalinterest");

    //获取输入的值
    var principal = parseFloat(amount.value);
    var interest = parseFloat(apr.value) / 100 / 12;
    var payments = parseFloat(years.value) * 12;
    console.log("principal:" + principal);
    console.log("interest:" + interest);
    console.log("payments:" + payments);

    //计算月还款
    var x = Math.pow(1 + interest, payments);//Math.pow进行幂运算
    var monthly = (principal * x * interest) / (x - 1);
    console.log("monthly:" + monthly);

    //结果正常则显示
    if (isFinite(monthly)) {
        // 将数据填充至输出字段的位置，四舍五入到小数点后两位数字
        payment.innerHTML = monthly.toFixed(2);
        total.innerHTML = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);

        // 将用户的输入数据保存下来，下次访问时也能读取到数据
        save(amount.value, apr.value, years.value, zipcode.value);

        // 用图表展示贷款余额、利息和资产收益
        chart(principal, interest, monthly, payments);
    }
    else {
        // 计算结果数值不正确
        payment.innerHTML = "";
        total.innerHTML = "";
        totalinterest.innerHTML = "";
        chart();
    }
}

/**
 * 将用户输入的数据保存至localStorage对象的属性中
 * 这些属性在再次访问时还会继续保持在原位置
*/
function save(amount, apr, years, zipcode) {
    if (window.localStorage) {
        localStorage.loan_amount = amount;
        localStorage.loan_apr = apr;
        localStorage.loan_years = years;
        localStorage.loan_zipcode = zipcode;
    } else {
        console.error("window.localStorage is false");
    }
}

/**
 * 在文档首次加载时，将会尝试还原输入字段
 */
window.onload = function() {
    // 如果浏览器支持本地存储并且上次保存的值时存在的
    if (window.localStorage && localStorage.loan_amount) {
        // this.console.log("localstorage amount:" + localStorage.loan_amount);
        document.getElementById("amount").value = localStorage.loan_amount;
        document.getElementById("apr").value = this.localStorage.loan_apr;
        this.document.getElementById("years").value = this.localStorage.loan_years;
        this.document.getElementById("zipcode").value = this.localStorage.loan_zipcode;
    }
};


/**
 * 在HTML<canvas>元素中用图表展示月度贷款余额、利息和资产收益
 * 如果不传入参数，则清空之前的图表数据
 */
function chart(principal, interest, monthly, payments){
    // 得到<canvas>标签
    var graph = document.getElementById("graph");
    // 用一种巧妙的手法清楚并重置画布
    graph.width = graph.width;

    if (arguments.length == 0 || !graph.getContext) return;

    // 获得画布元素的context对象，对个对象定义了一组绘画API
    var g = graph.getContext("2d");
    var width = graph.width, height = graph.height; // 获得画布大小

    function paymentToX(n) {
        return n * width / payments;
    }
    function amountToY(a) {
        return height - (a * height / (monthly * payments * 1.05));
    }

    // 付款数据时一条从(0,0)到(payments, monthly*payments)的直线
    g.moveTo(paymentToX(0), amountToY(0)); // 从左下方开始
    g.lineTo(paymentToX(payments), amountToY(monthly * payments)); //绘至右上方
    g.lineTo(paymentToX(payments), amountToY(0)); // 再至右下方
    g.closePath();
    g.fillStyle = "#f88"; //亮红色
    g.fill(); // 填充矩形
    g.font = "bold 12px sans-serif"; //定义一种字体
    g.fillText("Total Interest Payments", 20, 20); //将文字绘制到图像中

    // 很多资产数据并不是线性的，很难将其反映至图表中
    var equity = 0;
    g.beginPath();  // 开始绘制新图形
    g.moveTo(paymentToX(0), amountToY(0));  //左下方
    for (var p = 1; p <= payments; p++) {
        // 计算出每一笔赔付的利息
        var thisMonthsInterest = (principal - equity) * interest;
        equity += (monthly - thisMonthsInterest); //得到资产额
        g.lineTo(paymentToX(p), amountToY(equity)); 
    }
    g.lineTo(paymentToX(payments), amountToY(0));
    g.closePath();
    g.fillStyle = "green";
    g.fill();
    g.fillText("Total Equity", 20, 35);

    // 余额数据显示为黑色粗线条
    var bal = principal;
    g.beginPath();
    g.moveTo(paymentToX(0), amountToY(bal));
    for (var p = 1; p <= payments; p++) {
        var thisMonthsInterest = bal * interest;
        bal -= (monthly - thisMonthsInterest);
        g.lineTo(paymentToX(p), amountToY(bal));
    }
    g.lineWidth = 3;
    g.stroke();
    g.fillStyle = "black";
    g.fillText("Loan Balance", 20, 50);

    // 将年度数据在X轴做标记
    g.textAlign = "center";
    var y = amountToY(0);
    for (var year = 1; year * 12 <= payments; year++) {
        var x = paymentToX(year * 12);
        g.fillRect(x - 0.5, y - 3, 1, 3);
        if (year == 1) g.fillText("Year", x, y - 5);
        if (year % 5 == 0 && year * 12 != payments)
            g.fillText(String(year), x, y - 5);
    }

    // 将赔付数额标记在右边界
    g.textAlign = "right";     //文字右对齐
    g.textBaseline = "middle"; // 文字垂直居中
    var ticks = [monthly * payments, principal];
    var rightEdge = paymentToX(payments);
    for (var i = 0; i < ticks.length; i++) {
        var y = amountToY(ticks[i]);
        g.fillRect(rightEdge - 3, y - 0.5, 3, 1);
        g.fillText(String(ticks[i].toFixed(0)), rightEdge - 5, y);
    }
}