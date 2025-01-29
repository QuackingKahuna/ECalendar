import { ReactNode } from "react"

export type ListProps = {
  columns?: number,
  items: ListItem[],
}

export type ListItem = {
  columnWidth: number,
  component: ReactNode
}