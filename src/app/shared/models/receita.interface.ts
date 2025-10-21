export interface IReceita {
  id?: number;
  data: string;
  valor: number;
  tipo: string;
  fixo: boolean;
  descricao?: string;
}