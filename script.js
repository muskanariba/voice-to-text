window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
  alert("Speech Recognition is not supported in this browser. Please use Google Chrome.");
} else {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;

  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const resetBtn = document.getElementById('reset-btn');
  const copyBtn = document.getElementById('copy-btn');
  const output = document.getElementById('text-output');


  startBtn.addEventListener('click', () => {
    alert('The browser will now ask for microphone permission to start voice recognition.');
    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  });

 
  stopBtn.addEventListener('click', () => {
    recognition.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });


  resetBtn.addEventListener('click', () => {
    output.value = '';
  });

  copyBtn.addEventListener('click', () => {
    output.select();
    document.execCommand('copy');
    alert('Text copied to clipboard!');
  });

  recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
      .map(result => result[0].transcript)
      .join('');
    output.value += transcript + ' ';
  });

 
  recognition.addEventListener('error', (e) => {
    console.error('Speech recognition error: ', e);
    alert('Error: ' + e.error);
  });
}
