import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Building } from './building.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'location_number' })
  locationNumber: string;

  @Column({ name: 'parent_id' })
  parentId: number;

  @Column()
  area: number;

  @ManyToOne(() => Building, (building) => building.locations)
  @JoinColumn({ name: 'building_id' })
  building: Building;
}
