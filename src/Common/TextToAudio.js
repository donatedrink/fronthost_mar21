import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function TextToAudio() {
  const [texts, setTexts] = useState("");

  useEffect(() => {
    speakArabicText('مرحبا كيف حالك؟', 1, 1); 
    speakGeEzText('ሰላም', 'am', 1.2, 1);

  }, []);

  function speakGeEzText(text, languageCode = 'am', pitch = 1, rate = 1) {
    window.speechSynthesis.onvoiceschanged = function() {
      var voices = window.speechSynthesis.getVoices();
      var languageVoice = voices.find(voice => voice.lang === languageCode || voice.lang.startsWith(`${languageCode}-`));
  
      if(languageVoice) {
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = languageVoice;
        utterance.pitch = pitch;
        utterance.rate = rate;
  
        window.speechSynthesis.speak(utterance);
      } else {
        console.log(`No voice found for language code: ${languageCode}`);
      }
    };
  }

  function speakArabicText(text, pitch = 1, rate = 1) {
    // Ensure the voices are loaded
    window.speechSynthesis.onvoiceschanged = function() {
      var voices = window.speechSynthesis.getVoices();
      // Find a voice that supports Arabic
      var arabicVoice = voices.find(voice => voice.lang.startsWith('ar'));
  
      if(arabicVoice) {
        // Create an utterance in Arabic
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = arabicVoice; // Set the found Arabic voice
        utterance.pitch = pitch; // Adjust pitch if needed
        utterance.rate = rate; // Adjust rate if needed
  
        // Speak the text
        window.speechSynthesis.speak(utterance);
      } else {
        console.log('No Arabic voice found');
      }
    };
  }
  
  

  const changeToAudio = () => {
    if ("speechSynthesis" in window) {
      // Create a new instance of SpeechSynthesisUtterance
      var utterance = new SpeechSynthesisUtterance(texts);

      // Optionally set some properties
      utterance.pitch = 1; // Range between 0 and 2
      utterance.rate = 1; // Range between 0.1 and 10
      utterance.volume = 1; // Range between 0 and 1

      // Find and set a specific voice (optional)
      var voices = window.speechSynthesis.getVoices();
      // utterance.voice = voices.filter((voice) => voice.lang.includes("am"))[0]; // Select an Amharic voice
      utterance.voice = voices.filter((voice) => voice.lang.includes("ar"))[0]; // Select an Amharic voice
      // utterance.voice = voices.filter((voice) => voice.lang.includes('en'))[0]; // Select an English voice

      // Speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      // Speech synthesis not supported
      alert("Sorry, your browser does not support text to speech!");
    }
  };

  return (
    <div className="container">
      <InputGroup>
        <Form.Control
          onChange={(e) => setTexts(e.target.value)}
          as="textarea"
          rows={10}
          aria-label="With textarea"
        />
      </InputGroup>
      <Button onClick={changeToAudio} style={{ marginTop: 15 }}>
        Change To Audio
      </Button>
    </div>
  );
}

export default TextToAudio;
