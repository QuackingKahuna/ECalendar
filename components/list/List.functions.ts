import { ListItem } from "./List.types";

type ResolveRowsInput = {
  columns: number,
  items: ListItem[]
}

export const resolveRows = ({ columns, items }: ResolveRowsInput) => {
  const rows: ListItem[][] = [];
  let row: ListItem[] = [];
  let columnWidthRowSum = 0;
  items.forEach((item) => {
    if (columnWidthRowSum / columns < 1) {
      columnWidthRowSum = columnWidthRowSum + item.columnWidth
    } else {
      rows.push(row);
      row = []
      columnWidthRowSum = item.columnWidth
    }
    row.push(item);
  })
  if (row.length) {
    rows.push(row);
  }
  return rows;
}