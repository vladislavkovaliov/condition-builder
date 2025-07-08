
import { expect, test, describe } from 'vitest'

import {ConditionBuilder} from '..'

describe('Condition Builder', () => {
    test("should return 1 if the first condition is success", () => {
        const result = new ConditionBuilder<number>()
            .on(() => true, 1)
            .on(() => false, 2)
            .build(() => 3);

        expect(result).toEqual(1);
    });

    test("should return 2 if the second condition is success", () => {
        const result = new ConditionBuilder<number>()
            .on(() => false, 1)
            .on(() => true, 2)
            .build(() => 3);

        expect(result).toEqual(2);
    });

    test("should return 3 if all conditions are false and build() is defined", () => {
        const result = new ConditionBuilder<number>()
            .on(() => false, 1)
            .on(() => false, 2)
            .build(() => 3);

        expect(result).toEqual(3);
    });

    test("should return 3 if all conditions are false and build() is not defined", () => {
        const result = new ConditionBuilder<number>()
            .on(() => false, 1)
            .on(() => false, 2)
            .build();

        expect(result).toEqual(null);
    });

    test("should return 2 if the first condition is false and build() is not defined", () => {
        const result = new ConditionBuilder<number>()
            .on(() => false, 1)
            .on(() => true, 2)
            .build();

        expect(result).toEqual(2);
    });
});
