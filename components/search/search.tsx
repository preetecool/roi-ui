"use client";

import React, { useState, useEffect } from "react";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./search.module.css";

interface SearchResult {
  title: string;
  description?: string;
  url: string;
  content: string;
}

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const searchDocs = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results || []);
        setSelectedIndex(0);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchDocs, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        router.push(results[selectedIndex].url);
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, router]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
    setSelectedIndex(0);
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    handleClose();
  };

  if (!isOpen) {
    return (
      <div onClick={() => setIsOpen(true)} className={styles.trigger}>
        <SearchIcon size={16} />
        Search documentation...
        <span className={styles.shortcut}>⌘K</span>
      </div>
    );
  }

  return (
    <>
      <div className={styles.overlay} onClick={handleClose} />

      <div className={styles.modal}>
        <div className={styles.searchHeader}>
          <SearchIcon size={20} style={{ color: "var(--muted-foreground)" }} />
          <input
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className={styles.searchInput}
          />
          <button onClick={handleClose} className={styles.closeButton}>
            <X size={16} />
          </button>
        </div>

        <div className={styles.resultsContainer}>
          {loading ? (
            <div className={styles.emptyState}>Searching...</div>
          ) : query && results.length === 0 ? (
            <div className={styles.emptyState}>No results found for &quot;{query}&quot;</div>
          ) : results.length > 0 ? (
            <div>
              {results.map((result, index) => (
                <div
                  key={result.url}
                  onClick={() => handleResultClick(result)}
                  className={`${styles.resultItem} ${index === selectedIndex ? styles.selected : ""}`}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className={styles.resultHeader}>
                    <h3 className={styles.resultTitle}>{result.title}</h3>
                    <ArrowRight size={14} style={{ color: "var(--muted-foreground)" }} />
                  </div>
                  {result.description && <p className={styles.resultDescription}>{result.description}</p>}
                  <p className={styles.resultContent}>{result.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>Start typing to search documentation...</div>
          )}
        </div>
      </div>
    </>
  );
}
