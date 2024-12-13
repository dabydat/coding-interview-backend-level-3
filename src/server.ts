import 'reflect-metadata';
import Hapi from '@hapi/hapi';
import { defineRoutes } from './routes';
import { initializeDataSource } from './config/data-source';

const getServer = () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 4000,
    });

    defineRoutes(server);

    return server;
};

export const initializeServer = async () => {
    await initializeDataSource();
    const server = getServer();
    await server.initialize();
    return server;
};

export const startServer = async () => {
    await initializeDataSource();
    const server = getServer();
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    return server;
};