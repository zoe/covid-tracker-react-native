export type TMessageTypes = 'BANNER' | 'DIALOG' | 'SNACKBAR';

export interface IUIAction {
  action: () => void;
  name: string;
}

export interface IUIMessage {
  actions?: IUIAction[];
  messageType: TMessageTypes;
  message: string;
}

export interface IUIMessageCollection {
  messages: IUIMessage[];
}
