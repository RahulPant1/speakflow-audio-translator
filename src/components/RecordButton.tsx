
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecordButtonProps {
  isRecording: boolean;
  onClick: () => void;
}

const RecordButton = ({ isRecording, onClick }: RecordButtonProps) => {
  return (
    <div className="relative">
      <Button
        size="lg"
        variant={isRecording ? "destructive" : "default"}
        onClick={onClick}
        className={`rounded-full w-16 h-16 p-0 relative ${
          isRecording ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
        }`}
      >
        {isRecording ? (
          <Square className="w-6 h-6" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </Button>
      {isRecording && (
        <span className="absolute inset-0 rounded-full animate-pulse-ring bg-red-500/50" />
      )}
    </div>
  );
};

export default RecordButton;
