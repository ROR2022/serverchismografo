import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
//import { Response } from 'express';
import * as webpush from 'web-push';
import { FirebaseService } from './firebase.service';
//import e from 'express';

@Controller()
export class AppController {
  subscriptions: any[] = [];
  dataEnv: any;
  dataAdmin: any;
  constructor(
    private appRService: AppService,
    private firebaseService: FirebaseService,
  ) {
    this.dataEnv = this.appRService.getDataEnv();
    this.dataAdmin = this.firebaseService.getAdmin();
    console.log("dataAdmin(FireBase):..",this.dataAdmin);
    //console.log("dataEnv:..",this.dataEnv.VAPID_PRIVATE_KEY);
    //console.log("dataEnv:..",this.dataEnv.VAPID_PUBLIC_KEY);
    const vapidEmail = `mailto:${this.dataEnv.FIREBASE_CLIENT_EMAIL}`;
    //console.log("vapidEmail:..",vapidEmail);
    const vapidKeys = {
      publicKey: this.dataEnv.VAPID_PUBLIC_KEY,
      privateKey: this.dataEnv.VAPID_PRIVATE_KEY,
    };
    webpush.setVapidDetails(
      `${vapidEmail}`,
      vapidKeys.publicKey,
      vapidKeys.privateKey
    )
  }

  /* @Get()
  redirect(@Res() res: Response) {
    res.redirect('http://localhost:3000');
  } */

   @Get()
  getHello(): string {
    return this.appRService.getHello();
  }
  
  @Post("/subscribe") 
  subscribe(@Req() req:Request): any {
    const subscription:any = req.body;
    console.log("subscription:...",subscription);
    //primero checamos que no exista la suscripcion en base a la propiedad endpoint
    const existingSubscription = this.subscriptions.find(sub => sub.endpoint === subscription.endpoint);
    if (existingSubscription) {
      const message = "Subscription already exists.";
      return { message };
    }else{
      console.log("Subscription does not exist.");
      this.subscriptions.push(subscription);
      const message = "SW Subscribed!";
    return { message };
    }
    
    
  }

  //agrergar un metodo para enviar notificaciones actualizando el metodo sendNotification
  @Post("/send-notification")
  async sendNotification(@Req() req:Request): Promise<any> {
    const bodyRequest:any = req.body;
    console.log("bodyRequest",bodyRequest);
    const {data} = bodyRequest;
    const notificationPayload = {
      title: "New ROR-Notification",
      body: data ? data : "Notification from ROR",
      icon: "https://clientchismografo.vercel.app/icon-192x192.png",
      data: {
        url: "https://google.com",
      },
  };
  const options = {
    vapidDetails: {
      subject: 'mailto:rami.ror279@gmail.com',
      publicKey: this.dataEnv.VAPID_PUBLIC_KEY,
      privateKey: this.dataEnv.VAPID_PRIVATE_KEY,
    },
  };
try {
  const results = await Promise.all(
    this.subscriptions.map(async(subscription) =>{
      return webpush.sendNotification(subscription, JSON.stringify(notificationPayload), options)
      .then(response => {
        console.log(`Notification sent successfully to ${subscription.endpoint}`);
        console.log(`Result:`, response);
        return { status: 'success', endpoint: subscription.endpoint, response };
      })
      .catch(error => {
        console.error(`Error sending notification to ${subscription.endpoint}`, error);
        return { status: 'failure', endpoint: subscription.endpoint, error };
      })
    }
    )
  );
    
      console.log("Notification sent successfully.");
      return { message: "Notification sent successfully.", results }
  } catch(err:any) {
      console.error("Error sending notification",err);
      return { message: "Error sending notification" };
    }
  }

  
  /*
  @Get(':name')
  getHelloName(@Param() params: any): string {
    return `Hola ${params.name}!`;
  } */
}
