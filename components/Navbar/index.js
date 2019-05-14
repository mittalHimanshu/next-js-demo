import Link from "next/link";

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <Link href="/">
          <a title="home">Home </a>
        </Link>
        <Link href="/about1">
          <a title="about next-js">About Us</a>
        </Link>
      </nav>
    );
  }
}

export default Navbar;
