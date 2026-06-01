import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";

interface FavoriteButtonProps {
  aartiId: string;
  size?: "sm" | "default";
}

const FavoriteButton = ({ aartiId, size = "default" }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(aartiId);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`rounded-full ${size === "sm" ? "h-8 w-8" : "h-10 w-10"} ${fav ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-400"}`}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(aartiId); }}
      aria-label={fav ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={`${size === "sm" ? "h-4 w-4" : "h-5 w-5"} ${fav ? "fill-current" : ""}`} />
    </Button>
  );
};

export default FavoriteButton;
