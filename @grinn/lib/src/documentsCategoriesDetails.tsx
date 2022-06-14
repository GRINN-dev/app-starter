import { IdentityIcon, KeyIcon, BookOpenIcon, BankIcon } from "@grinn/icons";

export const getDocumentsCategoriesTitle = (category: string) =>
  category === "PROJECT"
    ? "mon projet"
    : category === "IDENTITY"
    ? "mon identité"
    : category === "INCOME_AND_CHARGES"
    ? "mes revenus et charges"
    : category === "BANK_ACCOUNT"
    ? "mes relevés bancaires"
    : category;

export const getDocumentsCategoriesIcons = (category: string) =>
  category === "PROJECT" ? (
    <KeyIcon className="w-6 h-6" />
  ) : category === "IDENTITY" ? (
    <IdentityIcon className="w-6 h-6" />
  ) : category === "INCOME_AND_CHARGES" ? (
    <BookOpenIcon className="w-8 h-8" />
  ) : category === "BANK_ACCOUNT" ? (
    <BankIcon className="w-8 h-8" />
  ) : (
    ""
  );
