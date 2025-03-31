export type Post = {
  id: string;
  caption: string;
  permalink: string;
  date: string;
  likes: number;
  comments: number;
  userId: string;
}

export type Layout = "grid" | "masonry";
type LayoutElement = "columns" | "rows";
export type Template = "classic" | "hover";
export type Navigation = "load-more" | "pagination";

export type LayoutConfig = Record<LayoutElement, number>;
type LayoutParams = Record<Layout, LayoutConfig>;

export type Settings = {
  layout: {
    current: Layout;
    params: LayoutParams;
  };
  template: Template;
  navigation: Navigation;
}

export type User = {
  id: string;
  username: string;
  postId: string;
}
