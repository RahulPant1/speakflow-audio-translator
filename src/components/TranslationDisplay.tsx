
import { Card } from "@/components/ui/card";

interface TranslationDisplayProps {
  originalText: string;
  translatedText: string;
}

const TranslationDisplay = ({ originalText, translatedText }: TranslationDisplayProps) => {
  return (
    <div className="space-y-4 w-full max-w-2xl">
      <Card className="p-4 bg-white/50 backdrop-blur-sm border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Original Text</h3>
        <p className="text-lg font-medium min-h-[2rem]">{originalText || "Speak something..."}</p>
      </Card>
      <Card className="p-4 bg-white/50 backdrop-blur-sm border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Translation</h3>
        <p className="text-lg font-medium min-h-[2rem]">{translatedText || "Translation will appear here..."}</p>
      </Card>
    </div>
  );
};

export default TranslationDisplay;
