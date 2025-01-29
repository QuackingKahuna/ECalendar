import { ReactNode } from "react";

export type BackgroundSwitchProps = (Text | Icon) & {
  value: boolean;
  onValueChange: (value: boolean) => void;
  onColor?: string;
  useShadow?: boolean;
}

type Text = {
  text: string;
  textColor?: string;
  icon?: never;
}

type Icon = {
  icon: ReactNode;
  text?: never;
  textColor?: never;
}