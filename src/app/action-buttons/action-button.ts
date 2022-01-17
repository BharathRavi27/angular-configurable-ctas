export enum IButtonAction {
  SEND = 'SEND',
  DOWNLOAD = 'DOWNLOAD',
}

export interface ActionConfig {
  label: string;
  disabled: boolean;
  hintText: string;
}
