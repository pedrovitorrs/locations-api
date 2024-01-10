import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const port = process.env.PORT;
  const origin = "http://localhost:3002";

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Locations - API")
    .setDescription("Documentação de API para o projeto Locations API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [origin],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  });
  Logger.log(`Starting on port ${port}`);
  await app.listen(port);
}

bootstrap();
