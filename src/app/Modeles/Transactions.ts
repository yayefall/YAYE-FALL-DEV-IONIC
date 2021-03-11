
export interface Transactions {
  id: number;
  code: string;
  montant: number;
  partEtat: number;
  partEntreprise: number;
  partAgentRetrait: number;
  partAgentDepot: number;
  clients: any;
  comptes: any;
  userRetrait: any;
  userDepot: any;
  dateDepot: Date;
  dateRetrait: Date;
}
