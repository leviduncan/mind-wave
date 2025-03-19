
import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Calendar, Clock, Activity, Star, Play, ChevronRight } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";

const Profile = () => {
  const { favorites, recentlyPlayed, stats, toggleFavorite } = useApp();
  const navigate = useNavigate();

  // Handle star click
  const handleStarClick = (e: React.MouseEvent, trackId: string) => {
    e.stopPropagation();
    toggleFavorite(trackId);
  };

  return (
    <MainLayout>
      <div className="page-transition space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Profile</h1>
          <p className="text-muted-foreground">
            View your stats and favorite frequencies
          </p>
        </header>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="col-span-1 md:col-span-2 space-y-5">
            <div className="rounded-xl border border-border p-6 bg-white/50 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">My Stats</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-accent/50 rounded-lg p-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                    <div className="text-2xl font-bold">{stats.streak}</div>
                  </div>
                </div>
                <div className="bg-accent/50 rounded-lg p-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Mindful Minutes</div>
                    <div className="text-2xl font-bold">{stats.minutesListened}</div>
                  </div>
                </div>
                <div className="bg-accent/50 rounded-lg p-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Sessions</div>
                    <div className="text-2xl font-bold">{stats.sessionsCompleted}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl border border-border p-6 bg-white/50 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Top Categories</h2>
              <div className="space-y-3">
                {stats.topCategories.map((cat, index) => (
                  <div 
                    key={cat.category} 
                    className="flex items-center justify-between p-3 bg-accent/30 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary font-medium">
                        {index + 1}
                      </div>
                      <span className="font-medium">{cat.category}</span>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {cat.count} sessions
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="rounded-xl border border-border p-6 bg-white/50 shadow-sm h-full">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentlyPlayed.slice(0, 5).map((track, index) => (
                  <div 
                    key={track.id}
                    className="flex items-center p-3 bg-accent/30 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => navigate(`/session-select?track=${track.id}`)}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Play className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{track.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {track.category} &gt; {track.subCategory}
                      </div>
                    </div>
                    <div className="text-xs whitespace-nowrap text-muted-foreground">
                      {["Today", "Yesterday", "2 days ago", "3 days ago", "4 days ago"][index]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Favorites</h2>
          {favorites.length === 0 ? (
            <div className="text-center py-10 bg-accent/30 rounded-lg">
              <Star className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                You haven't favorited any tracks yet.
              </p>
              <button 
                onClick={() => navigate("/library")}
                className="mt-4 btn-primary"
              >
                Browse Library
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map(track => (
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
                      className="text-amber-400"
                      onClick={(e) => handleStarClick(e, track.id)}
                    >
                      <Star className="w-5 h-5 fill-current" />
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
        </section>
      </div>
    </MainLayout>
  );
};

export default Profile;
