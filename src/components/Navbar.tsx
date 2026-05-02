import Image from "next/image";
import { getSession } from "@/lib/auth";
import Link from "next/link";

const Navbar = async () => {
  const session = await getSession();

  return (
    <div className="flex items-center justify-between p-4 bg-primary text-neutral shadow-md">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-sm rounded-full ring-2 ring-secondary px-3 py-1 hover:ring-accent transition-all">
        <Image src="/search.png" alt="Search Icon" width={16} height={16} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none text-neutral"
        />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6">
        <div className="bg-neutral rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-accent hover:text-white transition-all">
          <Image src="/message.png" alt="Messages" width={20} height={20} />
        </div>
        <div className="bg-neutral rounded-full w-8 h-8 flex items-center justify-center cursor-pointer relative hover:bg-accent hover:text-white transition-all">
          <Image
            src="/announcement.png"
            alt="Announcements"
            width={20}
            height={20}
          />
          <div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-error text-white rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-neutral">
            {session?.username}
          </span>
          <span className="text-xs text-secondary">{session?.role}</span>
          <Link
            href="/api/auth/logout"
            className="text-xs text-error hover:text-red-700 transition-all"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
