var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
var radiusBackground = function() {
  var self = this;

  self.draw = function(chartInstance) {
    if(chartInstance.options.radiusBackground) {
      var x = chartInstance.chart.canvas.clientWidth / 2,
          y = chartInstance.chart.canvas.clientHeight / 2,
          ctx = chartInstance.chart.ctx;

      ctx.beginPath();
      ctx.arc(x, y, chartInstance.outerRadius - (chartInstance.radiusLength / 2), 0, 2 * Math.PI);
      ctx.lineWidth = chartInstance.radiusLength;
      ctx.strokeStyle = chartInstance.options.radiusBackground.color || '#d1d1d1';
      ctx.stroke();
    }
  };

  // see http://www.chartjs.org/docs/#advanced-usage-creating-plugins for plugin interface
  return {
    beforeDatasetsDraw: self.draw,
    onResize: self.draw
  }
};

// Register with Chart JS
Chart.plugins.register(new radiusBackground());

var chartElement = document.getElementById('doughnut-chart');

var chart = new Chart(chartElement, {
  type: 'doughnut',
  options: {
    // Here is where we enable the 'radiusBackground'
    radiusBackground: {
      color: '#d1d1d1' // Set your color per instance if you like
    },
    cutoutPercentage: 90,
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
  },
  data: {
    labels: ['Insurance', 'Payments', 'Banking & Lending'],
    datasets: [{
      data: [23, 19, 16],
      backgroundColor: ["#a3c7c9","#889d9e","#647678"],
      borderWidth: 0,
      hoverBackgroundColor: ["#96b7b9","#718283","#5c6b6d"]
    }]
  }
});