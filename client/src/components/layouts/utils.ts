import { itemSize } from "@/configs";

export const calculateColumnCount =
  (width: number, maxColumns: number = Infinity, postsCount: number): number => {
    const columnsByWidth = Math.floor(width / itemSize) || 1;
    const maxAllowedColumns = Math.min(columnsByWidth, maxColumns);

    for (let cols = maxAllowedColumns; cols > 1; cols--) {
      if (postsCount % cols === 0) {
        return cols;
      }
    }

    return 1;
  }

export const calculateRowCount =
  (postsCount: number, columnCount: number, maxRows: number = Infinity): number => {
    const rowCount = Math.ceil(postsCount / columnCount);
    return Math.max(rowCount, maxRows);
  }

export const calculateItemWidth = (width: number, columnCount: number) => {
  return width / columnCount;
}