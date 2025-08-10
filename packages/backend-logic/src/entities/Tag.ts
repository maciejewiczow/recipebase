import { makeAutoObservable } from 'mobx';
import { Column, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './Recipe';

@Entity('Tag')
export class Tag {
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

    static createWithName(name: string) {
        const tag = new Tag();

        tag.id = Math.random();
        tag.name = name;
        tag.deletedAt = null;

        return tag;
    }
}
