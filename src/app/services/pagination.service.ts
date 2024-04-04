// pagination.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private http: HttpClient) {}

  getPaginatedData(
    // url: string,
    page: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get('../assets/heliverse_mock_data.json').pipe(
      map((data: any) => {
        return data.slice((page - 1) * pageSize, page * pageSize);
      })
    );
  }

  totalRecords(): Observable<any> {
    return this.http.get('../assets/heliverse_mock_data.json').pipe(
      map((data: any) => {
        return data.length;
      })
    );
  }

  getAllGenders(): Observable<any> {
    return this.http.get('../assets/heliverse_mock_data.json').pipe(
      map((data: any) => {
        return [...new Set(data.map((data: { gender: any }) => data.gender))];
      })
    );
  }
}
