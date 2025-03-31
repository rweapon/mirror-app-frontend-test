import { useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSettings, fetchPosts } from "./api";
import { useCallback, useState } from "react";
import { defaultSettings } from "@/configs";
import { Navigation } from "@/types";
import Pagination from "@/components/ui/Pagination";
import SettingsPanel from "@/components/SettingsPanel";
import PostsLayouts from "@/components/PostsLayouts";
import LoadMore from "@/components/ui/LoadMore";

function Home() {
  const queryClient = useQueryClient();

  const {
    data: settings,
    isFetching: isSettingsLoading,
    error: settingsError,
    refetch: refetchSettings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    initialData: defaultSettings,
  });

  const params = settings.layout.params[settings.layout.current];
  const limit = params.columns * params.rows;

  const [page, setPage] = useState(1);
  const totalPages = Math.min(Math.round(100 / limit), 10);

  const useLoadMoreNavigation = settings?.navigation === "load-more";

  const infinitePostsQuery = useInfiniteQuery({
    queryKey: ["posts", "infinite", limit],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, limit),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!settings && useLoadMoreNavigation,
  });

  const paginatedPostsQuery = useQuery({
    queryKey: ["posts", "paginated", page, limit],
    queryFn: () => fetchPosts(page, limit),
    enabled: !!settings && !useLoadMoreNavigation,
  });

  const posts = useLoadMoreNavigation ? infinitePostsQuery.data?.pages.flat() || [] : paginatedPostsQuery.data || [];

  const isPostsLoading = useLoadMoreNavigation ? infinitePostsQuery.isLoading : paginatedPostsQuery.isFetching;

  const isLoadingMore = infinitePostsQuery.isFetchingNextPage;

  const handleRefreshSettings = useCallback(async () => {
    await refetchSettings();
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    setPage(1);
  }, [queryClient, refetchSettings]);

  const loadMorePosts = useCallback(() => {
    if (infinitePostsQuery.hasNextPage) {
      infinitePostsQuery.fetchNextPage();
    }
  }, [infinitePostsQuery]);

  const NavigationComponents: Record<Navigation, React.ReactNode> = {
    "load-more": (
      <LoadMore loadMorePosts={loadMorePosts} isLoading={isLoadingMore} hasNextPage={infinitePostsQuery.hasNextPage} />
    ),
    pagination: <Pagination setPage={setPage} page={page} totalPages={totalPages} />,
  };

  return (
    <>
      <SettingsPanel
        settings={settings}
        onRefresh={handleRefreshSettings}
        isLoading={isSettingsLoading}
        error={settingsError}
      />
      <main className="space-y-6 min-h-60 flex flex-col">
        <PostsLayouts
          posts={posts}
          layout={settings.layout.current}
          params={params}
          template={settings.template}
          isLoading={isPostsLoading}
          navigationRenderCell={NavigationComponents[settings.navigation]}
        />
      </main>
    </>
  );
}

export default Home;
