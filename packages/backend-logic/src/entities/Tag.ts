import { ManyToMany } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/browser';
import Recipe from './Recipe';

@Entity('Tag')
export default class Tag {
    @PrimaryGeneratedColumn()
        id!: number;

    @Column({ type: 'varchar' })
        name!: string;

    @ManyToMany(() => Recipe, r => r.tags)
        recipes?: Recipe[];
}
