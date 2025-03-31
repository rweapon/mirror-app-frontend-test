import { MasonryRendererCellProps } from "@/components/layouts/types";
import PostCard from "@/components/ui/PostCard";
import { CellMeasurer } from "react-virtualized";
import { Fragment } from "react/jsx-runtime";

export default function MasonryCellRenderer({
  key,
  style,
  parent,
  index,
  cache,
  posts,
  template,
}: MasonryRendererCellProps): React.ReactNode {
  const post = posts[index];
  if (!post) return <Fragment key={key}></Fragment>;
  return (
    <CellMeasurer cache={cache.current} index={index} key={key} parent={parent}>
      <div style={style} className="p-2">
        <PostCard post={post} template={template} />
      </div>
    </CellMeasurer>
  );
}
