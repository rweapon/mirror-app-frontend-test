import { useRef, useEffect } from "react";
import {
  AutoSizer,
  Masonry as VirtualizedMasonry,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry as MasonryRef,
  WindowScroller,
  MasonryCellProps,
} from "react-virtualized";
import { LayoutProps, MasonryRendererCellProps } from "@/components/layouts/types";
import { v4 } from "uuid";
import MasonryCellRenderer from "@/components/layouts/Masonry/MasonryCellRenderer";
import { useWindowSize } from "@/hooks/useWindowSize";
import { calculateColumnCount, calculateItemWidth } from "@/components/layouts/utils";

export default function Masonry({ posts, template, params, navigationRenderCell }: LayoutProps) {
  const { columns } = params;

  const containerRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<MasonryRef>(null);
  const containerWidth = containerRef?.current?.clientWidth || 1280;

  const columnCount = calculateColumnCount(containerWidth, columns, posts.length);
  const columnWidth = calculateItemWidth(containerWidth, columnCount);

  const windowSize = useWindowSize();

  const cache = useRef(
    new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: columnWidth,
      fixedWidth: true,
    })
  );

  const cellConfig = {
    cellMeasurerCache: cache.current,
    columnCount,
    columnWidth,
    spacer: 12,
  };

  const cellPositioner = useRef(createMasonryCellPositioner(cellConfig));

  useEffect(() => {
    cellPositioner.current.reset(cellConfig);
    masonryRef.current?.recomputeCellPositions();
  }, [windowSize]);

  return (
    <div className="layout--container" ref={containerRef}>
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <AutoSizer>
            {() => {
              const navigationMargin = height / 20;

              return (
                <>
                  <VirtualizedMasonry
                    overscanByPixels={300}
                    ref={masonryRef}
                    autoHeight
                    cellCount={posts.length}
                    cellMeasurerCache={cache.current}
                    cellPositioner={cellPositioner.current}
                    height={height}
                    width={containerWidth}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    cellRenderer={(props: MasonryCellProps) => {
                      const fullProps: MasonryRendererCellProps = {
                        ...props,
                        key: v4(),
                        template,
                        posts,
                        cache,
                      };
                      return MasonryCellRenderer(fullProps);
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
