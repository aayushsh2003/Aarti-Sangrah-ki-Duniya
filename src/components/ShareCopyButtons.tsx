import { Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ShareCopyButtonsProps {
  title: string;
  lyrics: string;
  url: string;
}

const ShareCopyButtons = ({ title, lyrics, url }: ShareCopyButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${title}\n\n${lyrics}`);
      setCopied(true);
      toast({ title: "Copied!", description: "Lyrics copied to clipboard" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Error", description: "Could not copy lyrics", variant: "destructive" });
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`${title}\n\n${lyrics}\n\nRead more: ${window.location.origin}${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: lyrics, url: `${window.location.origin}${url}` });
      } catch {}
    } else {
      handleWhatsApp();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" className="rounded-full gap-2" onClick={handleCopy}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </Button>
      <Button variant="outline" size="sm" className="rounded-full gap-2" onClick={handleNativeShare}>
        <Share2 className="h-4 w-4" />
        Share
      </Button>
    </div>
  );
};

export default ShareCopyButtons;
