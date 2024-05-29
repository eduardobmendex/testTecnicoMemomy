import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Input, output } from '@angular/core';
import { ServicosService } from '../../servicos/servicos.service';
@Component({
  selector: 'app-modal-collaborators',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: 'modalCollaborators.component.html',
  styleUrl: './modalCollaborators.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ServicosService]
})
export class ModalCollaboratorsComponent {
  @Input() selectedItem: any; // Propriedade de entrada para receber o item a ser editado

  @Input() item: any;

  public collaborator = {
    nome: '',
    remuneracao: '',
    cargo: '',
    id: 1,
    dataAdmissao: '',
    cpf: ''
  };


  imprime(): void {
    console.log('Item received in child:', this.item);
  }


  formatDate(date: any): string {
    if (!date) return '';
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  formatDateInvert(date: string): string {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
  formEdit: FormGroup | any;

  constructor(private fb: FormBuilder, private servicosService: ServicosService) { }
   ngOnInit() {
    this.formEdit = this.fb.group({
      nome: ['', Validators.required],
      remuneracao: ['', Validators.required],
      cargo: ['', Validators.required],
      id: [1],
      dataAdmissao: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]]
    });
    console.log('Item received in child:', this.fb.group);

  }

  ngOnChanges() {
    if (this.item) {
      this.formEdit.patchValue({
        id: this.item.id,
        nome: this.item.nome,
        cpf: this.item.cpf,
        dataAdmissao: this.formatDate(this.item.dataAdmissao),
        remuneracao: this.item.remuneracao,
        cargo: this.item.cargo.id,
      });
    }

  }
  onSubmit() {
    console.log(this.formEdit.value);
    const formValues = this.formEdit.value;
    const colaboradorPUT = {
      id: formValues.id,
      nome: formValues.nome,
      cpf: formValues.cpf,
      dataAdmissao:this.formatDateInvert(formValues.dataAdmissao), // Formate a data conforme necessário
      remuneracao: formValues.remuneracao,
      cargo: {
        id: formValues.cargo
      }


    }
    console.log((colaboradorPUT) )
 
this.servicosService.atualizarColaborador(colaboradorPUT.id, colaboradorPUT)
      .subscribe(response => {
        console.log('Colaborador atualizado:', response);
      }, error => {
        console.error('Erro ao atualizar colaborador:', error);
      });

  
  }

}

