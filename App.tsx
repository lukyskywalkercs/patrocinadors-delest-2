import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Sponsor, TipoColaboracion, SponsorStatus } from './types';
import { getSponsors, addSponsor, updateSponsor, deleteSponsor } from './services/sponsorService';
import Header from './components/Header';
import Filters from './components/Filters';
import SponsorTable from './components/SponsorTable';
import SponsorForm from './components/SponsorForm';
import Modal from './components/ui/Modal';
import { PlusIcon } from './components/icons/PlusIcon';
import Button from './components/ui/Button';

const getFirebaseErrorMessage = (error: unknown): string => {
  let message = "S'ha produït un error inesperat. Intenta-ho de nou més tard.";
  if (error instanceof Error && 'code' in error) {
    const firebaseError = error as { code: string; message: string };
    switch (firebaseError.code) {
      case 'permission-denied':
        return "Error de permisos. Revisa les regles de seguretat de Firestore a la consola de Firebase.";
      case 'unavailable':
        return "No s'ha pogut connectar a Firestore. Comprova la teva connexió a Internet i que les regles de seguretat estiguin publicades correctament.";
      case 'not-found':
        return "No s'ha trobat el recurs sol·licitat.";
      case 'invalid-argument':
        return "Dades invàlides. Comprova els camps del formulari.";
      default:
        return `S'ha produït un error en comunicar-se amb la base de dades. (Codi: ${firebaseError.code})`;
    }
  } else if (error instanceof Error) {
    return error.message;
  }
  return message;
};

const App: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'tots' | TipoColaboracion>('tots');
  const [filterStatus, setFilterStatus] = useState<'tots' | SponsorStatus>('tots');

  const fetchSponsors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const sponsorsData = await getSponsors();
      setSponsors(sponsorsData);
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSponsors();
  }, [fetchSponsors]);

  const handleAddSponsor = () => {
    setEditingSponsor(null);
    setIsModalOpen(true);
  };

  const handleEditSponsor = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setIsModalOpen(true);
  };

  const handleDeleteSponsor = async (id: string) => {
    if (window.confirm('Estàs segur que vols eliminar este patrocinador?')) {
      try {
        await deleteSponsor(id);
        setSponsors(prev => prev.filter(s => s.id !== id));
      } catch (err) {
        setError(getFirebaseErrorMessage(err));
        console.error(err);
      }
    }
  };

  const handleFormSubmit = async (sponsorData: Partial<Omit<Sponsor, 'id'>>) => {
    try {
      setError(null);
      if (editingSponsor && editingSponsor.id) {
        await updateSponsor(editingSponsor.id, sponsorData);
      } else {
        const { nombre, email, estat, notas, aportacion, tipoColaboracion } = sponsorData;
        if (!nombre || !email || !estat) {
          const errorMessage = "El nom, l'email i l'estat són camps obligatoris.";
          setError(errorMessage);
          console.error(errorMessage, sponsorData);
          return; // Stay in modal to fix data
        }
        
        const newSponsor: Omit<Sponsor, 'id'> = {
            nombre,
            email,
            estat,
            notas: notas ?? '',
            aportacion,
            tipoColaboracion
        };
        await addSponsor(newSponsor);
      }
      setIsModalOpen(false);
      setEditingSponsor(null);
      fetchSponsors(); // Refresh data
    } catch (err) {
      const errorMessage = getFirebaseErrorMessage(err);
      setError(errorMessage);
      console.error(err);
    }
  };

  const filteredSponsors = useMemo(() => {
    return sponsors
      .filter(sponsor => {
        if (filterType === 'tots') return true;
        return sponsor.tipoColaboracion === filterType;
      })
      .filter(sponsor => {
        if (filterStatus === 'tots') return true;
        return sponsor.estat === filterStatus;
      })
      .filter(sponsor => 
        sponsor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [sponsors, searchTerm, filterType, filterStatus]);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSponsor(null);
    setError(null);
  }

  return (
    <div className="min-h-screen text-slate-800">
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Patrocinadors</h1>
            <p className="text-slate-500 mt-1">Gestiona els patrocinadors de Delest.</p>
          </div>
          <Button onClick={handleAddSponsor}>
            <PlusIcon className="w-5 h-5 mr-2" />
            Afig Patrocinador
          </Button>
        </div>

        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        
        {error && !isModalOpen && <p className="text-red-500 bg-red-100 p-3 rounded-lg my-4">{error}</p>}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-500">Carregant patrocinadors...</p>
          </div>
        ) : (
          <SponsorTable
            sponsors={filteredSponsors}
            onEdit={handleEditSponsor}
            onDelete={handleDeleteSponsor}
          />
        )}
      </main>

      {isModalOpen && (
        <Modal
          title={editingSponsor ? 'Editar Patrocinador' : 'Afig Patrocinador'}
          onClose={closeModal}
        >
          <SponsorForm
            initialData={editingSponsor}
            onSubmit={handleFormSubmit}
            onCancel={closeModal}
            submissionError={error}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
