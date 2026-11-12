
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum RolUsuario {
  ADMIN = 'admin',
  CLIENTE = 'cliente',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true, length: 150 })
  correo: string;

  @Column({ select: false })
  password: string;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.CLIENTE,
  })
  rol: RolUsuario;

  @CreateDateColumn()
  fechaCreacion: Date;
}
