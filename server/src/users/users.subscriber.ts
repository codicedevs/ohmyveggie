import { Injectable } from "@nestjs/common";
import { MongoClient } from 'mongodb';
import { User } from "./schemas/user.schema";
import { EmailService } from "src/email/email.service";
import { serverSetting } from "src/settings";


@Injectable()
export class UserSubscriber {
  constructor(private readonly emailService: EmailService) {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    const client = new MongoClient(serverSetting.DB_URL, { monitorCommands: true });
    await client.connect();
    const db = client.db(serverSetting.DB_DATABASE);
    const collection = db.collection('users');

    // Escucha los cambios en la colección
    const changeStream = collection.watch();
    changeStream.on('change', async (event: any) => {
      if (event.operationType === "insert") {
        try {
          const user: User = event.fullDocument;
          await this.emailService.sendUserRegistration(user);
        } catch (err) { console.log(err) }

      }
    });
  }
}
