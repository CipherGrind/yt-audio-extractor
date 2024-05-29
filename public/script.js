document.getElementById('extractorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const videoUrl = document.getElementById('videoUrl').value;
    const messageElement = document.getElementById('message');
    const audioContainer = document.getElementById('audioContainer');

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
                messageElement.textContent = 'Audio extracted successfully!';

                // Create and insert the audio element
                const audioElement = document.createElement('audio');
                audioElement.controls = true;
                audioElement.src = data.downloadLink;

                // Clear previous audio element if any
                audioContainer.innerHTML = '';
                audioContainer.appendChild(audioElement);
            } else {
                messageElement.style.color = 'red';
                messageElement.textContent = 'Error: ' + data.message;
                audioContainer.innerHTML = '';
            }
        })
        .catch(error => {
            messageElement.style.color = 'red';
            messageElement.textContent = 'Error: ' + error.message;
            audioContainer.innerHTML = '';
        });
    } else {
        messageElement.textContent = 'Please enter a valid YouTube video URL';
        audioContainer.innerHTML = '';
    }
});


function clearForm() {
    document.getElementById('extractorForm').reset();
    document.getElementById('message').innerHTML = '';
    document.getElementById('audioContainer').innerHTML = '';
}


