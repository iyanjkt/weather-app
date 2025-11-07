import React, { useEffect, useState } from "react";
import { Search, X, MapPin } from "lucide-react";
import { searchCities } from "../services/api";

const SearchBar = ({ onSearch, onLocationSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim().length > 2) {
        try {
          setIsLoading(true);
          const result = await searchCities(searchQuery);
          setSuggestion(result);
        } catch (error) {
          console.error("Error Search Location", error);
        } finally {
          setShowSuggestion(true);
          setIsLoading(false);
        }
      } else {
        setSuggestion([]);
        setShowSuggestion(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery]);

  const handleSearchFocus = () => {
    if (searchQuery.trim().length > 2 && suggestion.length > 0) {
      setShowSuggestion(true);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowSuggestion(false);
    }, 100);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSuggestion([]);
    setShowSuggestion(false);
  };

  const handleSuggestionClick = (city) => {
    onSearch(city);
    setSearchQuery("");
    setSuggestion([]);
    setShowSuggestion(false);
  };

  return (
    <div className=" relative w-full max-w-2xl">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className=" relative group">
          <Search className=" absolute z-10 left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-white transition-all" />
          <input
            type="text"
            value={searchQuery}
            onChange={(q) => {
              setSearchQuery(q.target.value);
            }}
            onFocus={() => {
              handleSearchFocus();
            }}
            onBlur={() => {
              handleSearchBlur();
            }}
            placeholder="Search for any city worlwide..."
            className=" w-full pl-12 pr-24 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
          />
          {/* Conditional Formating */}
          {searchQuery ? (
            <button
              type="button"
              onClick={() => {
                handleClearSearch();
              }}
              className=" absolute right-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all p-1 rounded-full hover:bg-white/10"
            >
              <X className=" w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onLocationSearch}
              type="button"
              className=" absolute right-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all p-1 rounded-full hover:bg-white/10"
            >
              <MapPin className=" w-5 h-5" />
            </button>
          )}
        </div>
      </form>
      {/* Conditional Rendering */}
      {showSuggestion && (
        <div className=" absolute top-full left-0 right-0 mt-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50">
          {/* Conditional Rendering */}
          {isLoading ? (
            <div className="p-6 text-center text-white/70">
              <div className=" animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white mx-auto"></div>
              <p>Search Cities...</p>
            </div>
          ) : (
            <div>
              {suggestion.length > 0 ? (
                suggestion.map((city, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        handleSuggestionClick(city.name);
                      }}
                      className=" w-full px-6 py-6 text-left hover:bg-white/10 transition-all duration-200 flex items-center justify-between group border-b border-white/10 last:border-b-0"
                    >
                      <div>
                        <div className=" font-medium text-white group-hover:text-white/relative?90">
                          {city.name}
                          {/* Conditional Rendering */}
                          {city.state && <span>, {city.state}</span>}
                        </div>
                        <div className=" text-sm text-white/60">
                          {city.country}
                        </div>
                      </div>
                      <Search className=" w-5 h-5 text-white/40 group-hover:text-white/60 transition-all" />
                    </button>
                  );
                })
              ) : (
                <div className="p-6 text-center text-white/70">
                  No results found for "{searchQuery}".
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
