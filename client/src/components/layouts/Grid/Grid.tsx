import GridCellRenderer from "@/components/layouts/Grid/GridCellRenderer";
import { GridRendererCellProps, LayoutProps } from "@/components/layouts/types";
import { calculateColumnCount, calculateRowCount, calculateItemWidth } from "@/components/layouts/utils";
import { itemSize } from "@/configs";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useRef } from "react";
import { Grid as VirtualizedGrid, AutoSizer, WindowScroller, GridCellProps, Grid as GridRef } from "react-virtualized";
import { v4 } from "uuid";

export default function Grid({ posts, template, params, navigationRenderCell }: LayoutProps) {
  const { columns, rows } = params;
  const gridRef = useRef<GridRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const windowSize = useWindowSize();

  useEffect(() => {
    gridRef.current?.recomputeGridSize();
  }, [windowSize]);

  return (
    <div className="layout--container" ref={containerRef}>
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <AutoSizer>
            {() => {
              const containerWidth = containerRef?.current?.clientWidth || 1280;

              const columnCount = calculateColumnCount(containerWidth, columns, posts.length);
              const rowCount = calculateRowCount(posts.length, columnCount, rows);
              const itemWidth = calculateItemWidth(containerWidth, columnCount);
              const navigationMargin = height / 20;

              return (
                <>
                  <VirtualizedGrid
                    ref={gridRef}
                    autoHeight
                    columnCount={columnCount}
                    columnWidth={itemWidth}
                    width={containerWidth}
                    height={height}
                    rowCount={rowCount}
                    rowHeight={itemSize}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    onScroll={onChildScroll}
                    cellRenderer={(props: GridCellProps) => {
                      const fullProps: GridRendererCellProps = {
                        ...props,
                        key: v4(),
                        columnCount,
                        template,
                        posts,
                      };

                      return GridCellRenderer(fullProps);
                    }}
                  />
                  <div style={{ width: containerWidth, marginTop: navigationMargin, paddingBottom: navigationMargin }}>
                    {navigationRenderCell}
                  </div>
                </>
              );
            }}
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  );
}
