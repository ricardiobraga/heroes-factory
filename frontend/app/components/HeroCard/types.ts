import { Hero } from "@/app/types/hero";

export type HeroCardPros = {
    hero: Hero;
    onEdit: (hero: Hero) => void;
    onDelete: (hero: Hero) => void;
    onToggle: (hero: Hero) => void; 
}

