import { Injectable } from "@nestjs/common";
import { SentMessageInfo } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { registrationTemplate } from "./templates/email.welcome.template";
import { purchaseSuccessTemplate } from "./templates/email.purchase.template";
import { passworRecoveryTemplate } from "./templates/email.recover.password.template";
import { smtpSettings } from "src/settings";
import { User } from "src/users/schemas/user.schema";
import setupTransporter from "./utils/email.transporter";



@Injectable()
export class EmailService {
    constructor() {
    }
    private readonly defaultSender = smtpSettings.AUTH_USER;
    private transporter = setupTransporter();

    async send(mailOptions: Mail.Options): Promise<SentMessageInfo> {
        return this.transporter.sendMail(mailOptions);
    }
    /**
     * Envía correo de aviso de alta de usuario en el sistema.
     * @param user Usuario creado
     */
    async sendUserRegistration(user: User): Promise<SentMessageInfo> {
        return this.send({
            to: user.email,
            from: this.defaultSender,
            subject: "Bienvenido a " + "Oh my veggie",
            html: registrationTemplate(user)
        })
    }
    /**
     * 
     * @param user Envia correo de aviso por compra exitosa
     * @returns 
     */
    async sendUserPurchaseSuccessEmail(user: User,orderId:string): Promise<SentMessageInfo> {
        return this.send({
            to: user.email,
            from: this.defaultSender,
            subject: "Gracias por su compra en" + "Oh my veggie",
            html: purchaseSuccessTemplate(user,orderId)
        })
    }
    /**
     *  Envia correo con el reset key al usuario que lo solicita
     * @param user 
     * @param resetKey 
     * @returns 
     */
    async sendPasswordRecovery(user: User, resetKey: number): Promise<SentMessageInfo> {
        return this.send({
            to: user.email,
            from: this.defaultSender,
            subject: "Recupere su contraseña en " + "Oh my veggie",
            html: passworRecoveryTemplate(user, resetKey)
        })
    }
}