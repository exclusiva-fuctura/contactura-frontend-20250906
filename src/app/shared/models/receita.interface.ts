export interface IReceita {
  id?: number;
  data: string;
  valor: number;
  tipo: string;
  ehFixo: boolean;
  descricao: string;
}