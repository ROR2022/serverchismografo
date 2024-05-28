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
    this.subscriptions.push(subscription);
    const message = "Subscribed!";
    return { message };
  }

  @Post("/send-notification")
  sendNotification(@Req() req:Request): any {
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

  return Promise.all(
    this.subscriptions.map((subscription) =>
      webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
    )
  )
    .then(() => { message: "Notification sent successfully." })
    .catch((err:any) => {
      console.error("Error sending notification",err);
      return { message: "Error sending notification" };
    });
  }

  
  /*
  @Get(':name')
  getHelloName(@Param() params: any): string {
    return `Hola ${params.name}!`;
  } */
}
