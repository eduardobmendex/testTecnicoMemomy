import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Input, output } from '@angular/core';
import { ServicosService } from '../../servicos/servicos.service';
 @Component({
  selector: 'app-modal-add-collaborators',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: 'modalAddCollaborators.component.html',
  styleUrl: './modalAddCollaborators.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ServicosService]
})
export class ModalAddCollaboratorsComponent {
 
   newColaborador:any={
     
      "nome": '',
      "cpf": '',
      "dataEmissao":'',
      "remuneracao": '',
      "cargo": {
          "id": 1
      }
  
   }
   
  
   constructor(private servicosService: ServicosService,private formBuilder: FormBuilder) { } 

 
  
    form: FormGroup = new FormGroup({
      nome: new FormControl(''),
      cpf: new FormControl(''),
      dataEmissao: new FormControl(''),
      remuneracao: new FormControl(1),
      cargo: new FormControl(1),
    });
    colaborador:any={
     "nome": this.form.value.nome,
     "cpf": this.form.value.cpf,
     "dataEmissao":this.form.value.dataEmissao,
     "remuneracao": this.form.value.remuneracao,
     "cargo": {
         "id": this.form.value.cargo
     }
    }
      

    ngOnInit(): void {
      this.form = this.formBuilder.group(
        {
          nome: [''],
          cpf: [''],
          dataEmissao: [''],
          remuneracao: [1],
          cargo: [1]
           
        },
        
      );
    }

 

  onSubmit(): void {
      const formValues = this.form.value;
      const newColaborador = {
        nome: formValues.nome,
        cpf: formValues.cpf,
        dataEmissao: formValues.dataEmissao,
        remuneracao: formValues.remuneracao,
        cargo: {
          id: formValues.cargo
        }
      };

      console.log(newColaborador);
    
  
  
    this.servicosService.createCollaborators(newColaborador)
    .subscribe(response => {
      console.log('Colaborador atualizado:', response);
    }, error => {
      console.error('Erro ao atualizar colaborador:', error);
    });
  
  }
}
  
    



