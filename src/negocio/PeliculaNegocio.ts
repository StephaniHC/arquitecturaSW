
import { PeliculaDatos } from "../datos/PeliculaDatos";


export class PeliculaNegocio {

    private peliculaDatos: PeliculaDatos;

    constructor() {
        this.peliculaDatos = new PeliculaDatos();
    }

    public async obtenerListaPeliculas(): Promise<Array<{ codigo: number, titulo: string, duracion: string, anio: number, nombre_genero: string }>> {
        let listaPeliculas = await this.peliculaDatos.obtenerListaPeliculas();
        return listaPeliculas ?? [];
    }

    public async registrarPelicula(codigo: number,titulo: string, duracion: string, anio:number, nro_genero: number): Promise<boolean> {
        this.peliculaDatos.setCodigo(codigo);
        this.peliculaDatos.setTitulo(titulo);
        this.peliculaDatos.setDuracion(duracion); 
        this.peliculaDatos.setAnio(anio);
        this.peliculaDatos.setNroGenero(nro_genero);
        return await this.peliculaDatos.registrarPelicula();
    }

    public async obtenerDatosPelicula(codigo: number): Promise<{ codigo: number,  titulo: string, duracion: string, anio:number, nro_genero: number }> {
        this.peliculaDatos.setCodigo(codigo);
        return await this.peliculaDatos.obtenerDatosPelicula() ?? {
            codigo: -1, 
            titulo: "none",
            duracion: "none",
            anio: -1,
            nro_genero: -1
        };
    }

    public async modificarPelicula(codigo: number, titulo: string, duracion: string, anio: number, nro_genero: number): Promise<boolean> {
        this.peliculaDatos.setCodigo(Number(codigo)); 
        this.peliculaDatos.setTitulo(titulo);
        this.peliculaDatos.setDuracion(duracion); 
        this.peliculaDatos.setAnio(anio);
        this.peliculaDatos.setNroGenero(nro_genero);
        return await this.peliculaDatos.modificarPelicula();
    }

    public async eliminarPelicula(codigo: number): Promise<boolean> {
        this.peliculaDatos.setCodigo(Number(codigo));
        return await this.peliculaDatos.eliminarPelicula();
    }
}