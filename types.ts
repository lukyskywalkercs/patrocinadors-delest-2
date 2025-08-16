export type TipoColaboracion = 'econòmica' | 'difusió';
export type SponsorStatus = 'confirmat' | 'pendent';

export interface Sponsor {
  id: string;
  nombre: string;
  email?: string | null;
  web?: string | null;
  aportacion?: number | null;
  tipoColaboracion?: TipoColaboracion | null;
  notas: string;
  estat: SponsorStatus;
}
