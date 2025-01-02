export interface Feedback{
    recipeId:number|string;
    userId?:string|null;
    rating?: number|string; 
    name: string;
    feedback?: string;
  }