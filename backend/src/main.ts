import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend communication
  app.enableCors({
    origin: [process.env.FRONTEND_URL], // Frontend URLs
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  });
  
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.BACKEND_PORT ?? 3000);
}
bootstrap();
