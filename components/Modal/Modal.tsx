//"use client";
import clsx from "clsx";
import { IconButton } from "../Button";
import { useClickAway } from "@/hooks/useClickAway";
import { CloseIcon } from "../Icon/CloseIcon";

export type ModalProps = {
  hidden?: boolean;
  title?: string;
  //menu?: React.ReactNode;
  //returnUrl: string;
  close: () => void;
  children?: any;
};
export const Modal = ({ hidden, close, title, children }: ModalProps) => {
  //const handleClose = () => router.back();
  //"bg-slate-400/50 top-0 bottom-0 right-0 left-0 z-50  h-[calc(100%-1rem)] w-[calc(100%-1rem)] max-h-full",
  const className = clsx(
    "inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-40",
    {
      hidden: hidden,
      fixed: !hidden,
    }
  );
  const ref = useClickAway(() => {
    if (close) close();
  });

  return (
    <div className={className}>
      <div className=" relative mx-auto max-w-2xl border-slate-200 rounded bg-white mt-3">
        <div ref={ref} className="relative">
          <div className="relative p-0 z-50">
            <div className="w-full bg-primary-500 flex ">
              <div className="flex-grow m-1 py-2 px-4 text-lg font-bold">
                {title}
              </div>
              <div className="flex-shrink-0">
                <IconButton Icon={CloseIcon} onClick={close}>
                  Close
                </IconButton>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
