
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';

import { UsuariosService } from './usuarios.service';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { RolUsuario } from './entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Registrar usuario (público)
  @Post()
  crear(
    @Body()
    datos: {
      nombre: string;
      correo: string;
      password: string;
      telefono?: string;
    },
  ) {
    return this.usuariosService.crear(datos);
  }

  // Consultar usuarios (solo administrador)
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN)
  obtenerTodos() {
    return this.usuariosService.obtenerTodos();
  }

  // Iniciar sesión (público)
  @Post('login')
  iniciarSesion(
    @Body()
    datos: {
      correo: string;
      password: string;
    },
  ) {
    return this.usuariosService.iniciarSesion(
      datos.correo,
      datos.password,
    );
  }
}
