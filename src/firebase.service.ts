import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class FirebaseService implements OnModuleInit {
  private defaultApp: admin.app.App;
  private serviceAccount: any;

  constructor(private readonly configService: ConfigService) {
    this.serviceAccount = {
        type: this.configService.get<string>('FIREBASE_TYPE'),
        project_id: this.configService.get<string>('FIREBASE_PROJECT_ID'),
        private_key_id: this.configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
        private_key: (this.configService.get<string>('FIREBASE_PRIVATE_KEY')).replace(/\\n/g, '\n'),
        client_email: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
        client_id: this.configService.get<string>('FIREBASE_CLIENT_ID'),
        auth_uri: this.configService.get<string>('FIREBASE_AUTH_URI'),
        token_uri: this.configService.get<string>('FIREBASE_TOKEN_URI'),
        auth_provider_x509_cert_url: this.configService.get<string>('FIREBASE_AUTH_PROVIDER_X509_CERT_URL'),
        client_x509_cert_url: this.configService.get<string>('FIREBASE_CLIENT_X509_CERT_URL'),
        universe_domain: this.configService.get<string>('FIREBASE_UNIVERSE_DOMAIN'),
    }
  }

  onModuleInit() {
    this.initializeFirebaseAdmin();
  }

  private initializeFirebaseAdmin() {
    
    this.defaultApp = admin.initializeApp({
      credential: admin.credential.cert(this.serviceAccount),
    });

    console.log('Firebase Admin initialized');
  }

  getAdmin() {
    return this.defaultApp;
  }
}
