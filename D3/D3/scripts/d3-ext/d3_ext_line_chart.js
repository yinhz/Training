/// <reference path="../d3/d3.js" />

if (!d3) { throw new Error("d3-ext-line-chart requires d3") }

+function (d3) {
    'use strict';
    var version = d3.version.split(' ')[0].split('.')
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
        throw new Error('d3-ext-chart\'s JavaScript requires d3 version 1.9.1 or higher')
    }
}(d3);

//(function (window, factory) {
//    factory(window.d3yhzChart = window.d3yhzChart || {});
//})(window, function (exports) {
//    'use strict';
//    var version = "1.0.0";

//    function lineChart() {
//        alert("aaa");
//    }

//    exports.version = version;
//    exports.lineChart = lineChart;
//});

(function (window) {

    var d3yhzChart = {
    };
    d3yhzChart.version = "1.0.0";

    var lineChart = function () {

        // local paras
        function lineChart(data) {
            var _svg = d3.select(data.svg),
                _margin = data.margin,
                _data = data.data;

            var _svgWidth = _svg.attr("width"),
                _svgHeight = _svg.attr("width");

            var _chartWidth = _svgWidth - 2 * _margin;
            var _chartHeight = _svgHeight - 2 * _margin;

            // 这里是画线用。
            var x = d3.scaleLinear()
                .domain([0, 10])
                .range([_margin, _svgWidth - _margin]);

            var y = d3.scaleLinear()
                .domain([0, 10])
                .range([_svgHeight - _margin, _margin]);

            // d3 内置的 线
            var line = d3.line()
            // 【设定2条线之间 如何进行连接】
            .curve(d3.curveCardinal)
            .x(function (d) { return x(d.x); })
            .y(function (d) { return y(d.y); });

            if ("绘制 折线") {
                _svg
                    .selectAll("path.line")
                    .data(_data)
                    .enter()
                    .append("path")
                    .classed("line", true)
                    // 在 svg 中 用 线 来画出 这个 path
                    .attr("d", line);

                // data 是集合的集合。所以这里再次画圆的时候 需要遍历
                // 因为对线 来说 就是 2个集合。但是在绘制圆的时候 需要的是 2个 集合里的 每个点
                _data.forEach(
                    function (v) {
                        // 这里 append g 是为了防止第二次循环的时候 把之前的 circle 取出来
                        _svg
                            .append("g").selectAll("circle")
                            .data(v)
                            .enter()
                            .append("circle")
                            .attr("class", "dot")
                            .attr("cx", function (d) { return x(d.x); })    // left
                            .attr("cy", function (d) { return y(d.y); })    // top
                            .attr("r", 4.5);
                    }
                    );
            }

            if (data.showArea) {
                var area = d3.area()
                    .x(function (d) {
                        return x(d.x);
                    })
                    .y0(y(0))
                    .y1(function (d) { return y(d.y); });

                // 画 area
                _svg
                    .selectAll("path.area")
                    .data(_data)
                    .enter()
                    .append("path")
                    .classed("area", true)
                    .attr("d", area);
            }

            if ("绘制X轴与Y轴及网格线") {
                _svg
                    .append("g")
                    .classed("x-axis", true)
                    // x 轴起点
                    .attr("transform", "translate(" + _margin + "," + (_svgHeight - _margin) + ")")
                    .call(
                        d3.axisBottom(
                            d3.scaleLinear()
                                .domain([0, 10])
                                .range([0, _chartWidth])
                            )
                    );

                _svg
                    .append("g")
                    .classed("y-axis", true)
                    // y 轴起点
                    .attr("transform", "translate(" + _margin + "," + _margin + ")")
                    .call(
                        d3.axisLeft(
                            d3.scaleLinear()
                                .domain([10, 0])
                                .range([0, _chartWidth])
                            )
                    );

                if (data.showGridlines) {
                    d3.selectAll("g.x-axis g.tick")
                        .filter(function (d, i) {
                            if (i > 0) {
                                return this;
                            }
                        })
                        .append("line")
                        .classed("grid-line", true)
                        .attr("x1", 0.5)
                        .attr("y1", 0)
                        .attr("x2", 0.5)
                        .attr("y2", -_chartHeight)
                        .attr("stroke", d3.schemeCategory10[0]);

                    d3.selectAll("g.y-axis g.tick")
                        .append("line")
                        .classed("grid-line", true)
                        .attr("x1", 0)
                        .attr("y1", 0.5)
                        .attr("x2", _chartWidth)
                        .attr("y2", 0.5)
                        .attr("stroke", d3.schemeCategory10[0]);

                    d3.selectAll("g.y-axis g.tick:last-child .grid-line")
                        .remove();
                }
            }

            _svg.append("path")
                .classed("star", true)
                .attr("transform", "translate(80,80)")
                .attr("d", d3.symbol().type(d3.symbolStar));
            _svg.append("path")
                .classed("star", true)
                .attr("transform", "translate(90,90)")
                .attr("d", d3.symbol().type(d3.symbolCircle));
            _svg.append("path")
                .classed("star", true)
                .attr("transform", "translate(100,100)")
                .attr("d", d3.symbol().type(d3.symbolCross));
            _svg.append("path")
                .classed("star", true)
                .attr("transform", "translate(110,110)")
                .attr("d", d3.symbol().type(d3.symbolDiamond));


            _svg.append("circle")
                .classed("circle", true)
                .attr("transform", "translate(150,150)")
            .attr("cx", "0")
            .attr("cy", "0")
            .attr("r", "50");

            _svg.append("rect")
                .classed("rect", true)
                .attr("transform", "translate(250,100)")
            .attr("x", "0")
            .attr("y", "0")
            .attr("width", "50")
            .attr("height", "100");
        }

        return lineChart;

    }
    function lineAreaChart() {
    };

    d3yhzChart.lineChart = lineChart;
    d3yhzChart.lineAreaChart = lineAreaChart;

    window.d3yhzChart = d3yhzChart;

})(window);