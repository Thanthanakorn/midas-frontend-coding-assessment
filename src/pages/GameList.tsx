import { useGames } from "../hooks/useGames";
import { useSearchGames } from "../hooks/useSearchGames";
import { GameCard } from "../components/GameCard";
import { SearchBar } from "../components/SearchBar";
import { LoadingSkeleton, Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { useState } from "react";

interface GameListProps {
  onGameClick: (gameId: number) => void;
}

export function GameList({ onGameClick }: GameListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [inputValue, setInputValue] = useState("10");
  
  const { games, loading, error, totalItems, totalPages } = useGames(currentPage, rowPerPage);
  const {
    query,
    results,
    loading: searchLoading,
    error: searchError,
    search,
    clearSearch,
  } = useSearchGames(currentPage, rowPerPage);

  const displayGames = query ? results?.result : games;
  const isLoading = query ? searchLoading : loading;
  const displayError = query ? searchError : error;
  const hasGames = displayGames && displayGames.length > 0;
  const displayTotalItems = query ? results?.length : totalItems;
  const displayTotalPages = query ? results?.totalPage : totalPages;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value) && value > 0 && value <= 100) {
      setRowPerPage(value);
      setCurrentPage(1); // Reset to first page when changing rows per page
    } else {
      // Reset to current rowPerPage if invalid
      setInputValue(rowPerPage.toString());
    }
  };

  const renderPagination = () => {
    const pagesToShow = displayTotalPages || 0;
    if (pagesToShow <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pagesToShow, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8 pb-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              currentPage === page
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < pagesToShow && (
          <>
            {endPage < pagesToShow - 1 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            <button
              onClick={() => handlePageChange(pagesToShow)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              {pagesToShow}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagesToShow}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-row">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Game Library
          </h1>
          <SearchBar
            value={query}
            onChange={search}
            onClear={clearSearch}
            placeholder="Search for games..."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {query && (
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              {searchLoading
                ? "Searching..."
                : results && results.length > 0
                ? `Found ${results.length} result${
                    results.length !== 1 ? "s" : ""
                  } for "${query}"`
                : `No results found for "${query}"`}
            </p>
          </div>
        )}

        {displayError && <ErrorMessage message={displayError} />}

        {isLoading && !displayError && <LoadingSkeleton count={8} />}

        {!isLoading && !displayError && hasGames && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayGames.map((game) => (
                <GameCard key={game.id} game={game} onClick={() => onGameClick(game.id)} />
              ))}
            </div>
            {!loading && !searchLoading && displayTotalItems && displayTotalItems > 0 && (
              <div className="mt-8 first-line:mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <strong>{displayTotalItems}</strong> total {query ? 'results' : 'games'}
                  </span>
                  <span className="flex items-center gap-2">
                    Showing
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={inputValue}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold"
                    />
                    {query ? 'results' : 'games'} per page
                  </span>
                </div>
              </div>
            )}
            {renderPagination()}
          </>
        )}

        {searchLoading && query && (
          <div className="mt-6">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
