import React from 'react';
import type { Sponsor } from '../types';
import { EditIcon } from './icons/EditIcon';
import { DeleteIcon } from './icons/DeleteIcon';
import Card from './ui/Card';

interface SponsorTableProps {
  sponsors: Sponsor[];
  onEdit: (sponsor: Sponsor) => void;
  onDelete: (id: string) => void;
}

const SponsorTable: React.FC<SponsorTableProps> = ({ sponsors, onEdit, onDelete }) => {
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
                        <div className="text-sm text-slate-500">{sponsor.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                            sponsor.estat === 'confirmat' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {sponsor.estat}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-500">
                        {sponsor.aportacion ? `${sponsor.aportacion.toLocaleString('es-ES')} €` : 'N/D'}
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sponsor.tipoColaboracion === 'econòmica' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'}`}>
                        {sponsor.tipoColaboracion}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-4">
                        <button onClick={() => onEdit(sponsor)} className="text-slate-500 hover:text-indigo-600 transition-colors">
                            <EditIcon className="w-5 h-5" />
                        </button>
                        <button onClick={() => onDelete(sponsor.id)} className="text-slate-500 hover:text-red-600 transition-colors">
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