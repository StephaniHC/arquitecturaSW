
import { Request, Response, Router } from '../../config';
import { AlquilerNegocio } from '../../negocio/AlquilerNegocio';
import { PeliculaNegocio } from '../../negocio/PeliculaNegocio';

export class AlquilerPresentacion {

    public router: Router;
    private alquilerNegocio: AlquilerNegocio;
    private peliculaNegocio: PeliculaNegocio;
    public nro: Number;
    public fecha: String;
    public monto: Number;
    public cod_pelicula: Number;

    constructor(nro?: Number, fecha?: String, monto?: Number, cod_pelicula?: Number) { 
        this.router = Router();
        this.createRoutes();
        this.alquilerNegocio = new AlquilerNegocio();
        this.peliculaNegocio = new PeliculaNegocio();
        this.nro = Number(nro);
        this.fecha = String(fecha);
        this.monto = Number(monto);
        this.cod_pelicula = Number(cod_pelicula);
    }

    public async obtenerPresentacionAlquiler(request: Request, response: Response): Promise<void> {
        let listaAlquiler: Array<{ nro: number, fecha: string, monto: number }> = await this.alquilerNegocio.obtenerListaAlquiler();
        response.render('alquiler/registrar_alquiler', {
            lista_alquiler: listaAlquiler
        });
    }

    public async obtenerPresentacionModificarAlquiler(request: Request, response: Response): Promise<void> {
        let { nro } = request.params;
        let datosAlquiler = await this.alquilerNegocio.obtenerDatosAlquiler(Number(nro));
        response.render('alquiler/modificar_alquiler', {
            nro: datosAlquiler.nro,
            fecha: datosAlquiler.fecha,
            monto: datosAlquiler.monto,
        });
    }

    public async registrarAlquiler(request: Request, response: Response): Promise<void> {
        let {nro, fecha, monto} = request.body;
        await this.alquilerNegocio.registrarAlquiler(Number(nro), fecha, Number(monto));
        this.obtenerPresentacionAlquiler(request, response);
    }

    public async modificarAlquiler(request: Request, response: Response): Promise<void> {
        let { nro } = request.params;
        let { fecha } = request.body;
        let { monto } = request.body;
        await this.alquilerNegocio.modificarAlquiler(Number(nro), fecha, monto);
        this.obtenerPresentacionAlquiler(request, response);
    }

    public async eliminarAlquiler(request: Request, response: Response): Promise<void> {
        let { nro } = request.params;
        await this.alquilerNegocio.eliminarAlquiler(Number(nro));
            this.obtenerPresentacionAlquiler(request, response);
    }

    public async obtenerPresentacionDetalle(request: Request, response: Response): Promise<void> {
        let { nro } = request.params;
        let listaAlquiler = await this.alquilerNegocio.obtenerListaDetalle(Number(nro));
        let datosDetalle = await this.alquilerNegocio.obtenerDatosAlquiler(Number(nro));
        let listaPelicula = await this.peliculaNegocio.obtenerListaPeliculas();
        response.render('alquiler/registrar_detalle', {
            lista_alquiler: listaAlquiler,
            lista_peliculas: listaPelicula,
            nro: datosDetalle.nro
        });
    }

    public async registrarDetalle(request: Request, response: Response): Promise<void> {
        let {nro_alquiler, cod_pelicula} = request.body;
        await this.alquilerNegocio.registrarDetalle(Number(nro_alquiler), Number(cod_pelicula));
            this.obtenerPresentacionDetalle(request, response);
    }

    public async eliminarDetalle(request: Request, response: Response): Promise<void> {
        let { cod_pelicula } = request.params;
        await this.alquilerNegocio.eliminarDetalle(Number(cod_pelicula));
            this.obtenerPresentacionAlquiler(request, response);
    }

    private createRoutes() {
        this.router.route('/').get(async (req: Request, res: Response) => this.obtenerPresentacionAlquiler(req, res));
        this.router.route('/').post(async (req: Request, res: Response) => this.registrarAlquiler(req, res));
        this.router.route('/:nro').get(async (req: Request, res: Response) => this.obtenerPresentacionModificarAlquiler(req, res));
        this.router.route('/modificar/:nro').put(async (req: Request, res: Response) => this.modificarAlquiler(req, res));
        this.router.route('/eliminar/:nro').delete(async (req: Request, res: Response) => this.eliminarAlquiler(req, res));
        this.router.route('/detalle/:nro').get(async (req: Request, res: Response) => this.obtenerPresentacionDetalle(req, res));
        this.router.route('/registrar_detalle/registrar/:nro').post(async (req: Request, res: Response) => this.registrarDetalle(req, res));
        this.router.route('/registrar_detalle/eliminar/:cod_pelicula').delete(async (req: Request, res: Response) => this.eliminarDetalle(req, res));
        
    }
}