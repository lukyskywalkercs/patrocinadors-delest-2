import React from 'react';
import type { Sponsor } from '../types';
import { EditIcon } from './icons/EditIcon';
import { DeleteIcon } from './icons/DeleteIcon';
import { RefuseIcon } from './icons/RefuseIcon';
import Card from './ui/Card';

interface SponsorTableProps {
  sponsors: Sponsor[];
  onEdit: (sponsor: Sponsor) => void;
  onDelete: (id: string) => void;
  onRefuse: (id: string) => void;
}

const getStatusClasses = (status: Sponsor['estat']) => {
    switch (status) {
        case 'confirmat':
            return 'bg-green-100 text-green-800';
        case 'pendent':
            return 'bg-yellow-100 text-yellow-800';
        case 'refusat':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-slate-100 text-slate-800';
    }
};


const SponsorTable: React.FC<SponsorTableProps> = ({ sponsors, onEdit, onDelete, onRefuse }) => {
  if (sponsors.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-slate-800">No s'han trobat patrocinadors</h3>
          <p className="text-slate-500 mt-1">Intenta ajustar la teua cerca o afig un nou patrocinador.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="overflow-x-auto">
        <div className="min-w-full bg-white rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nom</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Web</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Estat</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Aportació</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tipus</th>
                    <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Accions</span>
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                {sponsors.map((sponsor) => (
                    <tr key={sponsor.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{sponsor.nombre}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-500">{sponsor.email || 'N/D'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {sponsor.web ? (
                            <a 
                                href={sponsor.web.startsWith('http') ? sponsor.web : `https://${sponsor.web}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
                            >
                                Visitar
                            </a>
                        ) : (
                            <span className="text-sm text-slate-400">N/D</span>
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${getStatusClasses(sponsor.estat)}`}>
                            {sponsor.estat}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-500">
                        {sponsor.aportacion ? `${sponsor.aportacion.toLocaleString('es-ES')} €` : 'N/D'}
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {sponsor.tipoColaboracion ? (
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${sponsor.tipoColaboracion === 'econòmica' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'}`}>
                                {sponsor.tipoColaboracion}
                            </span>
                        ) : (
                             <span className="text-sm text-slate-400">Per definir</span>
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-4">
                        {sponsor.estat !== 'refusat' && (
                            <button onClick={() => onRefuse(sponsor.id)} className="text-slate-500 hover:text-orange-600 transition-colors" title="Marcar com a refusat">
                                <RefuseIcon className="w-5 h-5" />
                            </button>
                        )}
                        <button onClick={() => onEdit(sponsor)} className="text-slate-500 hover:text-indigo-600 transition-colors" title="Editar patrocinador">
                            <EditIcon className="w-5 h-5" />
                        </button>
                        <button onClick={() => onDelete(sponsor.id)} className="text-slate-500 hover:text-red-600 transition-colors" title="Eliminar patrocinador">
                            <DeleteIcon className="w-5 h-5" />
                        </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default SponsorTable;