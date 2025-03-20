
import React from "react";
import { BenefitCategory } from "@/context/SessionTypes";

interface SubCategoryGridProps {
  subCategories: string[];
  selectedCategory: string;
  getTracksBySubCategory: (category: BenefitCategory, subCategory: string) => any[];
  onSubCategorySelect: (subCategory: string) => void;
}

const SubCategoryGrid = ({ 
  subCategories, 
  selectedCategory, 
  getTracksBySubCategory, 
  onSubCategorySelect 
}: SubCategoryGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {subCategories.map(subCategory => {
        const tracksInSubCategory = getTracksBySubCategory(selectedCategory as BenefitCategory, subCategory);
        return (
          <div 
            key={subCategory} 
            className="border border-border rounded-xl p-5 bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => onSubCategorySelect(subCategory)}
          >
            <h3 className="text-lg font-medium mb-2">{subCategory}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {tracksInSubCategory.length} {tracksInSubCategory.length === 1 ? 'track' : 'tracks'}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tracksInSubCategory.slice(0, 3).map(track => (
                <div key={track.id} className="bg-accent text-accent-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                  {track.frequency}
                </div>
              ))}
              {tracksInSubCategory.length > 3 && (
                <div className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                  +{tracksInSubCategory.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubCategoryGrid;
