import { AlquilerDatos } from "../datos/AlquilerDatos";
import { DetalleDatos } from "../datos/DetalleDatos";


export class AlquilerNegocio {

    private alquilerDatos: AlquilerDatos;
    private detalleDatos: DetalleDatos;

    constructor() {
        this.alquilerDatos = new AlquilerDatos();
        this.detalleDatos = new DetalleDatos();
    }

    public async obtenerListaAlquiler(): Promise<Array<{ nro: number, fecha: string, monto: number }>> {
        let listaAlquiler: Array<{ nro: number, fecha: string, monto: number }> | undefined = await this.alquilerDatos.obtenerListaAlquiler();
        return listaAlquiler ?? [];
    }

    public async obtenerDatosAlquiler(nro_alquiler: number): Promise<{ nro: number, fecha: string, monto: number }> {
        let datosAlquiler: { nro: number, fecha: string, monto: number } = await this.alquilerDatos.obtenerDatosAlquiler(nro_alquiler);
        return datosAlquiler;
    }

    public async registrarAlquiler(nro: number, fecha: string, monto: number): Promise<boolean> {
        this.alquilerDatos.setNro(nro);
        this.alquilerDatos.setFecha(fecha); 
        this.alquilerDatos.setMonto(monto);         
        return await this.alquilerDatos.registrarAlquiler();
    }

    public async modificarAlquiler(nro_alquiler: number, fecha: string, monto: number): Promise<boolean> {
        this.alquilerDatos.setFecha(fecha);
        this.alquilerDatos.setMonto(monto);
        this.alquilerDatos.setNro(Number(nro_alquiler));
        return await this.alquilerDatos.modificarAlquiler();
    }

    public async eliminarAlquiler(nro: number): Promise<boolean> {
        this.alquilerDatos.setNro(Number(nro));
        return await this.alquilerDatos.eliminarAlquiler();
    }

    public async obtenerListaDetalle(nro_alquiler: number): Promise<Array<{ nro_alquiler: number, nombre_pelicula: string }>> {
        let listaDetalle= await this.detalleDatos.obtenerListaDetalle(nro_alquiler);
        return listaDetalle ?? [];
    }

    public async obtenerDatosDetalle(nro_alquiler: number): Promise<{ nro_alquiler: number, cod_pelicula: number }> {
        let datosDetalle: { nro_alquiler: number, cod_pelicula: number } = await this.detalleDatos.obtenerDatosDetalle(nro_alquiler);
        return datosDetalle;
    }

    public async registrarDetalle(nro_alquiler: number, cod_pelicula: number): Promise<boolean> {
        this.detalleDatos.setNroAlquiler(nro_alquiler);
        this.detalleDatos.setCodPelicula(cod_pelicula);         
        return await this.detalleDatos.registrarDetalle();
    }

    public async eliminarDetalle(cod_pelicula: number): Promise<boolean> {
        this.detalleDatos.setCodPelicula(Number(cod_pelicula));
        return await this.detalleDatos.eliminarDetalle();
    }
}