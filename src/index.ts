import { App } from './app';

async function main(): Promise<void> {
    const app = new App(3000);
    await app.listen();
}

main();