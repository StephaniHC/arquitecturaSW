import { Request, Response, Router } from '../../config';
import { GeneroNegocio } from '../../negocio/GeneroNegocio';
import { PeliculaNegocio } from '../../negocio/PeliculaNegocio';


export class PeliculaPresentacion {
    
    public router: Router;
    private peliculaNegocio: PeliculaNegocio;
    private generoNegocio: GeneroNegocio;
    public codigo: number; 
    public titulo: string;
    public duracion: string; 
    public anio: number; 
    public nro_genero: number;

    constructor( codigo?: number, titulo?: string, duracion?: string, anio?:number, nro_genero?: number) {
        this.router = Router();
        this.createRoutes();
        this.peliculaNegocio = new PeliculaNegocio();
        this.generoNegocio = new GeneroNegocio();
        this.codigo = Number(codigo);
        this.titulo = String(titulo);
        this.duracion = String(duracion);
        this.anio = Number(anio);
        this.nro_genero = Number(nro_genero);
    }

    public async obtenerPresentacionPelicula(request: Request, response: Response): Promise<void> {
        let listaDePeliculas = await this.peliculaNegocio.obtenerListaPeliculas();
        let listaDeGeneros = await this.generoNegocio.obtenerListaGenero();
        response.render('pelicula/registrar_pelicula', {
            lista_pelicula: listaDePeliculas,
            lista_generos: listaDeGeneros
        });
    }

    public async registrarPelicula(request: Request, response: Response): Promise<void> {
        let { codigo, titulo, duracion, anio, nro_genero } = request.body;
        await this.peliculaNegocio.registrarPelicula(codigo, titulo, duracion, Number(anio), Number(nro_genero));
            await this.obtenerPresentacionPelicula(request, response);
    }

    public async obtenerPresentacionModificarPelicula(request: Request, response: Response): Promise<void> {
        let { codigo } = request.params;
        let lista_generos = await this.generoNegocio.obtenerListaGenero();
        let datosDePelicula = await this.peliculaNegocio.obtenerDatosPelicula(Number(codigo));
        response.status(200).render('pelicula/modificar_pelicula', {
            codigo: datosDePelicula.codigo, 
            titulo: datosDePelicula.titulo,
            duracion: datosDePelicula.duracion, 
            anio: datosDePelicula.anio, 
            nro_genero: datosDePelicula.nro_genero,
            lista_generos: lista_generos
        });
    }

    public async modificarPelicula(request: Request, response: Response): Promise<void> {
        let { codigo } = request.params;
        let { titulo, duracion, anio, nro_genero } = request.body;
        await this.peliculaNegocio.modificarPelicula(Number(codigo), titulo, duracion, Number(anio),  nro_genero);
            this.obtenerPresentacionPelicula(request, response);
    }

    public async eliminarPelicula(request: Request, response: Response): Promise<void> {
        let { codigo } = request.params;
        await this.peliculaNegocio.eliminarPelicula(Number(codigo));
            this.obtenerPresentacionPelicula(request, response);
    }

    private createRoutes() {
        this.router.route('/').get(async (req: Request, res: Response) => this.obtenerPresentacionPelicula(req, res));
        this.router.route('/').post(async (req: Request, res: Response) => this.registrarPelicula(req, res));
        this.router.route('/:codigo').get(async (req: Request, res: Response) => this.obtenerPresentacionModificarPelicula(req, res));
        this.router.route('/modificar/:codigo').put(async (req: Request, res: Response) => this.modificarPelicula(req, res));
        this.router.route('/eliminar/:codigo').delete(async (req: Request, res: Response) => this.eliminarPelicula(req, res));
    }
}