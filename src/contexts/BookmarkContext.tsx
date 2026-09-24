import React, { createContext, useContext, useState, useEffect } from 'react';

interface Bookmark {
  id: string;
  type: 'article' | 'timeline' | 'document' | 'claim';
  timestamp: number;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (id: string, type: Bookmark['type']) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  clearBookmarks: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const stored = localStorage.getItem('bookmarks');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (id: string, type: Bookmark['type']) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === id)) return prev;
      return [...prev, { id, type, timestamp: Date.now() }];
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some(b => b.id === id);
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked, clearBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarkProvider');
  }
  return context;
}
