
import React from "react";
import { BenefitCategory } from "@/context/SessionTypes";

interface CategoryTabsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryTabs = ({ selectedCategory, onCategorySelect }: CategoryTabsProps) => {
  const categories: BenefitCategory[] = ["Focus", "Relaxation", "Creativity", "Energy", "Sleep"];
  
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === category
              ? "bg-primary text-white"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
