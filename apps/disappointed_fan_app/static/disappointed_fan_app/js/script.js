var url = "http://localhost:8000/" + "data.json"

d3.json(url, function(d) {

  var tagscounter = [],
      dates = [],
      margin = { top: 0, right: 0, bottom: 30, left: 20 },
      height =  window.innerHeight * (7/10),
      width = window.innerWidth * (5/10);
      // innerRadius = Math.min(width,height)/3,
      // outerRadius = innerRadius + 30;
      // height = 200 - margin.top - margin.bottom,
      // width = 300 - margin.left - margin.right;


  var   tempColor,
        yScale,
        yAxisValues,
        yAxisTicks,
        yGuide,
        xScale,
        xAxisValues,
        xAxisTicks,
        xGuide,
        colors,
        tooltip,
        myChart;

  for (var i = 0; i<d.data.length; i++) {
    tagscounter.push(d.data[i]);
    dates.push( new Date(d.datetweet[i]) );
  }

  yScale = d3.scaleLinear()
    .domain([0, d3.max(tagscounter)])
    .range([0,height]);

  yAxisValues = d3.scaleLinear()
    .domain([0, d3.max(tagscounter)])
    .range([height,0]);

  yAxisTicks = d3.axisLeft(yAxisValues)
  .ticks(10)

  xScale = d3.scaleBand()
    .domain(tagscounter)
    .paddingInner(.1)
    .paddingOuter(.1)
    .range([0, width])

  xAxisValues = d3.scaleTime()
    .domain([dates[0],dates[(dates.length-1)]])
    .range([0, width])

  xAxisTicks = d3.axisBottom(xAxisValues)
    .ticks(d3.timeDay.every(1))

  colors = d3.scaleLinear()
    .domain([0, 100, d3.max(tagscounter)])
    .range(['#FFFFFF', '#2D8BCF', '#DA3637'])

  tooltip = d3.select('body')
    .append('div')
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('opacity', 0);

  myChart = d3.select('#viz').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.right + ')')
    .selectAll('rect').data(tagscounter)
    .enter().append('rect')
      .attr('fill', colors)
      .attr('width', function(d) {
        return xScale.bandwidth();
      })
      .attr('height', 0)
      .attr('x', function(d) {
        return xScale(d);
      })
      .attr('y', height)

      .on('mouseover', function(d) {
        tooltip.transition().duration(200)
          .style('opacity', .9)
        tooltip.html(
          '<div style="font-size: 2rem; font-weight: bold">' +
            d + '</div>'
        )
          .style('left', (d3.event.pageX -35) + 'px')
          .style('top', (d3.event.pageY -30) + 'px')
        tempColor = this.style.fill;
        d3.select(this)
          .style('fill', 'yellow')
      })

      .on('mouseout', function(d) {
        tooltip.html('')
        d3.select(this)
          .style('fill', tempColor)
      });

  yGuide = d3.select('#viz svg').append('g')
            .attr('transform', 'translate(20,0)')
            .call(yAxisTicks)

  xGuide = d3.select('#viz svg').append('g')
            .attr('transform', 'translate(20,'+ height + ')')
            .call(xAxisTicks)

  myChart.transition()
    .attr('height', function(d) {
      return yScale(d);
    })
    .attr('y', function(d) {
      return height - yScale(d);
    })
    .delay(function(d, i) {
        return i * 20;
    })
    .duration(1000)
    .ease(d3.easeBounceOut)

}); // json import



$(document).ready(function(){
  // toggle functions for the Mobile Landing Page
  var howCheck = 1
  var whyCheck = 1
    $('#how').click(function(){
        if (howCheck) {
            $('#how-data').slideToggle();
            howCheck = 0;
        }else{
            $('#how-data').slideToggle();
            howCheck = 1;
        }
    })
    $('#why').click(function(){
        if (whyCheck) {
            $('#why-data').slideToggle();
            whyCheck = 0;
        }else{
            $('#why-data').slideToggle();
            whyCheck = 1;
        }
    })
    function picked() {
        var choice = document.getElementById("firstchoice").value;
        if (choice == "Baseball") {
            $("#none").hide();
            $("#baseball").show();
            $("#soccer").hide();
            $("#hockey").hide();
            $("#basketball").hide();
        } else if (choice == "Soccer") {
            $("#none").hide();
            $("#baseball").hide();
            $("#soccer").show();
            $("#hockey").hide();
            $("#basketball").hide();
        }else if(choice == "Hockey"){
            $("#none").hide();
            $("#baseball").hide();
            $("#soccer").hide();
            $("#hockey").show();
            $("#basketball").hide();
        }else if(choice == "Basketball"){
            $("#none").hide();
            $("#baseball").hide();
            $("#soccer").hide();
            $("#hockey").hide();
            $("#basketball").show();
        }
    }
});