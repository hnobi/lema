import { useMemo } from "react";

type PageItem = number | "...";

export const usePagination = (totalPages: number, currentPage: number): PageItem[] => {
  return useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: PageItem[] = [];

    if (currentPage <= 2) {
      pages.push(1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages);
      return pages;
    }

    const startRange = Math.max(2, currentPage - 1);
    const endRange = Math.min(totalPages - 1, currentPage + 1);

    const addRange = (start: number, end: number) => {
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
    };

    pages.push(1);

    if (startRange > 2) {
      pages.push("...");
    }

    addRange(startRange, endRange);

    if (endRange < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }, [totalPages, currentPage]);
};
