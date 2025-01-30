/**
 * HandsOnTable wrapper
 *
 * @author   Anton Shevchuk
 * @created  09.12.2014 15:17
 */
var table;
table = {
    // ID
    id: 'hot',
    // instance of {Handsontable}
    hot: null,
    // settings of Handsontable
    settings: {
        colHeaders: true,
        colWidths: 120,
        columnSorting: true,
        contextMenu: true,
        dropdownMenu: true,
        manualColumnMove: true,
        manualColumnResize: true,
        manualRowMove: true,
        minSpareRows: 5,
        rowHeaders: true,
        startCols: 10,
        startRows: 5,
        stretchH: 'all',
        afterChange: function (changes, source) {
            if (source !== 'loadData') {
                chart.redraw();
            }
        },
        afterColumnSort: function (col, order) {
            table.sortCol = col;
            table.sortOrder = order;
            chart.redraw();
        },
    },
    sortCol: null,
    sortOrder: null,
    /**
     * Init Handsontable instance
     */
    init: function () {
        // create instance
        table.hot = new Handsontable(
            document.getElementById(table.id),
            table.settings
        );
    },
    /**
     * Setup data from google.visualization.ChartWrapper class
     *   [
     *     [val1, val2, val3],
     *     [val3, val5, val6]
     *   ]
     * @param raw
     */
    load: function (raw) {
        let i, j, headers = [], data = [
            [] // cols data
        ];

        // apply column headers
        for (i = 0; i < raw.dataTable.cols.length; i++) {
            headers.push(raw.dataTable.cols[i].label);
        }

        // apply data
        for (i = 0; i < raw.dataTable.rows.length; i++) {
            data[i] = [];
            for (j = 0; j < raw.dataTable.rows[i].c.length; j++) {
                data[i][j] = raw.dataTable.rows[i].c[j].v;
            }
        }
        table.settings.data = data;
        // table.settings.colHeaders = headers;
    },
    /**
     * Set data
     *   [
     *     [head1, head2, head3],
     *     [val1, val2, val3],
     *     [val3, val5, val6]
     *   ]
     * @param {Array} raw
     */
    setData: function (raw) {
        // table.settings.colHeaders = raw.shift();
        table.settings.data = raw;
    },
    /**
     * Get not empty data from table
     * @returns {Array}
     */
    getData: function () {
        // retrieve and filter data
        let rawData = table.hot.getData();

        // filter empty fields
        let cleanData = rawData.filter(function (item) {
            for (let i = 0; i < item.length; i++) {
                if (item[i] !== null && item[i] !== "") {
                    return true;
                }
            }
            return false;
        });

        // apply parseFloat
        cleanData = cleanData.map(function (item) {
            for (let i = 1; i < item.length; i++) {
                if (!isNaN(parseFloat(item[i]))) {
                    item[i] = parseFloat(item[i]);
                }
            }
            return item;
        });

        // apply sort
        if (table.sortCol !== null) {
            cleanData.sort(function (a, b) {
                if (table.sortOrder) {
                    return a[table.sortCol] > b[table.sortCol];
                } else {
                    return a[table.sortCol] < b[table.sortCol];
                }
            });
        }

        // retrieve headers
        // cleanData.unshift(table.hot.getColHeader());
        return cleanData;
    },
    /**
     * Clear Table
     * @returns {boolean}
     */
    clear: function () {
        if (confirm("Are sure want to clean current data?")) {
            table.hot.clear();
        }
        return false;
    },
    /**
     * Add new column
     * @returns {boolean}
     */
    addColumn: function () {
        table.hot.alter('insert_col');
        return false;
    },
    /**
     * Add new row
     * @returns {boolean}
     */
    addRow: function () {
        table.hot.alter('insert_row');
        return false;
    },
    /**
     * Add new rows
     * @param total
     * @returns {boolean}
     */
    addRows: function (total) {
        for (let i = 0; i < total; i++) {
            table.hot.alter('insert_row');
        }
        return false;
    }
};
