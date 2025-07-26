import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-primary text-black shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Saylani Beneficiary</Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/beneficiary/register" className="hover:underline">Register</Link>
          <Link to="/scan-token" className="hover:underline">Scan Token</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/login" className="bg-white text-primary px-3 py-1 rounded hover:bg-gray-100">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
