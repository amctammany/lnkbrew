import clsx from "clsx";
import { ClickAwayRouter } from "../ClickAwayRouter";
import { IconButtonLink } from "../Button";
import { CloseIcon } from "../Icon/CloseIcon";

export type RoutedModalProps = {
  hidden?: boolean;
  title?: string;
  returnUrl: string;
  children?: any;
  callback?: () => void;
};
export const RoutedModal = ({
  hidden,
  title,
  callback,
  returnUrl,
  children,
}: RoutedModalProps) => {
  //const handleClose = () => router.back();
  const cn = clsx(
    "inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-40",
    {
      hidden: hidden,
      fixed: !hidden,
      RoutedModal,
    }
  );
  return (
    <div className={cn}>
      <div className="relative mx-auto max-w-6xl border-slate-200 rounded bg-white mt-3">
        <ClickAwayRouter url={returnUrl} callback={callback}>
          <div className="relative p-0 z-50">{children}</div>
        </ClickAwayRouter>
      </div>
    </div>
  );
  /**
   *         <div className="w-full bg-primary-500 flex ">
              <div className="flex-grow m-1 py-2 px-4 text-lg font-bold">
                {title}
              </div>
              <div className="flex-shrink-0">
                <IconButtonLink
                  Icon={CloseIcon}
                  scroll={false}
                  href={returnUrl}
                >
                  Close
                </IconButtonLink>
              </div>
            </div>
*/
  /**  const className = clsx(
    "bg-slate-800/75 top-0 bottom-0 right-0 left-0 z-50  h-[calc(100%-1rem)] w-[calc(100%-0rem)] max-h-full pt-5",
    {
      hidden: hidden,
      fixed: !hidden,
    }
  );

  return (
    <div className={className}>
      <div className="relative mx-auto max-w-2xl border-slate-200 rounded bg-white ">
        <ClickAwayRouter url={returnUrl}>
          <div className="relative p-5">
            <div>
              <ButtonLink scroll={false} href={returnUrl}>
                Close
              </ButtonLink>
            </div>
            {children}
          </div>
        </ClickAwayRouter>
      </div>
    </div>
  );
    */
};
