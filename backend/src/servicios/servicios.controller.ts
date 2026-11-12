
import { Controller, Post, Get, Body } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { Servicio } from './entities/servicio.entity';

@Controller('servicios')
export class ServiciosController {
  constructor(
    private readonly serviciosService: ServiciosService,
  ) {}

  @Post()
  crear(@Body() datos: Partial<Servicio>) {
    return this.serviciosService.crear(datos);
  }

  @Get()
  obtenerTodos() {
    return this.serviciosService.obtenerTodos();
  }
}
