import React, { useState, useEffect } from 'react';
import type { Sponsor, TipoColaboracion, SponsorStatus } from '../types';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import RadioGroup from './ui/RadioGroup';

interface SponsorFormProps {
  initialData?: Sponsor | null;
  onSubmit: (data: Partial<Omit<Sponsor, 'id'>>) => void;
  onCancel: () => void;
  submissionError?: string | null;
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
    { value: 'refusat', title: 'Refusat', description: 'Ha declinat el patrocini.' },
];

const SponsorForm: React.FC<SponsorFormProps> = ({ initialData, onSubmit, onCancel, submissionError }) => {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || '',
    email: initialData?.email || '',
    web: initialData?.web || '',
    aportacion: initialData?.aportacion?.toString() || '',
    tipoColaboracion: initialData?.tipoColaboracion,
    notas: initialData?.notas || '',
    estat: initialData?.estat || 'pendent',
  });
  
  // When switching to confirmed, if no collab type is set, default to 'econòmica'
  useEffect(() => {
    if (formData.estat === 'confirmat' && !formData.tipoColaboracion) {
        setFormData(prev => ({...prev, tipoColaboracion: 'econòmica'}));
    }
  }, [formData.estat, formData.tipoColaboracion]);


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
    
    const submissionData: Partial<Omit<Sponsor, 'id'>> = {
      nombre: formData.nombre.trim(),
      email: formData.email.trim() || null,
      web: formData.web.trim() || null,
      notas: formData.notas.trim(),
      estat: formData.estat as SponsorStatus,
      tipoColaboracion: null,
      aportacion: null,
    };

    if (formData.estat === 'confirmat') {
      submissionData.tipoColaboracion = formData.tipoColaboracion;
      if (formData.tipoColaboracion === 'econòmica' && formData.aportacion) {
        submissionData.aportacion = parseFloat(formData.aportacion);
      }
    }
    
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
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email <span className="text-slate-400 font-normal">(Opcional)</span></label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>
      </div>
      
      <div>
        <label htmlFor="web" className="block text-sm font-medium text-slate-700 mb-1">Pàgina Web <span className="text-slate-400 font-normal">(Opcional)</span></label>
        <Input id="web" name="web" type="url" placeholder="https://exemple.com" value={formData.web} onChange={handleChange} />
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
      
      {formData.estat === 'confirmat' && (
        <div className="space-y-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <label className="block text-sm font-medium text-slate-700">Tipus de Col·laboració</label>
            <RadioGroup
              className="mt-2"
              name="tipoColaboracion"
              options={colaboracionOptions}
              value={formData.tipoColaboracion!}
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
        </div>
      )}

      <div>
        <label htmlFor="notas" className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
        <Textarea id="notas" name="notas" value={formData.notas} onChange={handleChange} rows={4} />
      </div>

      {submissionError && (
        <div role="alert" className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          <p className="text-sm font-medium">{submissionError}</p>
        </div>
      )}

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