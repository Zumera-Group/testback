export enum TGlobalAlertType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error'
}

export interface IGlobalAlert {
  type: TGlobalAlertType,
  text: string
}