// mongo-change-stream.service.ts
import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { EventEmitter2 } from '@nestjs/event-emitter'; // Importa EventEmitter2 de @nestjs/event-emitter

@Injectable()
export class MongoChangeStreamService {
    private client: MongoClient;
    private changeStream: any;

    constructor(private readonly eventEmitter: EventEmitter2) { } // Inyecta EventEmitter2

    async connect() {
        this.client = new MongoClient('mongodb+srv://agustinmacazzaga:PZuJ288k4Kyn5vW5@ohmyveggie.4xaykot.mongodb.net/', { monitorCommands: true });
        await this.client.connect();
        const db = this.client.db('ohmyveggie');
        const collection = db.collection('prueba');

        // Establece un Change Stream en la colección
        this.changeStream = collection.watch();

        // Escucha los cambios y emite un evento
        this.changeStream.on('change', (change: any) => {
            if (change) {
                this.eventEmitter.emit('dataChanged', change); // Emitir el evento 'dataChanged' con el cambio
                console.log(change)
            }
        });
    }

    async disconnect() {
        if (this.client) {
            await this.client.close();
        }
    }
}
