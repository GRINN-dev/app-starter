export interface RecapTableProps {
  /** Etat d'avancement de la consultation */
  timer?: "IN_PROGRESS" | "FINISHED";
  /** Liste des propositions reçues */
  columns: RecapTableColumn[];
  /** Evenement déclanché à la selection d'une offre */
  onSelectOffer?: (offer: string) => void;
}

interface RecapTableColumn {
  /** Id de l'offre */
  offerId: string;
  /** Banque emettant l'offre */
  bank: Bank;
  /** Durée de l'emprunt */
  loanTerm: number;
  /** Montant de l'emprunt **en centimes** */
  loanAmount: number;
  /** Taux */
  rate: number;
  /**mensualité hors assurance, **en centimes** */
  monthlyPayment: number;
  /** Mesualités, assurance incluse, **en centimes** */
  monthlyPaymentWithInsurance: number;
}

interface Bank {
  /** ID de la banque */
  id: string;
  /**Nom de la banque */
  name: string;
  /**Logo de la banque */
  logo: string;
}
