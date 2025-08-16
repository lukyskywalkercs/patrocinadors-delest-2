import React from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import SegmentedControl from './ui/SegmentedControl';
import type { TipoColaboracion, SponsorStatus } from '../types';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: 'tots' | TipoColaboracion;
  setFilterType: (type: 'tots' | TipoColaboracion) => void;
  filterStatus: 'tots' | SponsorStatus;
  setFilterStatus: (status: 'tots' | SponsorStatus) => void;
}

const typeFilterOptions = [
  { label: 'Tots', value: 'tots' },
  { label: 'Econòmica', value: 'econòmica' },
  { label: 'Difusió', value: 'difusió' },
];

const statusFilterOptions = [
    { label: 'Tots', value: 'tots' },
    { label: 'Propostes', value: 'proposta' },
    { label: 'Pendents', value: 'pendent' },
    { label: 'Confirmats', value: 'confirmat' },
    { label: 'Refusats', value: 'refusat' },
  ];

const Filters: React.FC<FiltersProps> = ({ searchTerm, setSearchTerm, filterType, setFilterType, filterStatus, setFilterStatus }) => {
  return (
    <Card className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Busca per nom</label>
          <Input
            id="search"
            type="text"
            placeholder="Ex: Acme Corp"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
           <label className="block text-sm font-medium text-slate-700 mb-1">Tipus de col·laboració</label>
          <SegmentedControl
            options={typeFilterOptions}
            value={filterType}
            onChange={(value) => setFilterType(value as 'tots' | TipoColaboracion)}
          />
        </div>
        <div>
           <label className="block text-sm font-medium text-slate-700 mb-1">Estat</label>
          <SegmentedControl
            options={statusFilterOptions}
            value={filterStatus}
            onChange={(value) => setFilterStatus(value as 'tots' | SponsorStatus)}
          />
        </div>
      </div>
    </Card>
  );
};

export default Filters;