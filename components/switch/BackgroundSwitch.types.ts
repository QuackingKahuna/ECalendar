export type BackgroundSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  onColor?: string;
  offColor?: string;
  text: string;
  textColor?: string;
}