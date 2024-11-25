import { createContext, useContext } from "react";
import useNews from "../hooks/news";

interface NewsContextType {
  news: string[];
  loading: boolean;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const newsState = useNews();

  return (
    <NewsContext.Provider value={newsState}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNewsContext must be used within a NewsProvider");
  }
  return context;
};
