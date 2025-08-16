import React, { useState } from 'react';
import type { Sponsor, TipoColaboracion, SponsorStatus } from '../types';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import RadioGroup from './ui/RadioGroup';

interface SponsorFormProps {
  initialData?: Sponsor | null;
  onSubmit: (data: Omit<Sponsor, 'id'>) => void;
  onCancel: () => void;
}

const colaboracionOptions = [
  { value: 'econòmica', title: 'Econòmica', description: 'Aportació monetària.' },
  { value: 'difusió', title: 'Difusió', description: 'Ajuda en la promoció.' },
];

const aportacionOptions = [
    { value: '50', title: 'Opció NUFAN', description: '50 €' },
    { value: '100', title: 'Opció Lagwagon', description: '100 €' },
];

const statusOptions = [
    { value: 'pendent', title: 'Pendent', description: 'Encara no confirmat.' },
    { value: 'confirmat', title: 'Confirmat', description: 'Compromís formalitzat.' },
];

const SponsorForm: React.FC<SponsorFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || '',
    email: initialData?.email || '',
    aportacion: initialData?.aportacion?.toString() || '',
    tipoColaboracion: initialData?.tipoColaboracion || 'econòmica',
    notas: initialData?.notas || '',
    estat: initialData?.estat || 'pendent',
  });

  const handleTipoColaboracionChange = (value: string) => {
    const newTipo = value as TipoColaboracion;
    setFormData(prev => ({
      ...prev,
      tipoColaboracion: newTipo,
      aportacion: newTipo === 'difusió' ? '' : prev.aportacion,
    }));
  };
  
  const handleAportacionChange = (value: string) => {
    setFormData(prev => ({ ...prev, aportacion: value }));
  };
  
  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, estat: value as SponsorStatus }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.tipoColaboracion === 'econòmica' && !formData.aportacion) {
        alert("Per favor, selecciona un pla d'aportació.");
        return;
    }
    const submissionData = {
      ...formData,
      aportacion: formData.aportacion ? parseFloat(String(formData.aportacion)) : undefined,
      tipoColaboracion: formData.tipoColaboracion as TipoColaboracion,
      estat: formData.estat as SponsorStatus
    };
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 mb-1">Nom</label>
          <Input id="nombre" name="nombre" type="text" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Estat</label>
        <RadioGroup
          className="mt-2"
          name="estat"
          options={statusOptions}
          value={formData.estat}
          onChange={handleStatusChange}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700">Tipus de Col·laboració</label>
        <RadioGroup
          className="mt-2"
          name="tipoColaboracion"
          options={colaboracionOptions}
          value={formData.tipoColaboracion}
          onChange={handleTipoColaboracionChange}
        />
      </div>

      {formData.tipoColaboracion === 'econòmica' && (
        <div>
          <label className="block text-sm font-medium text-slate-700">Pla d'Aportació</label>
           <RadioGroup
            className="mt-2"
            name="aportacion"
            options={aportacionOptions}
            value={formData.aportacion}
            onChange={handleAportacionChange}
          />
        </div>
      )}

      <div>
        <label htmlFor="notas" className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
        <Textarea id="notas" name="notas" value={formData.notas} onChange={handleChange} rows={4} />
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel·lar
        </Button>
        <Button type="submit">
          {initialData ? 'Guardar Canvis' : 'Crear Patrocinador'}
        </Button>
      </div>
    </form>
  );
};

export default SponsorForm;