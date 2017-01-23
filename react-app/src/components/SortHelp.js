import {Neighborhood} from 'gma-village-data-model'

export const customSortNeighborhoods = (n1, n2) => {
  if(n2 === Neighborhood.NORTH_OAKLAND) {
    return 1;
  } else if(n1 === Neighborhood.NORTH_OAKLAND) {
    return -1;
  } else {
    return n1.ordinal - n2.ordinal
  }
}