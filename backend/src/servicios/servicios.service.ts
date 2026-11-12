
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './entities/servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private serviciosRepository: Repository<Servicio>,
  ) {}

  async crear(datos: Partial<Servicio>) {
    const servicio = this.serviciosRepository.create(datos);
    return await this.serviciosRepository.save(servicio);
  }

  async obtenerTodos() {
    return await this.serviciosRepository.find();
  }
}
