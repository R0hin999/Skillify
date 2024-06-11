import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image height={150} width={150} alt="logo" src="/logo.png" />
    </Link>
  );
};

export default Logo;
