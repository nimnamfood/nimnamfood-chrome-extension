import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@/env';
import { IllustrationRepository } from './illustration-repository';
import { Illustration } from '../illustration';

export class IllustrationHttpRepository extends IllustrationRepository {
  private readonly httpClient = inject(HttpClient);

  override create(blob: Blob): Observable<Illustration> {
    const formData = new FormData();
    formData.append('file', blob);
    return this.httpClient.post<Illustration>('/api/illustrations', formData);
  }

  override compress(blob: Blob, { targetSize }: { targetSize?: number } = {}): Observable<Blob> {
    return this.httpClient.post(`${environment.webpServiceUrl}/convert`, blob, {
      headers: { 'Content-Type': blob.type },
      params: targetSize ? { size: targetSize } : {},
      responseType: 'blob',
    });
  }
}
