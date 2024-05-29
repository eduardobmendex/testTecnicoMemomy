import { Component, EventEmitter, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { ServicosService } from './servicos/servicos.service'; // Import the service
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModalCollaboratorsComponent } from './components/modalCollaborators/modalCollaborators.component';
import localePt from '@angular/common/locales/pt';
  import { ModalAddCollaboratorsComponent } from './components/modalAddCollaborators/modalAddCollaborators.component';
registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],  
  standalone: true,
  providers: [ServicosService,{ provide: LOCALE_ID, useValue: 'pt-BR' }],  
  imports: [CommonModule, FormsModule,ModalCollaboratorsComponent,ModalAddCollaboratorsComponent]
})
export class AppComponent implements OnInit {

  selectedOption:  string ='6';// Valor padrão para o botão de rádio selecionado
 

  // Método para manipular a seleção de botões de rádio
  handleRadioSelection() {
    console.log('Botão de rádio selecionado:', this.selectedOption);
    // Faça o que você precisa com o botão de rádio selecionado
  }
  public listCollaborators: any[] = []; 
  public listAllCargos: any[] = []; 
  cargoEncontrado:  any  ;// Valor padrão para o botão de rádio selecionado
  idCargo:number=0;
  nomeColaborador:string='';
  colaboradorEncontrado:any=undefined;
  pagina:number=1;
  itensPagina:number=1;
  itensPaginados:any =undefined;
 idColaborador:any='';
colaboradorIdEncontrado:any=undefined;

  constructor(private servicosService: ServicosService) { } 

  ngOnInit(): void {
    this.servicosService.getAllCollaborators()
      .subscribe(data => {
        this.listCollaborators = data; 
        console.log(data)
      });
      console.log(this.listCollaborators)
      
  }
   
  public selectedItem: any; // Item selecionado para edição

  @Output() editarItemEvent = new EventEmitter<any>();

  
  editarItem(item: any) {
    this.selectedItem = item;  
    this.editarItemEvent.emit(this.selectedItem); 
    console.log(this.selectedItem)
    this.deletarColaborador();
  }

  listarCargo():void{
    this.servicosService.buscarCargo(this.idCargo)
      .subscribe(data => {
        this.cargoEncontrado = data;
     
      });
  }
  listarTodosCargos():void{
    this.servicosService.listaAllCargos()
      .subscribe(data => {
        this.listAllCargos = data; 
         
      });
  }
  
  ColaboradorPorNome(): void {
    this.servicosService.getNameCollaborators(this.nomeColaborador)
    .subscribe(data => {
         
       let valorAchado = data.find(s => s.nome === this.nomeColaborador)
        console.log(valorAchado)
        this.colaboradorEncontrado= valorAchado;
        console.log(this.colaboradorEncontrado)

    });

}

  ColaboradorPorId():void{
    this.servicosService.buscarColaborador(this.idColaborador)
      .subscribe(data => {
        
         this.colaboradorIdEncontrado= data;
      });
  }

  buscarPaginado():void{
    this.servicosService.buscarPaginado(this.pagina,this.itensPagina)
    .subscribe(data => {
      this.itensPaginados=data;
       
    });
  }

  deletarColaborador():void{
    this.servicosService.deletarColaborador(this.selectedItem.id)
    .subscribe(data => {
      console.log(' colaborador deletado:');
    }
  ,  );
  }
  
}