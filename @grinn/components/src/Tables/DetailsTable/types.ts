export interface DetailsTableProps {
  /** Liste des détails des propositions reçues */
  columns: {
    /** Taux annuel effectif global */
    taeg: number;
    /** Taux annuel effectif d'assurance */
    taea: number;
    /** Relatif à l'emprunt */
    loan: Loan;
    /** Relatif aux conditions */
    conditions: Conditions;
  }[];
}

interface Loan {
  /** Coût des intérêts */
  interest: number;
  /** Coût de l'assurance */
  insurance: number;
  /** Frais de garantie */
  warrantyFee: number;
  /** Frais bancaires */
  bankFee: number;
  /** Coût total de l'emprunt */
  total: number;
}

interface Conditions {
  /** Transférabilité de l'emprunt */
  transfer: boolean;
  /** Modularité / report de l'emprunt */
  deferment: boolean;
  /** Exonération de l'indemnité de remboursement anticipé */
  iraExemption: boolean;
}
