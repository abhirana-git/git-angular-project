export interface Feedback{
    recipeId:number|string;
    userId?:string|null;
    rating?: number|string; 
    feedback?: string;
  }