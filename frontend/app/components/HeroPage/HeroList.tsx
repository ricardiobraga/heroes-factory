"use client";

import type { Hero } from "@/app/types/hero";
import HeroCard from "../HeroCard/HeroCard";

interface Props {
  heroes: Hero[];
  onEdit: (hero: Hero) => void;
  onDelete: (hero: Hero) => void;
  onToggle: (hero: Hero) => void;
  onOpenDetails: (hero: Hero) => void;
}

export default function HeroList({
  heroes,
  onEdit,
  onDelete,
  onToggle,
  onOpenDetails,
}: Props) {
  return (
    <div className="heroes-grid">
      {heroes.map((hero) => (
        <HeroCard
          key={hero.id}
          hero={hero}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  );
}
