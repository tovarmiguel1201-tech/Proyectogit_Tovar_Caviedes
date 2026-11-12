
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { Usuario, RolUsuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    private readonly jwtService: JwtService,
  ) {}

  // Registrar un usuario
  async crear(datos: {
    nombre: string;
    correo: string;
    password: string;
    telefono?: string;
  }) {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { correo: datos.correo },
    });

    if (usuarioExistente) {
      throw new ConflictException('Este correo ya está registrado');
    }

    const passwordHash = await bcrypt.hash(datos.password, 10);

    const nuevoUsuario = this.usuarioRepository.create({
      nombre: datos.nombre,
      correo: datos.correo,
      password: passwordHash,
      telefono: datos.telefono,
      rol: RolUsuario.CLIENTE,
    });

    const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);

    const { password, ...usuarioSeguro } = usuarioGuardado;

    return usuarioSeguro;
  }

  // Consultar todos los usuarios
  async obtenerTodos() {
    return this.usuarioRepository.find({
      select: {
        id: true,
        nombre: true,
        correo: true,
        telefono: true,
        rol: true,
        fechaCreacion: true,
      },
    });
  }

  // Iniciar sesión
  async iniciarSesion(correo: string, password: string) {
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .addSelect('usuario.password')
      .where('usuario.correo = :correo', { correo })
      .getOne();

    if (!usuario) {
      throw new UnauthorizedException(
        'Correo o contraseña incorrectos',
      );
    }

    const passwordValida = await bcrypt.compare(
      password,
      usuario.password,
    );

    if (!passwordValida) {
      throw new UnauthorizedException(
        'Correo o contraseña incorrectos',
      );
    }

    const payload = {
      sub: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol,
    };

    const token = await this.jwtService.signAsync(payload);

    const { password: passwordOculta, ...usuarioSeguro } = usuario;

    return {
      mensaje: 'Inicio de sesión exitoso',
      access_token: token,
      usuario: usuarioSeguro,
    };
  }
}
