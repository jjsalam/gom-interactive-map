cat <<'EOF' > voice-assistant.js
/* voice-assistant.js */
const voiceBtn = document.getElementById("voice-btn");
let recognizing;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

recognition.onresult = e => {
  const transcript = e.results[0][0].transcript.toLowerCase();
  console.log("Heard:", transcript);
  if (transcript.includes("zoom") && transcript.includes("fishing")) {
    map.setView([10.35, 78.05], 12);
    speechSynthesis.speak(new SpeechSynthesisUtterance("Zoomed to fishing zone."));
  }
};

voiceBtn.addEventListener("click", () => {
  if (recognizing) {
    recognition.stop();
    voiceBtn.textContent = "🎙️ Voice";
  } else {
    recognition.start();
    voiceBtn.textContent = "⏹️ Stop";
  }
  recognizing = !recognizing;
});
EOF