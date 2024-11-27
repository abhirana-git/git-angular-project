import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RecipeService } from '../../service/recipe.service';
import { Recipe } from '../../model/recipe.model';
import { SupabaseService } from '../../service/supabase-service.service';

@Component({
  selector: 'app-add-recipe',
  standalone: false,
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {
  isStepsEntered:boolean=true;
  isIngrdntEntered:boolean=true;
  uploadedImageUrl:string|null=null;
  constructor(private httpService: RecipeService,
    private supabaseService:SupabaseService
  ) {}

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
      this.form.value.image = this.uploadedImageUrl;
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
    this.form.reset()
  }

  async onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const imageUrl = await this.supabaseService.uploadImage(file);
      console.log('outside if add function image url', imageUrl);
      if (imageUrl) {
        console.log('add function image url', this.uploadedImageUrl);
        this.uploadedImageUrl = imageUrl; // Store the public URL
        console.log('add function image url', this.uploadedImageUrl);
      }
    }
}
}
