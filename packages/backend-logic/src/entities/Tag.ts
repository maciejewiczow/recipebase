import { makeAutoObservable } from 'mobx';
import {
    ManyToMany,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
} from 'typeorm';
import Recipe from './Recipe';

@Entity('Tag')
export default class Tag {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', unique: true })
    name!: string;

    @ManyToMany(() => Recipe, r => r.tags)
    recipes?: Recipe[];

    @DeleteDateColumn({ nullable: true })
    deletedAt!: Date | null;

    constructor() {
        makeAutoObservable(this);
    }
}
