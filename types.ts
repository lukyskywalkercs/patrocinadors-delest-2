export type TipoColaboracion = 'econòmica' | 'difusió';
export type SponsorStatus = 'confirmat' | 'pendent';

export interface Sponsor {
  id: string;
  nombre: string;
  email?: string;
  web?: string;
  aportacion?: number;
  tipoColaboracion?: TipoColaboracion;
  notas: string;
  estat: SponsorStatus;
}