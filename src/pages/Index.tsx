
import { useState, useRef } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import RecordButton from "@/components/RecordButton";
import TranslationDisplay from "@/components/TranslationDisplay";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import translate from "@iamtraction/google-translate";

const Index = () => {
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [isRecording, setIsRecording] = useState(false);
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const translateMutation = useMutation({
    mutationFn: async (text: string) => {
      const result = await translate(text, {
        from: sourceLanguage,
        to: targetLanguage,
      });
      return result.text;
    },
    onSuccess: (translatedText) => {
      setTranslatedText(translatedText);
      generateSpeech(translatedText);
    },
    onError: (error) => {
      toast({
        title: "Translation Error",
        description: "Failed to translate text",
        variant: "destructive",
      });
    },
  });

  const generateSpeech = async (text: string) => {
    try {
      // Using Google Translate TTS as a simple solution
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        text
      )}&tl=${targetLanguage}&client=tw-ob`;
      
      setAudioUrl(url);
      
      if (audioRef.current) {
        audioRef.current.load();
        await audioRef.current.play();
      }
    } catch (error) {
      toast({
        title: "Text-to-Speech Error",
        description: "Failed to generate speech",
        variant: "destructive",
      });
    }
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
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = sourceLanguage;

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join("");
      setOriginalText(transcript);
      translateMutation.mutate(transcript);
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
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
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
              canPlayAudio={!!audioUrl}
            />

            <audio ref={audioRef} src={audioUrl || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
