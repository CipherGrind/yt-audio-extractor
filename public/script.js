document.getElementById('extractorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const videoUrl = document.getElementById('videoUrl').value;
    const messageElement = document.getElementById('message');

    if (videoUrl) {
        fetch('/extract-audio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: videoUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageElement.style.color = 'green';
                messageElement.innerHTML = `Audio extracted successfully!<br><br><a href="${data.downloadLink}" target="_blank">Click here to listen</a>`;
            } else {
                messageElement.style.color = 'red';
                messageElement.textContent = 'Error: ' + data.message;
            }
        })
        .catch(error => {
            messageElement.style.color = 'red';
            messageElement.textContent = 'Error: ' + error.message;
        });
    } else {
        messageElement.textContent = 'Please enter a valid YouTube video URL';
    }
});


function clearForm() {
    document.getElementById('extractorForm').reset();
    document.getElementById('message').innerHTML = '';
    document.getElementById('audioContainer').innerHTML = '';
}
