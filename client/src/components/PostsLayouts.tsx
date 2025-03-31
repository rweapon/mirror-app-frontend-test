import { Layout } from "../types";
import Skeleton from "@/components/ui/Skeleton";
import { LayoutProps } from "@/components/layouts/types";
import Grid from "@/components/layouts/Grid/Grid";
import Masonry from "@/components/layouts/Masonry/Masonry";
import { defaultLayout } from "@/configs";

type Props = {
  layout: Layout;
  isLoading: boolean;
} & LayoutProps;

function PostsLayouts({ layout, isLoading, posts, ...props }: Props) {
  const LayoutComponents: Record<Layout, React.ReactNode> = {
    grid: <Grid posts={posts} {...props} />,
    masonry: <Masonry posts={posts} {...props} />,
  };

  return isLoading ? <Skeleton count={posts.length} /> : LayoutComponents[layout] || LayoutComponents[defaultLayout];
}

export default PostsLayouts;
