import { serverHTTP, Application } from './config';
import morgan from 'morgan';
import path from 'path';
import expressHandlebars from 'express-handlebars';
import methodOverride from 'method-override';
import { Conexion } from './database/Conexion';

import { GeneroPresentacion } from './presentacion/genero/GeneroPresentacion';
import { PeliculaPresentacion } from './presentacion/pelicula/PeliculaPresentacion';
import { AlquilerPresentacion } from './presentacion/alquiler/AlquilerPresentacion';

export class App {

    private app: Application;

    constructor(port?: number | string) {
        this.app = serverHTTP();
        this.app.set('PORT', process.env.PORT || port || 4000); 
        this.setting();
        this.middlewares();
        this.routes();
    }

    private setting(): void {
        this.app.set("views", path.join(__dirname, "presentacion"));
        let hbs = expressHandlebars.create({
            extname: '.hbs',    
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',  
            layoutsDir: path.join(this.app.get('views'), 'layout'),
            helpers: {
                foo: function (a: Number, b: Number, opts: any) {
                    return (a == b) ? opts.fn(this) : opts.inverse(this);;
                }
            }
        });
        this.app.engine('.hbs', hbs.engine);
        this.app.set('view engine', '.hbs');     
        this.app.use(serverHTTP.urlencoded({ extended: true }));
        this.app.use(methodOverride('_method'));
        let conexion = Conexion.getInstancia();
    }

    private middlewares(): void {
        this.app.use(morgan('dev'));
        this.app.use(serverHTTP.json());
    }

    private routes(): void {
        let presentacionGenero: GeneroPresentacion = new GeneroPresentacion();
        this.app.use('/registrar_genero', presentacionGenero.router);
        let presentacionPelicula: PeliculaPresentacion = new PeliculaPresentacion();
        this.app.use('/registrar_pelicula', presentacionPelicula.router);
        let presentacionAlquiler: AlquilerPresentacion = new AlquilerPresentacion();
        this.app.use('/registrar_alquiler', presentacionAlquiler.router);
        this.app.get('/', async (req, res) => {
            res.render('dashboard');
        })
    }

    public async listen(): Promise<void> {
        await this.app.listen(this.app.get('PORT'));
        console.log(`Server on port ${this.app.get('PORT')}`);
    }
}