import { useRouter } from "next/router";
import { FC } from "react";
import { PaginationProps } from ".";
import { Select, Typography } from "..";

export const Pagination: FC<PaginationProps> = ({ totalCount }) => {
  const router = useRouter();

  const resultsPerPage = parseInt(router.query["results-per-page"] as string);
  const page = parseInt(router.query.page as string);

  return (
    <nav className="px-4 sm:px-6 lg:px-8">
      <div className="flex items-center w-full px-4 py-3 bg-white rounded-lg">
        <div className="hidden sm:block">
          <Select
            name="results-per-page"
            listedValues={[
              { label: "50 résultats par page", value: "50" },
              { label: "100 résultats par page", value: "100" },
            ]}
            selectedValue={[{ label: "25 résultats par page", value: "25" }]}
            onChange={e => {
              e.preventDefault();
              router.replace(
                router.pathname +
                  "?" +
                  new URLSearchParams({
                    ...router.query,
                    "results-per-page": e.target.value,
                    page: "1",
                  }),
                undefined,
                { shallow: true }
              );
            }}
          />
          <Typography className="ml-2">
            {(page - 1) * resultsPerPage + 1} -{" "}
            {Math.min(page * resultsPerPage, totalCount)} sur {totalCount}
          </Typography>
        </div>
        <div className="flex justify-between flex-1 sm:justify-end">
          <button
            className={`relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-md bg-white disabled:opacity-30 disabled:hover:bg-white hover:bg-gray-50`}
            onClick={() => {
              router.push(
                router.pathname +
                  "?" +
                  new URLSearchParams({
                    ...router.query,
                    page: (page - 1).toString(),
                  }),
                undefined,
                { shallow: true }
              );
            }}
            disabled={page === 1}
          >
            <Typography>Précédent</Typography>
          </button>
          <button
            className={`relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-md bg-white disabled:opacity-30 disabled:hover:bg-white hover:bg-gray-50`}
            onClick={() => {
              router.push(
                router.pathname +
                  "?" +
                  new URLSearchParams({
                    ...router.query,
                    page: (page + 1).toString(),
                  }),
                undefined,
                { shallow: true }
              );
            }}
            disabled={page * resultsPerPage > totalCount}
          >
            <Typography>Suivant</Typography>
          </button>
        </div>
      </div>
    </nav>
  );
};
