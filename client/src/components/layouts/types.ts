import { Post, Template, LayoutConfig } from "@/types";
import { MutableRefObject } from "react";
import { CellMeasurerCache, GridCellProps, MasonryCellProps } from "react-virtualized";

export type LayoutProps = {
  posts: Post[];
  template: Template;
  params: LayoutConfig;
  navigationRenderCell: React.ReactNode
};

type CustomRendererCellProps = {
  columnCount?: number,
  posts: Post[],
  template: Template,
}

export type GridRendererCellProps = GridCellProps & CustomRendererCellProps

export type MasonryRendererCellProps = MasonryCellProps & CustomRendererCellProps & { cache: MutableRefObject<CellMeasurerCache>, }