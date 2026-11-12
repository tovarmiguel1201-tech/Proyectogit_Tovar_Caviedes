
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';

import { FacturasService } from './facturas.service';

@Controller('facturas')
export class FacturasController {
  constructor(
    private readonly facturasService: FacturasService,
  ) {}

  // REGISTRAR FACTURA
  @Post()
  crear(
    @Body()
    datos: {
      clienteId: number;
      detalles: {
        servicioId: number;
        cantidad: number;
      }[];
    },
  ) {
    return this.facturasService.crear(datos);
  }

  // CONSULTAR TODAS LAS FACTURAS
  @Get()
  obtenerTodas() {
    return this.facturasService.obtenerTodas();
  }

  // CONSULTAR UNA FACTURA
  @Get(':id')
  obtenerUna(@Param('id', ParseIntPipe) id: number) {
    return this.facturasService.obtenerUna(id);
  }

  // ACTUALIZAR ESTADO DE FACTURA
  @Patch(':id/estado')
  actualizarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: { estado: string },
  ) {
    return this.facturasService.actualizarEstado(
      id,
      datos.estado,
    );
  }

  // ELIMINAR FACTURA
  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.facturasService.eliminar(id);
  }
}
