import { GridRendererCellProps } from "@/components/layouts/types";
import PostCard from "@/components/ui/PostCard";
import { Fragment } from "react/jsx-runtime";

export default function GridCellRenderer({
  key,
  columnIndex,
  rowIndex,
  style,
  columnCount = 3,
  posts,
  template,
}: GridRendererCellProps): React.ReactNode {
  const index = rowIndex * columnCount + columnIndex;

  const post = posts[index];
  if (!post) return <Fragment key={key}></Fragment>;
  return (
    <div key={key} style={style} className="p-2">
      <PostCard post={post} template={template} />
    </div>
  );
}
