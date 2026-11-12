import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Factura } from './factura.entity';
import { Servicio } from '../../servicios/entities/servicio.entity';

@Entity('detalles_factura')
export class DetalleFactura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', default: 1 })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Factura, { onDelete: 'CASCADE' })
  factura: Factura;

  @ManyToOne(() => Servicio)
  servicio: Servicio;
}