import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">האתר של האמן</h1>
      <div className="space-x-4 space-x-reverse">
        <Link to="/">דף הבית</Link>
        <Link to="/videos">סרטונים</Link>
        <Link to="/admin">ניהול</Link>
      </div>
    </nav>
  );
}
