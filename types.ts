export type TipoColaboracion = 'econòmica' | 'difusió';
export type SponsorStatus = 'proposta' | 'pendent' | 'confirmat' | 'refusat' | 'seguiment' | 'sense resposta';
export type ContactMethod = 'email' | 'telèfon' | 'formulari web' | 'presencialment' | 'xarxes socials' | 'whatsapp';

export interface Sponsor {
  id: string;
  nombre: string;
  email?: string | null;
  web?: string | null;
  aportacion?: number | null;
  tipoColaboracion?: TipoColaboracion | null;
  notas: string;
  estat: SponsorStatus;
  contactMethods?: ContactMethod[] | null;
}