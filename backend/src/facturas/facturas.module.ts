import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Factura } from './entities/factura.entity';
import { DetalleFactura } from './entities/detalle-factura.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Servicio } from '../servicios/entities/servicio.entity';

import { FacturasController } from './facturas.controller';
import { FacturasService } from './facturas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Factura,
      DetalleFactura,
      Usuario,
      Servicio,
    ]),
  ],
  controllers: [FacturasController],
  providers: [FacturasService],
})
export class FacturasModule {}
