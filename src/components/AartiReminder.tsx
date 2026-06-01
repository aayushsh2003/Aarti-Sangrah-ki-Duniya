import { useState, useEffect } from "react";
import { Bell, BellOff, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const REMINDER_KEY = "aarti-reminder";

interface Reminder {
  time: string; // HH:MM
  enabled: boolean;
}

const AartiReminder = () => {
  const [reminder, setReminder] = useState<Reminder>(() => {
    const saved = localStorage.getItem(REMINDER_KEY);
    return saved ? JSON.parse(saved) : { time: "07:00", enabled: false };
  });
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    localStorage.setItem(REMINDER_KEY, JSON.stringify(reminder));
  }, [reminder]);

  useEffect(() => {
    if (!reminder.enabled) return;

    const checkTime = () => {
      const now = new Date();
      const current = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      if (current === reminder.time) {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("🪔 Aarti Time!", { body: "It's time for your daily aarti. Om Jai Jagdish Hare! 🙏", icon: "/pwa-192x192.png" });
        }
        toast({ title: "🪔 Aarti Time!", description: "It's time for your daily aarti!" });
      }
    };

    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [reminder]);

  const toggleReminder = async () => {
    if (!reminder.enabled && "Notification" in window) {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        toast({ title: "Notifications blocked", description: "Please enable notifications in browser settings.", variant: "destructive" });
        return;
      }
    }
    setReminder(r => ({ ...r, enabled: !r.enabled }));
    toast({
      title: !reminder.enabled ? "🔔 Reminder set!" : "🔕 Reminder off",
      description: !reminder.enabled ? `Daily aarti reminder at ${reminder.time}` : "Aarti reminder disabled",
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="rounded-full gap-2"
        onClick={() => setShowPicker(!showPicker)}
      >
        <Clock className="h-3.5 w-3.5" />
        <span className="text-xs">{reminder.time}</span>
      </Button>

      {showPicker && (
        <input
          type="time"
          value={reminder.time}
          onChange={e => setReminder(r => ({ ...r, time: e.target.value }))}
          className="px-2 py-1 text-xs rounded-lg border border-border bg-background text-foreground"
        />
      )}

      <Button
        variant={reminder.enabled ? "default" : "outline"}
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={toggleReminder}
        aria-label={reminder.enabled ? "Disable reminder" : "Set aarti reminder"}
      >
        {reminder.enabled ? <Bell className="h-3.5 w-3.5" /> : <BellOff className="h-3.5 w-3.5" />}
      </Button>
    </div>
  );
};

export default AartiReminder;
