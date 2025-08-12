import type { Observable } from 'rxjs';
import { Illustration } from '../illustration';

export abstract class IllustrationRepository {
  abstract create(blob: Blob): Observable<Illustration>;
  abstract compress(blob: Blob, { targetSize }: { targetSize?: number }): Observable<Blob>;
}
