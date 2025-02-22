
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

interface TranslationDisplayProps {
  originalText: string;
  translatedText: string;
  onPlayTranslation?: () => void;
  canPlayAudio?: boolean;
}

const TranslationDisplay = ({ 
  originalText, 
  translatedText, 
  onPlayTranslation,
  canPlayAudio 
}: TranslationDisplayProps) => {
  return (
    <div className="space-y-4 w-full max-w-2xl">
      <Card className="p-4 bg-white/50 backdrop-blur-sm border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Original Text</h3>
        <p className="text-lg font-medium min-h-[2rem]">{originalText || "Speak something..."}</p>
      </Card>
      <Card className="p-4 bg-white/50 backdrop-blur-sm border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Translation</h3>
            <p className="text-lg font-medium min-h-[2rem]">{translatedText || "Translation will appear here..."}</p>
          </div>
          {canPlayAudio && onPlayTranslation && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onPlayTranslation}
              className="mt-1"
            >
              <Volume2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TranslationDisplay;
