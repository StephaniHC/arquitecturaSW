import { QueryResult } from "pg";
import { Conexion } from "../database/Conexion";


export class GeneroDatos {

    private nro: number;
    private nombre: string;
    private conexionDB: Conexion;

    constructor(nro?: number, nombre?: string) {
        this.nro = nro || -1;
        this.nombre = nombre || "none";
        this.conexionDB = Conexion.getInstancia();
    }

    public setNro(nro: number): void {
        this.nro = nro;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getNro(): number {
        return this.nro;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public async obtenerListaGenero(): Promise<Array<{ nro: number, nombre: string }> | undefined> {
        let resultado: QueryResult = await this.conexionDB.ejecutarConsultaSQL(`select * from genero order by nro`);
        return resultado.rows;
    }

    public async obtenerDatosGenero(nro_genero: number): Promise<{ nro: number, nombre: string }> {
        let generoResultado: QueryResult = await this.conexionDB.ejecutarConsultaSQL(`select nro, nombre from genero where nro=${nro_genero}`);
        return generoResultado.rows[0];
    }

    public async registrarGenero(): Promise<boolean> {
        let resultado = await this.conexionDB.ejecutarConsultaSQL(`insert into genero(nro, nombre) values ('${this.nro}', '${this.nombre}') returning nro`);
        return typeof resultado.rows[0].nro === 'number';
    }

    public async modificarGenero(): Promise<boolean> {
        try {
            await this.conexionDB.ejecutarConsultaSQL(`update genero set nombre='${this.nombre}' where nro=${this.nro}`);
            return true;
        } catch (error) {
            console.log("Error en metodo modificarGenero", error);
            return false;
        }
    }

    public async eliminarGenero(): Promise<boolean> {
        try {
            await this.conexionDB.ejecutarConsultaSQL(`delete from genero where nro=${this.nro}`);
            return true;
        } catch (error) {
            console.log("Error en metodo eliminarGenero", error);
            return false;
        }
    }
}