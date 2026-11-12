import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Usuario } from '../../usuarios/entities/usuario.entity';
import { DetalleFactura } from './detalle-factura.entity';

@Entity('facturas')
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  total: number;

  @Column({ default: 'pendiente' })
  estado: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @ManyToOne(() => Usuario)
  cliente: Usuario;

  @OneToMany(() => DetalleFactura, detalle => detalle.factura, {
    cascade: true,
  })
  detalles: DetalleFactura[];
}