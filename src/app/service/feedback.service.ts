import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CommonService } from './common.service';
import { Feedback } from '../model/feedback.model';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService extends CommonService<Feedback> {
feedback = signal<Feedback|undefined>(undefined);
  constructor(httpClient: HttpClient) {
    super(httpClient, 'feedback');
  }
  getAllFeedback() {
    return super.getAll();
  }

  getByRecipeId(id: number) {
    return super.getById(id);
  }

  addFeedback(model:Feedback){
    return super.add(model).subscribe({
        next:(val) => 
            this.feedback.set(val)
    });
  }
}
