
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from './firebase';
import type { Sponsor } from '../types';

const SPONSORS_COLLECTION = 'patrocinadors';

export const getSponsors = async (): Promise<Sponsor[]> => {
  const sponsorsCol = collection(db, SPONSORS_COLLECTION);
  const sponsorSnapshot = await getDocs(sponsorsCol);
  const sponsorList = sponsorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Sponsor));
  return sponsorList;
};

export const addSponsor = async (sponsor: Omit<Sponsor, 'id'>): Promise<void> => {
  await addDoc(collection(db, SPONSORS_COLLECTION), sponsor);
};

export const updateSponsor = async (id: string, sponsor: Omit<Sponsor, 'id'>): Promise<void> => {
  const sponsorDoc = doc(db, SPONSORS_COLLECTION, id);
  await updateDoc(sponsorDoc, sponsor);
};

export const deleteSponsor = async (id: string): Promise<void> => {
  const sponsorDoc = doc(db, SPONSORS_COLLECTION, id);
  await deleteDoc(sponsorDoc);
};
