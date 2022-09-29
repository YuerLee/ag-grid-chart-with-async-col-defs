const columnDefs = [
  { field: 'country', width: 150, chartDataType: 'category' },
  { field: 'group', chartDataType: 'category' },
  {
    field: 'gold',
    chartDataType: 'series',
    editable: true,
    valueParser: numberValueParser,
  },
  {
    field: 'silver',
    chartDataType: 'series',
    editable: true,
    valueParser: numberValueParser,
  },
  {
    field: 'bronze',
    chartDataType: 'series',
    editable: true,
    valueParser: numberValueParser,
  },
  {
    field: 'a',
    chartDataType: 'series',
    editable: true,
    valueParser: numberValueParser,
  },
  {
    field: 'b',
    chartDataType: 'series',
    editable: true,
    valueParser: numberValueParser,
  },
  {
    field: 'c',
    chartDataType: 'series',
    editable: true,
    valueParser: numberValueParser,
  },
  {
    field: 'd',
    chartDataType: 'series',
    editable: true,
    valueParser: numberValueParser,
  },
];

const gridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  rowData: getData(),
  enableRangeSelection: true,
  enableCharts: true,
  onFirstDataRendered,
  onGridColumnsChanged,
  getChartToolbarItems,
  popupParent: document.body,
};

let chart1;
let chart2;

function onFirstDataRendered(event) {
  console.log('ColDefs in onFirstDataRendered', event.api.getColumnDefs());

  handleChart1(event);
}

function onGridColumnsChanged(event) {
  console.log('ColDefs in onGridColumnsChanged', event.api.getColumnDefs());

  handleChart2(event);
}

function handleChart1(event) {
  chart1?.destroyChart();

  var eContainer1 = document.querySelector('#chart1');
  var params1 = {
    cellRange: {
      rowStartIndex: 0,
      rowEndIndex: 4,
      columns: ['country', 'gold', 'silver'],
    },
    chartType: 'groupedBar',
    chartContainer: eContainer1,
  };

  chart1 = event.api.createRangeChart(params1);
}

function handleChart2(event) {
  chart2?.destroyChart();

  var eContainer2 = document.querySelector('#chart2');
  var params2 = {
    cellRange: {
      columns: ['group', 'gold'],
    },
    chartType: 'pie',
    chartContainer: eContainer2,
    aggFunc: 'sum',
    chartThemeOverrides: {
      common: {
        padding: {
          top: 20,
          left: 10,
          bottom: 30,
          right: 10,
        },
        legend: {
          enabled: true,
          position: 'bottom',
        },
      },
    },
  };

  chart2 = event.api.createRangeChart(params2);
}

function numberValueParser(params) {
  var res = Number.parseInt(params.newValue);

  if (isNaN(res)) {
    return undefined;
  }

  return res;
}

function getChartToolbarItems(params) {
  return [];
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  const grid = new agGrid.Grid(gridDiv, gridOptions);

  setTimeout(() => {
    console.log('set ColumnDefs');
    gridOptions.api.setColumnDefs(columnDefs);
  }, 1000);
});
