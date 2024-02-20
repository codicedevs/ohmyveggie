// mongo-change-stream.service.ts
import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { EventEmitter2 } from '@nestjs/event-emitter'; // Importa EventEmitter2 de @nestjs/event-emitter

@Injectable()
export class MongoEventEmitter {
    private client: MongoClient;
    private changeStream: any;

    constructor(private readonly eventEmitter: EventEmitter2) { } // Inyecta EventEmitter2

    async connect() {
        this.client = new MongoClient(process.env.MONGODB_URL, { monitorCommands: true });
        await this.client.connect();
        const db = this.client.db('ohmyveggie');
        const collection = db.collection('prueba');
        // Establece un Change Stream en la colección
       this.changeStream = collection.watch();
        // Escucha los cambios en la colección
        this.changeStream.on('change', (change: any) => {
         this.eventEmitter.emit("change",change)
        });
    }}
