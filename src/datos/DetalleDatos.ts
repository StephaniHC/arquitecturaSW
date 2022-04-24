import { QueryResult } from "pg";
import { Conexion } from "../database/Conexion";


export class DetalleDatos {

    private nro_alquiler: number;
    private cod_pelicula: number;
    private conexionDB: Conexion;

    constructor(nro_alquiler?: number, cod_pelicula?: number) {
        this.nro_alquiler = nro_alquiler || -1;
        this.cod_pelicula= cod_pelicula || -1;
        this.conexionDB = Conexion.getInstancia();
    }

    public setNroAlquiler(nro_alquiler: number): void {
        this.nro_alquiler = nro_alquiler;
    } 

    public setCodPelicula(cod_pelicula: number): void {
        this.cod_pelicula = cod_pelicula;
    }

    public getNroAlquiler(): number {
        return this.nro_alquiler;
    } 
    public getCodPelicula(): number {
        return this.cod_pelicula;
    }
 
    public async obtenerListaDetalle(nro_alquiler: number): Promise<Array<{ nro_alquiler: number, nombre_pelicula: string}> | undefined> {
        let resultado: QueryResult = await this.conexionDB.ejecutarConsultaSQL(`select d.nro_alquiler, d.cod_pelicula, p.titulo as nombre_pelicula from detalle d, pelicula p where p.codigo = d.cod_pelicula and d.nro_alquiler=${nro_alquiler} order by d.nro_alquiler`);
        return resultado.rows;
    }

    public async obtenerDatosDetalle(nro_alquiler: number): Promise<{ nro_alquiler: number, cod_pelicula: number }> {
        let alquilerResultado: QueryResult = await this.conexionDB.ejecutarConsultaSQL(`select nro_alquiler, cod_pelicula from detalle where nro_alquiler=${nro_alquiler}`);
        return alquilerResultado.rows[0];
    }

    public async registrarDetalle(): Promise<boolean> {
        let resultado = await this.conexionDB.ejecutarConsultaSQL(`insert into detalle(nro_alquiler, cod_pelicula) values ('${this.nro_alquiler}', '${this.cod_pelicula}') returning cod_pelicula`);
        return typeof resultado.rows[0].nro === 'number';
    }

    public async eliminarDetalle(): Promise<boolean> {
        try {
            await this.conexionDB.ejecutarConsultaSQL(`delete from detalle where cod_pelicula=${this.cod_pelicula}`);
            return true;
        } catch (error) {
            console.log("Error en metodo eliminarDetalle", error);
            return false;
        }
    }
}