document.getElementById("copy-btn").addEventListener("click", function () {
    // Select the text inside the div
    const text = document.getElementById("generated-script").innerText;

    // Copy text to clipboard
    navigator.clipboard.writeText(text).then(() => {
        alert("Text copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
});
// new bootstrap.Modal(
//     document.getElementById('embed-modal')
// ).show()