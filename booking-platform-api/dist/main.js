"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const services_service_1 = require("./services/services.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Booking Platform API')
        .setDescription('The booking platform API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        customCss: `
      /* Tailwind-inspired Modern Swagger Theme */
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      
      body { background-color: #f3f4f6; font-family: 'Inter', sans-serif; color: #1f2937; }
      
      .swagger-ui .topbar { background-color: #ffffff; border-bottom: 1px solid #e5e7eb; padding: 12px 0; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
      .swagger-ui .topbar .download-url-wrapper input[type=text] { border: 1px solid #d1d5db; border-radius: 6px; padding: 8px 12px; }
      .swagger-ui .topbar .download-url-wrapper .download-url-button { background-color: #3b82f6; color: white; border-radius: 6px; font-weight: 500; }
      
      .swagger-ui .info .title { color: #111827; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 2.25rem; }
      .swagger-ui .info p { font-family: 'Inter', sans-serif; color: #4b5563; font-size: 1rem; line-height: 1.5; }
      
      .swagger-ui .scheme-container { background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border-radius: 12px; margin-bottom: 2rem; padding: 1.5rem; }
      
      .swagger-ui .opblock-tag { font-size: 1.5rem; font-weight: 600; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-top: 1.5rem; }
      
      .swagger-ui .opblock { border-radius: 12px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); border: 1px solid transparent; margin-bottom: 1rem; transition: all 0.2s ease-in-out; }
      .swagger-ui .opblock:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
      
      /* Method Colors - Tailwind Palette */
      .swagger-ui .opblock.opblock-post { background: #f0fdf4; border-color: #bbf7d0; }
      .swagger-ui .opblock.opblock-post .opblock-summary-method { background: #22c55e; }
      
      .swagger-ui .opblock.opblock-get { background: #eff6ff; border-color: #bfdbfe; }
      .swagger-ui .opblock.opblock-get .opblock-summary-method { background: #3b82f6; }
      
      .swagger-ui .opblock.opblock-put { background: #fffbeb; border-color: #fde68a; }
      .swagger-ui .opblock.opblock-put .opblock-summary-method { background: #f59e0b; }
      
      .swagger-ui .opblock.opblock-patch { background: #fdf4ff; border-color: #fbcfe8; }
      .swagger-ui .opblock.opblock-patch .opblock-summary-method { background: #d946ef; }
      
      .swagger-ui .opblock.opblock-delete { background: #fef2f2; border-color: #fecaca; }
      .swagger-ui .opblock.opblock-delete .opblock-summary-method { background: #ef4444; }
      
      .swagger-ui .opblock .opblock-summary-method { border-radius: 6px; font-weight: 600; padding: 6px 12px; }
      .swagger-ui .opblock .opblock-summary-path { font-weight: 500; color: #374151; font-family: 'Inter', monospace; }
      .swagger-ui .opblock .opblock-summary-description { color: #6b7280; }
      
      .swagger-ui .btn { border-radius: 6px; font-weight: 500; padding: 8px 16px; border: 1px solid #d1d5db; background: #ffffff; color: #374151; transition: all 0.2s; }
      .swagger-ui .btn:hover { background: #f3f4f6; }
      .swagger-ui .btn.execute { background: #3b82f6; color: white; border-color: #3b82f6; }
      .swagger-ui .btn.execute:hover { background: #2563eb; }
      
      .swagger-ui section.models { border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; background: #ffffff; }
      .swagger-ui section.models h4 { border-bottom: 1px solid #e5e7eb; padding: 1rem; color: #111827; font-weight: 600; }
      .swagger-ui .model-title { color: #374151; }
      .swagger-ui .model-box { background: #f9fafb; border-radius: 8px; }
    `,
        customSiteTitle: 'Booking API Docs',
    });
    const servicesService = app.get(services_service_1.ServicesService);
    const existingServices = await servicesService.findAll();
    if (existingServices.length === 0) {
        console.log('Seeding initial trending events...');
        await servicesService.create({
            title: 'Neon Nights Music Festival',
            description: 'Experience a mind-blowing electronic music festival featuring world-class DJs, immersive light shows, and an unforgettable atmosphere.',
            duration: 360,
            price: 150,
            isActive: true,
        });
        await servicesService.create({
            title: 'Tech Innovation Summit 2026',
            description: 'Join industry leaders and visionaries for a full day of keynotes, networking, and hands-on workshops covering AI, Web3, and the future of tech.',
            duration: 480,
            price: 299,
            isActive: true,
        });
        await servicesService.create({
            title: 'Global Food & Wine Expo',
            description: 'Taste your way around the world with exclusive culinary experiences, masterclasses from Michelin-starred chefs, and premium wine tasting.',
            duration: 240,
            price: 85,
            isActive: true,
        });
        console.log('Seeding complete!');
    }
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map