import { QueryResult } from "pg";
import { Conexion } from "../database/Conexion";

export class PeliculaDatos {
    
    private codigo: number; 
    private titulo: string;
    private duracion: string; 
    private anio: number; 
    private nro_genero: number;
    
    private conexionDB: Conexion;

    constructor(codigo?: number, titulo?: string, duracion?: string, anio?:number, nro_genero?: number) {
        this.codigo = codigo ? codigo : 0; 
        this.titulo = titulo ? titulo : "sin titulo";
        this.duracion = duracion ? duracion : "no hay duracion"; 
        this.anio = anio ? anio : 0; 
        this.nro_genero = nro_genero ? nro_genero : 0;
        this.conexionDB = Conexion.getInstancia();
    }

    public setCodigo(codigo: number): void {
        this.codigo = codigo;
    } 

    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    public setDuracion(duracion: string): void {
        this.duracion = duracion;
    }

    public setAnio(anio: number): void {
        this.anio = anio;
    } 

    public setNroGenero(nro_genero: number): void {
        this.nro_genero = nro_genero;
    }

    public getCodigo(): number {
        return this.codigo;
    }

    public getTitulo(): string {
        return this.titulo;
    }

    public getDuracion(): string {
        return this.duracion;
    } 

    public getAnio(): number {
        return this.anio;
    }  
 
    public getNroGenero(): number {
        return this.nro_genero;
    }

    public async obtenerListaPeliculas(): Promise<Array<{ codigo: number, titulo: string, duracion: string, anio: number, nombre_genero: string }>> {
        let resultadoLista: QueryResult = await this.conexionDB.ejecutarConsultaSQL(`select p.codigo, p.titulo, p.duracion, p.anio, g.nombre as nombre_genero from pelicula p, genero g where p.nro_genero=g.nro order by p.codigo`);
        return resultadoLista.rows;
    }

    public async obtenerDatosPelicula(): Promise<{ codigo: number, titulo: string, duracion: string, anio: number, nro_genero: number } | undefined> {
        try {
            let datosDePelicula: QueryResult = await this.conexionDB.ejecutarConsultaSQL(`select * from pelicula where codigo=${this.codigo}`);
            if (datosDePelicula.rowCount > 0) {
                return {
                    codigo: datosDePelicula.rows[0].codigo, 
                    titulo: datosDePelicula.rows[0].titulo,
                    duracion: datosDePelicula.rows[0].duracion, 
                    anio: datosDePelicula.rows[0].anio, 
                    nro_genero: datosDePelicula.rows[0].nro_genero
                }
            } else {
                return undefined;
            }
        } catch (error) {
            console.log("Error en metodo obtener Datos De Genero", error);
            return undefined;
        }
    }

    public async registrarPelicula(): Promise<boolean> {
        let resultado = await this.conexionDB.ejecutarConsultaSQL(`insert into pelicula(codigo, titulo, duracion, anio, nro_genero) values ( '${this.codigo}','${this.titulo}', '${this.duracion}', '${this.anio}', ${this.nro_genero}) returning codigo`);
        return typeof resultado.rows[0].codigo === 'number';
    }

    public async modificarPelicula(): Promise<boolean> {
        try {
            await this.conexionDB.ejecutarConsultaSQL(`update pelicula set titulo='${this.titulo}', duracion='${this.duracion}', anio='${this.anio}', nro_genero=${this.nro_genero} where codigo=${this.codigo};`);
            return true;
        } catch (error) {
            console.log("Error en metodo modificar Pelicula modelo", error);
            return false;
        }
    }

    public async eliminarPelicula(): Promise<boolean> {
        try {
            await this.conexionDB.ejecutarConsultaSQL(`delete from pelicula where codigo=${this.codigo}`);
            return true;
        } catch (error) {
            console.log("Error en metodo eliminar Pelicula", error);
            return false;
        }
    }

}