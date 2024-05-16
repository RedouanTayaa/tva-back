import { Observable } from 'rxjs';

export interface UseCase<S, T> {
  execute(params: S): Observable<T>;
}

export interface UseCasePromise<S, T> {
  execute(params: S): Promise<T>;
}
