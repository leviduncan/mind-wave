
import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Play, Clock, Star, ChevronRight } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";

const Index = () => {
  const { favorites, recentlyPlayed, stats } = useApp();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="page-transition space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to MindWave</h1>
          <p className="text-muted-foreground">
            Science-informed binaural frequencies to enhance your mental state
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2">
            <div className="rounded-2xl border border-border p-6 bg-white/50 backdrop-blur-sm shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => navigate("/library?category=Focus")}
                  className="flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-accent/50 hover:bg-accent transition-all duration-300 hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-medium">Focus</span>
                </button>
                <button 
                  onClick={() => navigate("/library?category=Relaxation")}
                  className="flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-accent/50 hover:bg-accent transition-all duration-300 hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <CloudSun className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-medium">Relaxation</span>
                </button>
                <button 
                  onClick={() => navigate("/library?category=Sleep")}
                  className="flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-accent/50 hover:bg-accent transition-all duration-300 hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Moon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-medium">Sleep</span>
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="rounded-2xl border border-border p-6 bg-white/50 backdrop-blur-sm shadow-sm h-full">
              <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                    <div className="font-semibold">{stats.streak} days</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Mindful Minutes</div>
                    <div className="font-semibold">{stats.minutesListened} minutes</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mr-3">
                    <Play className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Sessions Completed</div>
                    <div className="font-semibold">{stats.sessionsCompleted} sessions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {favorites.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Favorites</h2>
              <button 
                onClick={() => navigate("/profile")}
                className="text-sm text-primary flex items-center hover:underline"
              >
                See all <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.slice(0, 3).map((track) => (
                <div key={track.id} className="track-card">
                  <div className="flex justify-between items-start mb-2">
                    <div className="bg-accent text-accent-foreground text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {track.frequency}
                    </div>
                    <button className="text-amber-400">
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                  <h3 className="text-lg font-medium mb-1">{track.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{track.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {track.category} &gt; {track.subCategory}
                    </div>
                    <button 
                      onClick={() => navigate(`/session-select?track=${track.id}`)}
                      className="btn-primary text-sm py-1.5"
                    >
                      <Play className="w-4 h-4 mr-1 inline-block" /> 
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recently Played</h2>
            <button 
              onClick={() => navigate("/profile")}
              className="text-sm text-primary flex items-center hover:underline"
            >
              See all <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentlyPlayed.map((track) => (
              <div key={track.id} className="track-card">
                <div className="flex justify-between items-start mb-2">
                  <div className="bg-accent text-accent-foreground text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {track.frequency}
                  </div>
                  <button className={`${track.isFavorite ? 'text-amber-400' : 'text-gray-300'}`}>
                    <Star className={`w-5 h-5 ${track.isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <h3 className="text-lg font-medium mb-1">{track.name}</h3>
                <div className="text-xs text-muted-foreground mb-3">
                  {track.category} &gt; {track.subCategory}
                </div>
                <button 
                  onClick={() => navigate(`/session-select?track=${track.id}`)}
                  className="w-full btn-outline text-sm py-1.5"
                >
                  <Play className="w-4 h-4 mr-1 inline-block" /> 
                  Play
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
