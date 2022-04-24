import { QueryResult } from "pg";
import { Conexion } from "../database/Conexion";


export class AlquilerDatos {

    private nro: number;
    private fecha: string;
    private monto: number;
    private conexionDB: Conexion;

    constructor(nro?: number, fecha?: string, monto?: number) {
        this.nro = nro || -1;
        this.fecha = fecha || "none";
        this.monto= monto || -1;
        this.conexionDB = Conexion.getInstancia();
    }

    public setNro(nro: number): void {
        this.nro = nro;
    }

    public setFecha(fecha: string): void {
        this.fecha = fecha;
    }

    public setMonto(monto: number): void {
        this.monto = monto;
    }

    public getNro(): number {
        return this.nro;
    }

    public getFecha(): string {
        return this.fecha;
    }

    public getMonto(): number {
        return this.monto;
    }


    public async obtenerListaAlquiler(): Promise<Array<{ nro: number, fecha: string, monto: number }> | undefined> {
        let resultado: QueryResult = await this.conexionDB.ejecutarConsultaSQL(`select * from alquiler order by nro`);
        return resultado.rows;
    }

    public async obtenerDatosAlquiler(nro_alquiler: number): Promise<{ nro: number, fecha: string, monto: number }> {
        let alquilerResultado: QueryResult = await this.conexionDB.ejecutarConsultaSQL(`select nro, fecha, monto from alquiler where nro=${nro_alquiler}`);
        return alquilerResultado.rows[0];
    }

    public async registrarAlquiler(): Promise<boolean> {
        let resultado = await this.conexionDB.ejecutarConsultaSQL(`insert into alquiler(nro, fecha, monto) values ('${this.nro}', '${this.fecha}', '${this.monto}') returning nro`);
        return typeof resultado.rows[0].nro === 'number';
    }

    public async modificarAlquiler(): Promise<boolean> {
        try {
            await this.conexionDB.ejecutarConsultaSQL(`update alquiler set fecha='${this.fecha}', monto='${this.monto}' where nro=${this.nro}`);
            return true;
        } catch (error) {
            console.log("Error en metodo modificar Alquiler", error);
            return false;
        }
    }

    public async eliminarAlquiler(): Promise<boolean> {
        try {
            await this.conexionDB.ejecutarConsultaSQL(`delete from alquiler where nro=${this.nro}`);
            return true;
        } catch (error) {
            console.log("Error en metodo eliminarAlquiler", error);
            return false;
        }
    }
}