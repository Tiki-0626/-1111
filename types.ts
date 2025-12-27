
export enum TreeMorphState {
  SCATTERED = 'SCATTERED',
  TREE_SHAPE = 'TREE_SHAPE'
}

export interface OrnamentData {
  position: [number, number, number];
  scatterPosition: [number, number, number];
  color: string;
  size: number;
}

export interface WishResponse {
  message: string;
  author: string;
}
