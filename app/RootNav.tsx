import Link from "next/link";

export type RootNavProps = {
  children: React.ReactNode;
};

const AuthenticationNav = () => {
  return <div>AuthNav</div>;
};

export const RootNav = ({ children }: RootNavProps) => {
  return (
    <nav className="flex items-center md:justify-between flex-wrap md:flex-nowrap px-5 md:py-2 bg-slate-700">
      <div className="flex items-center flex-grow mr-6 lg:mr-16">
        <Link
          href="/"
          className="flex-none md:hidden text-slate-200 font-extrabold text-2xl py-2 px-4 mr-4"
        >
          LNK
        </Link>

        <Link
          href="/"
          className="flex-none hidden md:block text-slate-200 font-extrabold text-2xl py-2 px-4 mr-4"
        >
          LNK Brewing
        </Link>
      </div>
      <div className="md:hidden ">
        <AuthenticationNav />
      </div>

      <div className="hidden w-full flex-grow md:flex lg:items-center lg:w-auto">
        <div className="flex flex-grow items-center flex-row font-medium p-2 md:p-0  md:space-x-8">
          {children}
        </div>
        <AuthenticationNav />
      </div>
    </nav>
  );
};
