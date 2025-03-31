import { Button } from "@/components/ui/Button";
import { memo } from "react";

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
totalPages: number;
};

const Pagination = memo(function Pagination({ page, setPage, totalPages }: Props) {
  return (
    <div className="w-full flex flex-wrap sm:flex-nowrap gap-2 justify-center">
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i}
          variant={page === i + 1 ? "default" : "outline"}
          onClick={() => {
            setPage(i + 1);
          }}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  );
});

export default Pagination;
