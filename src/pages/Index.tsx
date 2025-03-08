import { useState, useRef } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import RecordButton from "@/components/RecordButton";
import TranslationDisplay from "@/components/TranslationDisplay";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

const Index = () => {
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [isRecording, setIsRecording] = useState(false);
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  const translateMutation = useMutation({
    mutationFn: async (text: string) => {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();

      if (data.responseStatus !== 200) {
        throw new Error(data.responseDetails || "Translation failed");
      }

      return data.responseData.translatedText;
    },
    onSuccess: (translatedText) => {
      setTranslatedText(translatedText);
    },
    onError: (error) => {
      toast({
        title: "Translation Error",
        description: error.message || "Failed to translate text",
        variant: "destructive",
      });
    },
  });

  const generateSpeech = (text: string) => {
    if (!window.speechSynthesis) {
      toast({
        title: "Error",
        description: "Text-to-speech is not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLanguage;

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      toast({
        title: "Text-to-Speech Error",
        description: "Failed to generate speech",
        variant: "destructive",
      });
    };

    window.speechSynthesis.speak(utterance);
  };

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast({
        title: "Error",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = false; // Changed to false
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = sourceLanguage;

    let timeout: NodeJS.Timeout; // Define timeout outside the onresult function


    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join("");
      setOriginalText(transcript);
      translateMutation.mutate(transcript);

       // Clear the timeout if it exists
       clearTimeout(timeout);

       // Set a new timeout to stop recording after a pause
       timeout = setTimeout(() => {
         stopRecording();
       }, 3000); // Adjust the pause duration (in milliseconds) as needed
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      toast({
        title: "Error",
        description: `Speech recognition error: ${event.error}`,
        variant: "destructive",
      });
      stopRecording();
    };

    recognitionRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const handleRecordingToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playTranslation = () => {
    if (translatedText) {
      generateSpeech(translatedText);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Audio Translation</h1>
            <p className="text-gray-500">Speak in one language, hear in another</p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <div className="flex flex-wrap justify-center gap-8">
              <LanguageSelector
                value={sourceLanguage}
                onChange={setSourceLanguage}
                label="Source Language"
              />
              <LanguageSelector
                value={targetLanguage}
                onChange={setTargetLanguage}
                label="Target Language"
              />
            </div>

            <RecordButton isRecording={isRecording} onClick={handleRecordingToggle} />

            <TranslationDisplay
              originalText={originalText}
              translatedText={translatedText}
              onPlayTranslation={playTranslation}
              canPlayAudio={!!translatedText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;