import { flow, makeAutoObservable } from 'mobx';
import { ILike } from 'typeorm';
import Database from '../Database';
import Unit from '../entities/Unit';
import { yieldResult } from '../utils/yieldResult';

export class Units {
    isFetchingUnits = false;
    units: Unit[] = [];

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    fetchUnits = flow(function* (this: Units, searchText: string) {
        const term = searchText.trim();

        this.isFetchingUnits = true;

        const units = yield* yieldResult(() => this.database.unitRepository.find(
                term
                    ? {
                          where: {
                              name: ILike(`%${term}%`),
                          },
                      }
                    : {},
            ),
        )();

        this.units = units;

        this.isFetchingUnits = false;
    });
}
