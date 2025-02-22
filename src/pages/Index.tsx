
import { useState } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import RecordButton from "@/components/RecordButton";
import TranslationDisplay from "@/components/TranslationDisplay";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [isRecording, setIsRecording] = useState(false);
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const { toast } = useToast();

  let recognition: SpeechRecognition | null = null;

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast({
        title: "Error",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = sourceLanguage;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join("");
      setOriginalText(transcript);
      // Here we would typically call the translation API
      setTranslatedText("Translation will be implemented in the next step...");
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      toast({
        title: "Error",
        description: `Speech recognition error: ${event.error}`,
        variant: "destructive",
      });
      stopRecording();
    };

    recognition.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
