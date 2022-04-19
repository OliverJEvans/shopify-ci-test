export const PER_PAGE = 6;

export class RelayConnection {
  edges = [];
  pageInfo = {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null,
  };
}
