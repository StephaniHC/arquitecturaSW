import { GeneroDatos } from "../datos/GeneroDatos";


export class GeneroNegocio {

    private generoDatos: GeneroDatos;

    constructor() {
        this.generoDatos = new GeneroDatos();
    }

    public async obtenerListaGenero(): Promise<Array<{ nro: number, nombre: string }>> {
        let listaGeneros: Array<{ nro: number, nombre: string }> | undefined = await this.generoDatos.obtenerListaGenero();
        return listaGeneros ?? [];
    }

    public async obtenerDatosGenero(nro_genero: number): Promise<{ nro: number, nombre: string }> {
        let datosGenero: { nro: number, nombre: string } = await this.generoDatos.obtenerDatosGenero(nro_genero);
        return datosGenero;
    }

    public async registrarGenero(nro: number, nombre: string): Promise<boolean> {
        this.generoDatos.setNro(nro);
        this.generoDatos.setNombre(nombre);         
        return await this.generoDatos.registrarGenero();
    }

    public async modificarGenero(nro_genero: number, nombre: string): Promise<boolean> {
        this.generoDatos.setNombre(nombre);
        this.generoDatos.setNro(Number(nro_genero));
        return await this.generoDatos.modificarGenero();
    }

    public async eliminarGenero(nro: number): Promise<boolean> {
        this.generoDatos.setNro(Number(nro));
        return await this.generoDatos.eliminarGenero();
    }
}