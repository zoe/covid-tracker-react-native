export type TMessageTypes = 'BANNER' | 'DIALOG' | 'SNACKBAR';

export interface IUIAction {
  action: string;
  label: string;
}

export interface IUIMessageContent {
  title?: string;
  body: string;
}

export interface IUIMessage {
  actions?: IUIAction[];
  messageType: TMessageTypes;
  message: IUIMessageContent;
}

export interface IUIMessageCollection {
  messages: IUIMessage[];
}
