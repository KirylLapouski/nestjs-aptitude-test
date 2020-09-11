import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryColumn()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
