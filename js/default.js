// Load the Visualization API and the chart package.
google.charts.load('current', { packages: ['table', 'corechart', 'charteditor'] })

$(function () {
    // This service is totally free for usage
    table.settings.licenseKey = 'non-commercial-and-evaluation'

    // Handlers for buttons
    $('#chart-editor').click(chart.edit)
    $('#chart-editor-link').click(chart.edit)
    $('#chart-generate').click(chart.embed)
    $('#dynamic').click(chart.url)
    $('#edit').click(chart.url)

    $('#clear').click(table.clear)

    google.charts.setOnLoadCallback(() => {
        // Initialization of the Chart Wrapper
        chart.init()

        let data = getHashValue('d')
        if (data) {
            chart.load(data)
            table.load(data)
            table.init()
        } else {
            table.setData(env.data)
            table.init()
            chart.redraw()
        }
    })
})

function getHashValue(key) {
    try {
        data = location.hash.match(new RegExp(key + '=([^&]*)'))[1]
        return JSON.parse(decodeURI(data))
    } catch (e) {
        // not found key
        return false
    }
}