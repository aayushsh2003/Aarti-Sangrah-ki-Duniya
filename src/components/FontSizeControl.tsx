import { Minus, Plus, Type } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FontSizeControlProps {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

const FontSizeControl = ({ fontSize, onFontSizeChange }: FontSizeControlProps) => {
  return (
    <div className="flex items-center gap-1.5 bg-muted rounded-full px-2 py-1">
      <Type className="h-3.5 w-3.5 text-muted-foreground" />
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 rounded-full"
        onClick={() => onFontSizeChange(Math.max(14, fontSize - 2))}
        disabled={fontSize <= 14}
        aria-label="Decrease font size"
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="text-xs text-muted-foreground w-6 text-center">{fontSize}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 rounded-full"
        onClick={() => onFontSizeChange(Math.min(28, fontSize + 2))}
        disabled={fontSize >= 28}
        aria-label="Increase font size"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default FontSizeControl;
