queue()
    .defer(d3.json, "transactions.json")
    .await(makeCharts);

function makeCharts(error, transactionsData) {
    let ndx = crossfilter(transactionsData);
    let parseDate = d3.time.format("%d/%m/%Y").parse;
    transactionsData.forEach(function(d) {
        d["date"] = parseDate(d["date"]);
    })
    let nameDim = ndx.dimension(dc.pluck("name"));
    let dateDim = ndx.dimension(dc.pluck("date"));
    let storeDim = ndx.dimension(dc.pluck("store"));
    let stateDim = ndx.dimension(dc.pluck("state"));
    let genderDim = ndx.dimension(dc.pluck("gender"));
    let pieDim = ndx.dimension(function(d) {
        if (d.spend >= 200) {
            return "> 200 euro";
        }
        else if (d.spend >= 100) {
            return "100-199 euro"
        }
        else {
            return "< 100 euro";
        }
    });

    let totalSpend = nameDim.group().reduceSum(dc.pluck("spend"));
    let totalSpendByDate = dateDim.group().reduceSum(dc.pluck("spend"));
    let pieGroup = pieDim.group();
    let averageDim = ndx.dimension(dc.pluck("name"));
    let averageGroup = averageDim.group().reduce(
        function(p, v) {
            p.count++;
            p.total += v.spend;
            p.average = p.total / p.count;
            return p;
        },
        function(p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            }
            else {
                p.total -= v.spend;
                p.average = p.total / p.count;
            }
            return p;
        },
        function() {
            return { count: 0, total: 0, average: 0 };
        }
    );


    let totalSpendByStore = storeDim.group().reduceSum(dc.pluck("spend"));
    let totalSpendByState = stateDim.group().reduceSum(dc.pluck("spend"));
    let totalSpendByGender = genderDim.group().reduceSum(dc.pluck("spend"));

    let minDate = dateDim.bottom(1)[0].date;
    let maxDate = dateDim.top(1)[0].date;

    let spendChart = dc.barChart("#spend-chart");
    let dateChart = dc.lineChart("#date-chart");
    let bigSmallChart = dc.pieChart("#big-small-chart");
    let storeChart = dc.pieChart("#store-chart");
    let genderChart = dc.pieChart("#gender-chart");
    let averageChart = dc.barChart("#average-chart");

    let personColors = d3.scale.ordinal().range(["red", "green", "blue"]);

    spendChart

        .width(600)
        .height(350)
        .dimension(stateDim)
        .group(totalSpendByState)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Provincie")
        .yAxis().ticks(12);

    dateChart
        .width(500)
        .height(350)
        .dimension(dateDim)
        .group(totalSpendByDate)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .xAxisLabel("Month")
        .yAxis().ticks(5);

    storeChart
        .height(300)
        .radius(100)
        .dimension(storeDim)
        .group(totalSpendByStore);

    genderChart
        .height(300)
        .radius(100)
        .dimension(genderDim)
        .group(totalSpendByGender);

    bigSmallChart
        .radius(200)
        .dimension(pieDim)
        .group(pieGroup);

    averageChart
        .width(500)
        .height(300)
        .dimension(averageDim)
        .group(averageGroup)
        .valueAccessor(function(p) {
            return p.value.average;
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Person")
        .yAxis().ticks(4);


    dc.renderAll();

}
