import { Area } from './area';
import { Telefono } from './telefono';
export class Agente {

  cuil: number = 0;
  nombre: string = "";
  funcion: string = "";
  cod_sexo: string = "";
  area: Area = new Area();
  email: string = "";
  Telefonos: Telefono[] = [];

  constructor() {}

}
