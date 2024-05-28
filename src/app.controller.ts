import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
//import { Response } from 'express';
import * as webpush from 'web-push';
//import e from 'express';

@Controller()
export class AppController {
  subscriptions: any[] = [];
  dataEnv: any;
  constructor(private appRService: AppService) {
    this.dataEnv = this.appRService.getDataEnv();
    const vapidKeys = {
      publicKey: this.dataEnv.VAPID_PUBLIC_KEY,
      privateKey: this.dataEnv.VAPID_PRIVATE_KEY,
    };
    webpush.setVapidDetails(
      "mailto:rami.ror279@gmail.com",
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
    const subscription = req.body;
    console.log("subscription:...",subscription);
    this.subscriptions.push(subscription);
    const message = "Subscribed!";
    return { message };
  }

  @Post("/send-notification")
  async sendNotification(@Req() req:Request): Promise<any> {
    const bodyRequest = req.body;
    console.log("bodyRequest",bodyRequest);
    const notificationPayload = {
      title: "New ROR-Notification",
      body: "This is a new ROR-notification",
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
      webpush.sendNotification(subscription, JSON.stringify(notificationPayload), options)
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
