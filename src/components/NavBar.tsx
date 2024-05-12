import Link from "next/link";

export const NavBar = () => {
  return (
    <header>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link href="/">
                <strong>Simplescan</strong>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
