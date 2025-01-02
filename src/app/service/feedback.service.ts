import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CommonService } from './common.service';
import { Feedback } from '../model/feedback.model';
import { UrlSetupConfigService } from './url-setup-config.service';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService extends CommonService<Feedback> {
  constructor(httpClient: HttpClient, apiurlsetup: UrlSetupConfigService
  ) {
    super(httpClient, apiurlsetup);
  }
  getAllFeedback() {
    return super.getAll();
  }

  getByRecipeId(id: number) {
    return super.getById(id);
  }
  
    addFeedback(model: Feedback) {
      return super.add(model);
    }
}
