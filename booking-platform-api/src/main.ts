import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ServicesService } from './services/services.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global API prefix
  app.setGlobalPrefix('api');


  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );


  // CORS Configuration
  app.enableCors({

    origin: [
      'http://localhost:5173',

      // Replace this with your actual frontend Vercel URL
      'https://your-frontend-project.vercel.app',
    ],

    methods: [
      'GET',
      'HEAD',
      'PUT',
      'PATCH',
      'POST',
      'DELETE',
      'OPTIONS',
    ],

    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],

    credentials: true,

  });



  // Swagger Configuration
  const config = new DocumentBuilder()

    .setTitle('Booking Platform API')

    .setDescription(
      'The booking platform API documentation'
    )

    .setVersion('1.0')

    .addBearerAuth()

    .build();



  const document = SwaggerModule.createDocument(
    app,
    config
  );


  SwaggerModule.setup(
    'docs',
    app,
    document,
    {
      customSiteTitle: 'Booking API Docs',
    }
  );



  // Database Seeding Logic
  const servicesService = app.get(ServicesService);

  const existingServices = await servicesService.findAll();


  if (existingServices.length === 0) {

    console.log('Seeding initial services...');


    await servicesService.create({

      title: 'Neon Nights Music Festival',

      description:
        'Experience a mind-blowing electronic music festival featuring world-class DJs, immersive light shows, and an unforgettable atmosphere.',

      duration: 360,

      price: 150,

      isActive: true,

    });



    await servicesService.create({

      title: 'Tech Innovation Summit 2026',

      description:
        'Join industry leaders and visionaries for a full day of keynotes, networking, and hands-on workshops covering AI, Web3, and the future of tech.',

      duration: 480,

      price: 299,

      isActive: true,

    });



    await servicesService.create({

      title: 'Global Food & Wine Expo',

      description:
        'Taste your way around the world with exclusive culinary experiences, masterclasses from Michelin-starred chefs, and premium wine tasting.',

      duration: 240,

      price: 85,

      isActive: true,

    });


    console.log('Seeding complete!');

  }



  await app.listen(
    process.env.PORT ?? 3000
  );
}


bootstrap();
