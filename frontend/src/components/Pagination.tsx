import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className={cn("flex flex-wrap items-center justify-center mt-6", className)} >
      <Button
        variant="ghost"
        size="sm"
        className="px-2 cursor-pointer sm:mr-[42px] text-gray-600"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Previous
      </Button>

      <div className="flex sm:space-x-2">
        {getPages().map((p, idx) =>
          p === "..." ? (
            <Button
              key={`ellipsis-${idx}`}
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 pointer-events-none text-gray-500"
              disabled
            >
              ...
            </Button>
          ) : (
            <Button
              key={p}
              variant="ghost"
              size="sm"
              className={`w-8 h-8 p-0 cursor-pointer ${p === page ? "bg-brand-50 text-brand-600" : "text-gray-500"}`}
              onClick={() => onPageChange(Number(p))}
            >
              {p}
            </Button>
          )
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="px-2 cursor-pointer sm:ml-[42px] text-gray-600"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
        <ArrowRight className="w-4 h-4 ml-1 " />
      </Button>
    </div>
  );
}
