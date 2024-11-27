import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RecipeService } from '../../service/recipe.service';
import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-add-recipe',
  standalone: false,
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {
  base64Image: string | null = null;
  isStepsEntered:boolean=true;
  isIngrdntEntered:boolean=true;
  constructor(private httpService: RecipeService) {}

  form = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    ingredients: new FormArray([new FormControl('', { validators: [Validators.required] })]),
    steps: new FormArray([new FormControl('', { validators: [Validators.required] })]),
    image: new FormControl(''),
  });

get ingredients(){
  return this.form.get('ingredients') as FormArray;
}

get steps(){
  return this.form.get('steps') as FormArray;
}

  addIngredient(){
    this.isIngrdntEntered=true;
    const lastIngredientVal = this.ingredients.controls[this.ingredients.length-1]?.value;
    if(lastIngredientVal && lastIngredientVal.trim() != ''){
      const ingredientCtrl = new FormControl('', { validators: [Validators.required] })
      this.ingredients.push(ingredientCtrl);
    }
    else{
      this.isIngrdntEntered = false;
    }
  }

  addStep(){
   this.isStepsEntered = true;
   const lastStepEntered = this.steps.controls[this.steps.length-1]?.value;
   if(lastStepEntered && lastStepEntered.trim() != ''){
    const stepsCtrl = new FormControl('', { validators: [Validators.required] })
    this.steps.push(stepsCtrl);
   }
   else{
    this.isStepsEntered=false;
   }
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.value.image = this.base64Image;
      const recipe: Recipe = this.form.value as Recipe;
      this.httpService.add(recipe).subscribe({
        next: (response: any) => {
          console.log('Recipe added successfully:', response.value);
        },
        error: (err: any) => {
          console.error('Error adding recipe:', err);
        },
      });
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.base64Image = reader.result as string;
        console.log('Base64 Image:', this.base64Image);
      };

      reader.readAsDataURL(file);
  }
}
}
