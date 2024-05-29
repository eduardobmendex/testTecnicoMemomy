import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {



  constructor(private http: HttpClient) { }

  getAllCollaborators() {
    return this.http.get<any[]>(
      "http://localhost:3000/colaboradores?"
    );
  }
  getNameCollaborators(name: string) {
    return this.http.get<any[]>(
      "http://localhost:3000/colaboradores?nome_like=" + `${name}`
    );
  }
 
  buscarColaborador(colaboradorId: string): Observable<any> {
    const url = `http://localhost:3000/colaboradores/${colaboradorId}`;
    return this.http.get<any>(url);
  }
  atualizarColaborador(colaboradorId: number, dados: any): Observable<any> {
    const url = `http://localhost:3000/colaboradores/${colaboradorId}`;
    return this.http.put<any>(url, dados);
  }

  createCollaborators(colaborador: any) {
    return this.http.post<any>('http://localhost:3000/colaboradores', colaborador);
  }
  listaAllCargos() {
    return this.http.get<any[]>(
      "http://localhost:3000/cargos"
    );
  }
  buscarCargo(id: number) {
    return this.http.get<any[]>(
      "http://localhost:3000/cargos/" + `${id}`
    );
  }
  buscarPaginado(page: number, perPage: number) {
    return this.http.get<any[]>(
      "http://localhost:3000/colaboradores?_page=" + `${page}` + "&_" + `${perPage}`
    );
  }
  private baseUrl = 'http://localhost:3000/colaboradores';
 deletarColaborador(id: string) {
  return this.http.delete<any>(`${this.baseUrl}/${id}`);
 
  }
}
