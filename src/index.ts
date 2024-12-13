import 'reflect-metadata';
import { startServer } from './server';

startServer().catch((error) => {
    console.error('Error starting server:', error);
});