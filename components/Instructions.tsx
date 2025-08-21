import React from 'react';
import Card from './ui/Card';
import { EditIcon } from './icons/EditIcon';

const Instructions: React.FC = () => {
  return (
    <Card className="mb-6 bg-slate-100/80 border-slate-200">
      <h2 className="text-lg font-semibold text-slate-800 mb-3">Com funciona aquesta eina?</h2>
      <div className="text-slate-600 space-y-4 text-sm leading-relaxed">
        <p>
          Benvingut al Gestor de Patrocinadors de Delest. Aquesta eina està dissenyada per a centralitzar i facilitar la gestió de tots els patrocinis del grup.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Afegir un patrocinador:</strong> Fes clic al botó <span className="font-semibold text-slate-800">"Afig Patrocinador"</span> per obrir el formulari i introduir les dades d'una nova empresa o contacte.
          </li>
          <li>
            <strong>Editar un patrocinador:</strong> A la llista, cada patrocinador té un botó d'edició (amb una icona de llapis <EditIcon className="w-4 h-4 inline-block -mt-1 mx-0.5" />). Fes-hi clic per a modificar les seues dades.
          </li>
          <li>
            <strong>Filtrar i buscar:</strong> Utilitza els controls de cerca i els filtres per a localitzar ràpidament els patrocinadors per nom, tipus de col·laboració o estat.
          </li>
        </ul>

        <div>
            <h3 className="font-semibold text-slate-700 mt-4 mb-2">Què significa cada Estat?</h3>
            <ul className="list-disc list-inside space-y-1">
                <li><span className="font-semibold">Proposta:</span> Una empresa o contacte que tenim pendent contactar.</li>
                <li><span className="font-semibold">Pendent:</span> Ja s'ha contactat i estem esperant una resposta.</li>
                <li><span className="font-semibold">Confirmat:</span> El patrocini ha sigut acceptat i formalitzat.</li>
                <li><span className="font-semibold">Refusat:</span> L'empresa ha declinat la proposta de patrocini.</li>
            </ul>
        </div>
        
        <div>
            <h3 className="font-semibold text-slate-700 mt-4 mb-2">Tipus de Col·laboració</h3>
             <ul className="list-disc list-inside space-y-1">
                <li><span className="font-semibold">Econòmica:</span> El patrocinador realitza una aportació monetària directa.</li>
                <li><span className="font-semibold">Difusió:</span> El patrocinador ajuda a promocionar el grup a través dels seus canals (xarxes socials, web, etc.).</li>
            </ul>
        </div>

        <p>
          Totes les dades es guarden de forma segura i automàtica.
        </p>
      </div>
    </Card>
  );
};

export default Instructions;