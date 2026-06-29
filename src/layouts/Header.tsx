import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2">
          <Wrench className="h-6 w-6" />
          <span className="text-xl font-semibold">Toolbox</span>
        </Link>
      </div>
    </header>
  );
}
