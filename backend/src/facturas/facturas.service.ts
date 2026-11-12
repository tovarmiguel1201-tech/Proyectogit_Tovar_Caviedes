
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Factura } from './entities/factura.entity';
import { DetalleFactura } from './entities/detalle-factura.entity';
import { Usuario, RolUsuario } from '../usuarios/entities/usuario.entity';
import { Servicio } from '../servicios/entities/servicio.entity';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura)
    private facturaRepository: Repository<Factura>,

    @InjectRepository(DetalleFactura)
    private detalleRepository: Repository<DetalleFactura>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
  ) {}

  // CREAR FACTURA
  async crear(datos: {
    clienteId: number;
    detalles: { servicioId: number; cantidad: number }[];
  }) {
    const cliente = await this.usuarioRepository.findOne({
      where: { id: datos.clienteId, rol: RolUsuario.CLIENTE },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    if (!datos.detalles || datos.detalles.length === 0) {
      throw new BadRequestException('Debe agregar al menos un servicio');
    }

    const detallesFactura: DetalleFactura[] = [];
    let total = 0;

    for (const item of datos.detalles) {
      if (!Number.isInteger(item.cantidad) || item.cantidad <= 0) {
        throw new BadRequestException(
          'La cantidad debe ser un entero mayor que cero',
        );
      }

      const servicio = await this.servicioRepository.findOne({
        where: { id: item.servicioId },
      });

      if (!servicio) {
        throw new NotFoundException(
          `No existe el servicio con ID ${item.servicioId}`,
        );
      }

      const precio = Number(servicio.precio);
      const subtotal = precio * item.cantidad;

      total += subtotal;

      const detalle = this.detalleRepository.create({
        cantidad: item.cantidad,
        precioUnitario: precio,
        subtotal,
        servicio,
      });

      detallesFactura.push(detalle);
    }

    const factura = this.facturaRepository.create({
      cliente,
      total,
      estado: 'pendiente',
      detalles: detallesFactura,
    });

    return this.facturaRepository.save(factura);
  }

  // CONSULTAR TODAS LAS FACTURAS
  async obtenerTodas() {
    return this.facturaRepository.find({
      relations: {
        cliente: true,
        detalles: {
          servicio: true,
        },
      },
      order: { fechaCreacion: 'DESC' },
    });
  }

  // CONSULTAR UNA FACTURA
  async obtenerUna(id: number) {
    const factura = await this.facturaRepository.findOne({
      where: { id },
      relations: {
        cliente: true,
        detalles: {
          servicio: true,
        },
      },
    });

    if (!factura) {
      throw new NotFoundException('Factura no encontrada');
    }

    return factura;
  }

  // ACTUALIZAR ESTADO DE LA FACTURA
  async actualizarEstado(id: number, estado: string) {
    const factura = await this.facturaRepository.findOne({
      where: { id },
    });

    if (!factura) {
      throw new NotFoundException('Factura no encontrada');
    }

    if (!['pendiente', 'pagada'].includes(estado)) {
      throw new BadRequestException('Estado no válido');
    }

    factura.estado = estado;

    return this.facturaRepository.save(factura);
  }

  // ELIMINAR FACTURA
  async eliminar(id: number) {
    const factura = await this.facturaRepository.findOne({
      where: { id },
    });

    if (!factura) {
      throw new NotFoundException('Factura no encontrada');
    }

    await this.facturaRepository.remove(factura);

    return {
      mensaje: 'Factura eliminada correctamente',
      id: id,
    };
  }
}
