
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ChevronLeft } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import SearchBar from "../components/library/SearchBar";
import CategoryTabs from "../components/library/CategoryTabs";
import SubCategoryGrid from "../components/library/SubCategoryGrid";
import TrackList from "../components/library/TrackList";
import { BenefitCategory } from "@/context/SessionTypes";

const Library = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    tracks, 
    selectCategory, 
    getSubCategories, 
    getTracksBySubCategory,
    toggleFavorite 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTracks, setFilteredTracks] = useState(tracks);
  
  // Parse the category from URL
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  const initialCategory = categoryParam || "Focus";
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  
  // Get subcategories for the selected category
  const subCategories = getSubCategories(selectedCategory as BenefitCategory);
  
  // Update state when URL changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setSelectedSubCategory(null);
    }
  }, [categoryParam]);
  
  // Filter tracks based on search term
  useEffect(() => {
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = tracks.filter(track => 
        track.name.toLowerCase().includes(lowercasedSearch) ||
        track.description.toLowerCase().includes(lowercasedSearch) ||
        track.category.toLowerCase().includes(lowercasedSearch) ||
        track.subCategory.toLowerCase().includes(lowercasedSearch) ||
        track.frequency.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredTracks(filtered);
    } else if (selectedSubCategory) {
      setFilteredTracks(getTracksBySubCategory(selectedCategory as BenefitCategory, selectedSubCategory));
    } else {
      setFilteredTracks(selectCategory(selectedCategory as BenefitCategory));
    }
  }, [searchTerm, selectedCategory, selectedSubCategory, tracks, getTracksBySubCategory, selectCategory]);
  
  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    navigate(`/library?category=${category}`);
  };
  
  // Handle subcategory selection
  const handleSubCategorySelect = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };
  
  // Handle back button
  const handleBack = () => {
    if (selectedSubCategory) {
      setSelectedSubCategory(null);
    } else {
      setSelectedCategory("Focus");
      navigate("/library");
    }
  };

  return (
    <MainLayout>
      <div className="page-transition space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Library</h1>
            <p className="text-muted-foreground">
              Explore binaural frequencies for different mental states
            </p>
          </div>
        </header>
        
        {/* Search bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {searchTerm ? (
          // Search results
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Search Results</h2>
            <TrackList 
              tracks={filteredTracks} 
              toggleFavorite={toggleFavorite} 
              searchTerm={searchTerm}
            />
          </div>
        ) : selectedSubCategory ? (
          // Subcategory view
          <div className="space-y-6">
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className="flex items-center text-primary hover:underline mr-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              <h2 className="text-xl font-semibold">
                {selectedCategory} &gt; {selectedSubCategory}
              </h2>
            </div>
            
            <TrackList 
              tracks={filteredTracks} 
              toggleFavorite={toggleFavorite} 
            />
          </div>
        ) : (
          // Category view
          <div className="space-y-6">
            {/* Category tabs */}
            <CategoryTabs 
              selectedCategory={selectedCategory} 
              onCategorySelect={handleCategorySelect} 
            />
            
            {/* Subcategories */}
            <SubCategoryGrid 
              subCategories={subCategories}
              selectedCategory={selectedCategory as BenefitCategory}
              getTracksBySubCategory={getTracksBySubCategory}
              onSubCategorySelect={handleSubCategorySelect}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Library;
