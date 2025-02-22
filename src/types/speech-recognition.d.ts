
declare global {
  type SpeechRecognitionErrorEvent = {
    error: string;
    message: string;
  };

  type SpeechRecognitionResultList = {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  };

  type SpeechRecognitionResult = {
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
  };

  type SpeechRecognitionAlternative = {
    transcript: string;
    confidence: number;
  };

  type SpeechRecognitionEvent = {
    results: SpeechRecognitionResultList;
  };

  class SpeechRecognition {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    abort: () => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
    onstart: () => void;
  }

  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export {};
