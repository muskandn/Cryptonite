// src/components/Header.js
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./searchbar";
const Header = () => {
  return (
    <header className="bg-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link href={"/"}>
          <Image src="/com.png" alt="Logo Left" width={40} height={40} />
        </Link>
      </div>
      <div className="w-1/3 mx-4">
        <SearchBar/>
      </div>
      <div className="flex items-center">
        <Image src="/image.png" alt="Logo Right" width={40} height={40} />
      </div>
    </header>
  );
};

export default Header;
