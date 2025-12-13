export interface InfoMessageDetail {
  header: string;
  message: string;
  criticality: Criticality;
}

export enum Criticality {
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}
