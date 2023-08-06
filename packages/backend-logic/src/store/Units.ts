import { flow, makeAutoObservable } from 'mobx';
import Database from '../Database';
import { ILike } from 'typeorm';
import { yieldResult } from '../utils/yieldResult';
import Unit from '../entities/Unit';

export class Units {
    isFetchingUnits = false;
    units: Unit[] = [];

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    fetchUnits = flow(function* (this: Units, searchText: string) {
        const term = searchText.trim();

        this.isFetchingUnits = true;

        const units = yield* yieldResult(() => this.database.unitRepository?.find(
            term ? {
                where: {
                    name: ILike(`%${term}%`),
                },
            } : {}
        ))();

        if (units)
            this.units = units;

        this.isFetchingUnits = false;
    });
}
