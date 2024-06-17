import clsx from "clsx";

export type RangeProps = {
  label?: string;
  min?: number;
  max?: number;
  range: [number | undefined | null, number | undefined | null];
  value?: number;
  unit?: string | null;
  className?: string;
};

export function Range({
  label,
  min: _min,
  max: _max,
  range,
  value,
  unit,
  className,
}: RangeProps) {
  const margin = (_max! - _min!) / 5;
  const mn = Math.min(_min!, value ?? margin - margin);

  const min = mn < 0 ? 0 : mn;
  const max = Math.max(_max!, value ?? margin * 4 + margin);
  const v0 = range?.[0] ?? min;
  const v1 = range?.[1] ?? max;
  //const diff = v1 - v0;
  const length = max - min;
  const left = 100 * ((v0 - min) / length);
  //const left = Math.max((100 * ((v0 - (range?.[0] ?? 0)) / 1)) / length, 0);
  const valLeft = (100 * (value! - min)) / length;
  const width = (100 * ((v1 - v0) / 1)) / length;
  return (
    <div className={clsx("mb-8 flex", className)}>
      <h4 className="uppercase text-lg underline ">{label}</h4>
      <div className="block relative w-full h-5 bg-paper m-1 box-border">
        <div className="box-border absolute top-1/2 left-0 right-0 h-[1px] w-full bg-black before:h-4 before:w-[1px] before:top-0 before:left-3 before:bg-black before:absolute after:h-4 after:w-[1px] after:bg-black after:absolute after:top-0 after:right-3"></div>
        <div className="w-[100%] h-5 block m-auto relative">
          <span className="block absolute top-full left-[14px] text-center -translate-x-1/2">
            {min.toFixed(0)}
          </span>
          <span className="block absolute left-auto top-full right-[15px] text-center translate-x-1/2">
            {max.toFixed(0)}
          </span>
          <div
            style={{
              display: value !== undefined ? "block" : "none",
              width: 1,
              zIndex: 1,
              left: `${valLeft}%`,
            }}
            className="absolute top-0 bottom-0 block h-full bg-purple-300 border-l-2 border-black border-r-2"
          >
            <div className="absolute flex w-full my-2 h-full">
              <div className="absolute block top-full left-0 w-full ">
                <span className="absolute -left-1 text-sm">
                  {value?.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div
            style={{ width: `${width}%`, left: `${left}%` }}
            className="absolute top-0 bottom-0 block h-full bg-purple-300 border-l-2 border-black border-r-2"
          >
            <div className="absolute flex w-full my-2 h-full">
              <div className="absolute block top-full left-0 w-full ">
                <span className="absolute -left-1 text-sm">{range?.[0]}</span>
                <span className="absolute -right-1 text-sm">{range?.[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 className=" text-lg ">{unit}</h4>
    </div>
  );
}
