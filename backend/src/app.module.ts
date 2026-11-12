
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ServiciosModule } from './servicios/servicios.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { FacturasModule } from './facturas/facturas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<string>('DB_PORT', '5432')),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE', 'evah'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    ServiciosModule,
    UsuariosModule,
    FacturasModule,
  ],
})
export class AppModule {}
