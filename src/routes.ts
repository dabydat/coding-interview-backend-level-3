import { Server } from "@hapi/hapi"
import { getItems, getItemById, createItem, updateItem, deleteItem } from "./controllers/itemController";

export const defineRoutes = (server: Server) => {
    server.route([
        {
            method: 'GET',
            path: '/ping',
            handler: (request, h) => {
                return { ok: true };
            },
        },
        {
            method: 'GET',
            path: '/items',
            handler: getItems,
        },
        {
            method: 'GET',
            path: '/items/{id}',
            handler: getItemById,
        },
        {
            method: 'POST',
            path: '/items',
            handler: createItem,
        },
        {
            method: 'PUT',
            path: '/items/{id}',
            handler: updateItem,
        },
        {
            method: 'DELETE',
            path: '/items/{id}',
            handler: deleteItem,
        },
    ])  
}