import { Request, Response, Router } from '../../config';
import { GeneroNegocio } from '../../negocio/GeneroNegocio';

export class GeneroPresentacion {

    public router: Router;
    private generoNegocio: GeneroNegocio;
    public nro: Number;
    public nombre: String;

    constructor(nro?: Number, nombre?: String) { 
        this.router = Router();
        this.createRoutes();
        this.generoNegocio = new GeneroNegocio();
        this.nro = Number(nro);
        this.nombre = String(nombre);
    }

    public async obtenerPresentacionGenero(request: Request, response: Response): Promise<void> {
        let listaGeneros: Array<{ nro: number, nombre: string }> = await this.generoNegocio.obtenerListaGenero();
        response.render('genero/registrar_genero', {
            lista_generos: listaGeneros
        });
    }

    public async obtenerPresentacionModificarGenero(request: Request, response: Response): Promise<void> {
        let { nro } = request.params;
        let datosGenero = await this.generoNegocio.obtenerDatosGenero(Number(nro));
        response.render('genero/modificar_genero', {
            nro: datosGenero.nro,
            nombre: datosGenero.nombre
        });
    }

    public async registrarGenero(request: Request, response: Response): Promise<void> {
        let {nro, nombre} = request.body;
        await this.generoNegocio.registrarGenero(Number(nro), nombre);
            this.obtenerPresentacionGenero(request, response);
    }

    public async modificarGenero(request: Request, response: Response): Promise<void> {
        let { nro } = request.params;
        let { nombre } = request.body;
        await this.generoNegocio.modificarGenero(Number(nro), nombre);
            this.obtenerPresentacionGenero(request, response);
    }

    public async eliminarGenero(request: Request, response: Response): Promise<void> {
        let { nro } = request.params;
        await this.generoNegocio.eliminarGenero(Number(nro));
            this.obtenerPresentacionGenero(request, response);
    }

    private createRoutes() {
        this.router.route('/').get(async (req: Request, res: Response) => this.obtenerPresentacionGenero(req, res));
        this.router.route('/').post(async (req: Request, res: Response) => this.registrarGenero(req, res));
        this.router.route('/:nro').get(async (req: Request, res: Response) => this.obtenerPresentacionModificarGenero(req, res));
        this.router.route('/modificar/:nro').put(async (req: Request, res: Response) => this.modificarGenero(req, res));
        this.router.route('/eliminar/:nro').delete(async (req: Request, res: Response) => this.eliminarGenero(req, res));
    }
}