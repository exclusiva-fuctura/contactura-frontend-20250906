import { IDespesa } from "./despesa.interface";
import { IReceita } from "./receita.interface";

export class Lancamento {
  id?: number;
  data: string;
  valor: number;
  tipo: string;
  fixo: boolean;
  descricao?: string;
  ehReceita: boolean;
  mensagem?: string;

  constructor(lancamento: IDespesa | IReceita) {
    this.id = lancamento.id;
    this.data = lancamento.data;
    this.valor = lancamento.valor;
    this.tipo = lancamento.tipo;
    this.fixo = lancamento.fixo;
    this.descricao = lancamento.descricao;
    this.ehReceita = false; // valor padrão
  }

  setReceita(): void {
    this.ehReceita = true;
  }

  setDespesa(): void {
    this.ehReceita = false;
  }
}