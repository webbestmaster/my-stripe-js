import type {ReactNode} from "react";

export type DeepReadonlyType<DataType> = Readonly<{
    [K in keyof DataType]: DataType[K] extends number | string | symbol // Is it a primitive? Then make it readonly
        ? Readonly<DataType[K]>
        : // Is it an array of items? Then make the array readonly and the item as well
          DataType[K] extends Array<infer A>
          ? Readonly<Array<DeepReadonlyType<A>>>
          : // It is some other object, make it readonly as well
            DeepReadonlyType<DataType[K]>;
}>;

export type ReadonlyReactChildrenType = Readonly<{children: ReactNode}>;
export type ReadonlyPromiseType<DataType> = Readonly<Promise<DataType>>;
