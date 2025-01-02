export interface Recipe {
  id:number;
  title: string;
  ingredients: string[];
  steps: string[];
  image: string;
}

export interface ApiResponse<T> {
  _data: T; 
  _statusCode: number; 
  _message: string; 
}