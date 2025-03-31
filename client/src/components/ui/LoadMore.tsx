import { Button } from "@/components/ui/Button";

type Props = {
  loadMorePosts: VoidFunction;
  isLoading: boolean;
  hasNextPage: boolean;
};

function LoadMore({ loadMorePosts, isLoading, hasNextPage }: Props) {
  return (
    hasNextPage && (
      <div className="w-full flex justify-center">
        <Button onClick={loadMorePosts} disabled={isLoading} size="lg">
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      </div>
    )
  );
}

export default LoadMore;
