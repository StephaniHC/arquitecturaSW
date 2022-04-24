import { Pool, QueryResult } from 'pg';
import { config as dotenv } from 'dotenv';

export class Conexion {

    private static _instancia: Conexion;
    private session: Pool;
    
    private constructor(host: string, user: string, password: string, database: string, port: number) {
        try {
            this.session = new Pool({
                host,
                user,
                password,
                database,
                port
            });
            this.session.connect();
            console.log(`Base de Datos Conectada"${database} en hots: ${host}:${port}" por el usuario: ${user}`);
        } catch (error) {
            console.log(`Error en la conexion a la BD: ${database}`);
        }
    }

    public static getInstancia(): Conexion {
        if (!this._instancia) {
            dotenv();
            let { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
            this._instancia = new Conexion(String(DB_HOST), String(DB_USERNAME), String(DB_PASSWORD), String(DB_DATABASE), parseInt(String(DB_PORT)));
        }
        return this._instancia;
    }

    public async ejecutarConsultaSQL(consultaSQL: string): Promise<QueryResult> {
        let resultado: QueryResult = await this.session.query(consultaSQL);
        return resultado;
    }
}