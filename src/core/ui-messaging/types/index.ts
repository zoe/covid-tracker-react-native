export type TMessageTypes = 'BANNER' | 'DIALOG' | 'SNACKBAR';

export interface IUIAction {
  action: string;
  label: string;
}

export interface IUIMessage {
  actions?: IUIAction[];
  messageType: TMessageTypes;
  message: string;
}

export interface IUIMessageCollection {
  messages: IUIMessage[];
}
