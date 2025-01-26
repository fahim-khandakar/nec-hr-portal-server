type PaginationParams = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
};

type PaginationResult = {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
  offset: number;
  limit: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export const calculatePagination = ({
  currentPage = 1,
  itemsPerPage = 10,
  totalItems,
}: PaginationParams): PaginationResult => {
  const validCurrentPage = Math.max(1, currentPage);
  const validItemsPerPage = Math.max(1, itemsPerPage);

  const totalPages = Math.ceil(totalItems / validItemsPerPage);

  const page = Math.min(validCurrentPage, totalPages);

  const offset = (page - 1) * validItemsPerPage;

  return {
    currentPage: page,
    itemsPerPage: validItemsPerPage,
    totalPages,
    totalItems,
    offset,
    limit: validItemsPerPage,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};
