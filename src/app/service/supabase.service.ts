import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseKey, supabaseUrl } from '../config/supabase';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      supabaseUrl,
      supabaseKey
    );
  }

  async uploadImage(file: File): Promise<string | null> {
    try {
      const filePath = `images/${file.name}`; 
      const { data, error } = await this.supabase.storage
        .from('images') 
        .upload(filePath, file);

      const { data: publicURL } = this.supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicURL.publicUrl);
      return publicURL.publicUrl;
    } 
    catch (err) {
      console.error('Unexpected error:', err);
      return null;
    }
  }
}
