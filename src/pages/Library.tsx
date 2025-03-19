
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Star, Play, ChevronLeft, Search, X } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";

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
  const subCategories = getSubCategories(selectedCategory as any);
  
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
      setFilteredTracks(getTracksBySubCategory(selectedCategory as any, selectedSubCategory));
    } else {
      setFilteredTracks(selectCategory(selectedCategory as any));
    }
  }, [searchTerm, selectedCategory, selectedSubCategory, tracks]);
  
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
  
  // Handle star click
  const handleStarClick = (e: React.MouseEvent, trackId: string) => {
    e.stopPropagation();
    toggleFavorite(trackId);
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
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="search"
            className="block w-full pl-10 pr-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white/50"
            placeholder="Search frequencies, categories, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        
        {searchTerm ? (
          // Search results
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Search Results</h2>
            {filteredTracks.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No results found for "{searchTerm}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTracks.map(track => (
                  <div 
                    key={track.id} 
                    className="track-card cursor-pointer"
                    onClick={() => navigate(`/session-select?track=${track.id}`)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="bg-accent text-accent-foreground text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {track.frequency}
                      </div>
                      <button 
                        className={`${track.isFavorite ? 'text-amber-400' : 'text-gray-300'}`}
                        onClick={(e) => handleStarClick(e, track.id)}
                      >
                        <Star className={`w-5 h-5 ${track.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <h3 className="text-lg font-medium mb-1">{track.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{track.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {track.category} &gt; {track.subCategory}
                      </div>
                      <button className="btn-primary text-sm py-1.5">
                        <Play className="w-4 h-4 mr-1 inline-block" /> 
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTracks.map(track => (
                <div 
                  key={track.id} 
                  className="track-card cursor-pointer"
                  onClick={() => navigate(`/session-select?track=${track.id}`)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="bg-accent text-accent-foreground text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {track.frequency}
                    </div>
                    <button 
                      className={`${track.isFavorite ? 'text-amber-400' : 'text-gray-300'}`}
                      onClick={(e) => handleStarClick(e, track.id)}
                    >
                      <Star className={`w-5 h-5 ${track.isFavorite ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <h3 className="text-lg font-medium mb-1">{track.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{track.description}</p>
                  <button className="w-full btn-primary text-sm py-1.5">
                    <Play className="w-4 h-4 mr-1 inline-block" /> 
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Category view
          <div className="space-y-6">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {["Focus", "Relaxation", "Creativity", "Energy", "Sleep"].map(category => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
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
            
            {/* Subcategories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subCategories.map(subCategory => {
                const tracksInSubCategory = getTracksBySubCategory(selectedCategory as any, subCategory);
                return (
                  <div 
                    key={subCategory} 
                    className="border border-border rounded-xl p-5 bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => handleSubCategorySelect(subCategory)}
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
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Library;
