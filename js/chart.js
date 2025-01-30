/**
 * Google Charts API wrapper
 *
 * @author   Anton Shevchuk
 * @created  09.12.2014 15:27
 */
var chart;
chart = {
    // DOM ID
    id: 'chart',
    /**
     * google.visualization.ChartWrapper
     * @see https://developers.google.com/chart/interactive/docs/reference#chartwrapper-class
     */
    wrap: null,
    /**
     * google.visualization.ChartEditor
     * @see https://google-developers.appspot.com/chart/interactive/docs/reference#google_visualization_charteditor
     */
    editor: null,
    /**
     * Initial ChartWrapper instance and draw preview
     */
    init: function () {
        console.log('inside init');
        // prepare chart wrapper
        chart.wrap = new google.visualization.ChartWrapper();
        chart.wrap.setContainerId(chart.id);
        chart.wrap.setChartType(env.type);
        chart.wrap.setOption('width', env.width);
        chart.wrap.setOption('height', env.height);
        chart.wrap.setOptions(env.options);


    },
    /**
     * Load new ChartWrapper from URL or other source
     * @param data
     */
    load: function (data) {
        console.log('inside load');
        chart.wrap = new google.visualization.ChartWrapper(data);
        chart.wrap.setOption('width', env.width);
        chart.wrap.setOption('height', env.height);
        // redraw chart
        chart.wrap.draw();

    },
    /**
     * Update chart from table data
     */
    draw: function (data) {
        try {
            console.log('inside draw');
            // update data
            chart.wrap.setDataTable(new google.visualization.arrayToDataTable(data));
            // reset options
            chart.wrap.setOption('width', env.width);
            chart.wrap.setOption('height', env.height);
            // redraw chart
            chart.wrap.draw();
            console.log(data, chart.wrap.getOptions(), chart.wrap.getChartType());


            ;
            // Extract updated data and options
            const updatedData = chart.wrap.getDataTable().toJSON();
            const updatedOptions = chart.wrap.getOptions();
            const updatedChartType = chart.wrap.getChartType();

            console.log(updatedData, updatedOptions, updatedChartType);
            const script = generateChartScript(
                updatedData,
                updatedOptions,
                updatedChartType
            );
            document.getElementById("generated-script").innerText = script;
        } catch (e) {
            console.error(e);
        }
    },
    /**
     * Update chart from table data
     */
    redraw: function () {
        console.log('inside redraw');
        chart.draw(
            table.getData()
        );
        console.log('table.getData', table.getData(), chart.wrap);
    },
    /**
     * Create ChartEditor instance
     * @returns {boolean}
     */
    edit: function (listener) {
        console.log('inside edit');
        if (!chart.editor) {
            chart.editor = new google.visualization.ChartEditor();

            google.visualization.events.addListener(chart.editor, 'ok', function () {
                console.log('inside ok', listener);
                chart.wrap = chart.editor.getChartWrapper();
                console.log(chart.wrap.toJSON());
                chart.redraw();



            });
        }

        chart.editor.openDialog(chart.wrap, {});
        return false;
    },
    /**
     * Generate embed URLs
     * @return {String} URL
     */
    url: function () {
        console.log('inside url');
        let [width, height] = document.querySelector('#options input[name="size"]:checked').value.split('x');

        // let dynamic = document.getElementById('dynamic').checked
        // let edit = document.getElementById('edit').checked

        width = parseInt(width);
        height = parseInt(height);

        chart.wrap.setOption('width', width);
        chart.wrap.setOption('height', height);

        let data = chart.wrap.toJSON();
        console.log(data);

        // let path = location.pathname.slice(0, location.pathname.lastIndexOf('/') + 1)
        // let url = `//${location.host}${path}embed.html?created=${new Date().getTime()}#w=${dynamic ? 'auto' : width}&h=${dynamic ? 'auto' : height}&d=${data}${edit ? "" : "&noedit=1"}`;

        // if (getHashValue('noedit')) {
        //     url += '&noedit=1';
        // }

        // document.getElementById('embed-url')
        //     .value = `https:${url}`

        // document.getElementById('embed-html')
        //     .value = `<iframe src='${url}' frameborder='0' width='${width + 10}' height='${height + 10}'></iframe>`

        // return url;
    },
    /**
     * Generate embed code and display the modal window
     * @returns {boolean}
     */
    embed: function () {
        console.log('inside embed');
        // let [width, height] = document.querySelector('#options input[name="size"]:checked').value.split('x');

        // url = chart.url()

        // let embedIframe = document.getElementById('embed-iframe');

        // let maxWidth = 720

        // if (width > maxWidth) {
        //     // Calculate scale based on the ratio of maxWidth to actual width
        //     scaleValue = maxWidth / width;
        // } else {
        //     scaleValue = 1; // No scaling if within maxWidth
        // }

        // // Apply scaling using CSS transform
        // embedIframe.style.transform = 'scale(' + scaleValue + ')';
        // // Center the iframe after scaling (optional)
        // embedIframe.style.transformOrigin = '0 0';

        // // Adjust iframe width and height to fit the scaled content
        // embedIframe.width = width;
        // embedIframe.height = height + 10;

        // // Set the src attribute of the iframe
        // embedIframe.src = url;

        // // Optional: Adjust the container size if necessary
        // embedIframe.parentNode.style.overflow = 'hidden'
        // embedIframe.parentNode.style.height = (height * scaleValue) + 'px'; // Adjust height based on the scale




        new bootstrap.Modal(
            document.getElementById('embed-modal')
        ).show()

        // return false;
    }
};

// Function to generate the chart script
function generateChartScript(data, options, chartType) {
    return `
    <script src="https://www.gstatic.com/charts/loader.js"></script>
    <script>
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(function() {
        var data = new google.visualization.DataTable(${data});
        var options = ${options};
        var chart = new google.visualization.${chartType}(document.getElementById('chart_div'));
        chart.draw(data, options);
      });
    </script>
    <div id="chart_div" style="width: 100%; height: 400px;"></div>
    `;
}

// Function to copy the generated script
function copyScript() {
    const scriptText = document.getElementById("generated-script");
    scriptText.select();
    document.execCommand("copy");
    alert("Script copied to clipboard!");
}
