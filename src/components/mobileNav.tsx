import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

const mobileItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' }
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* This button will trigger open the mobile sheet menu */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <div className="flex flex-col items-start mt-8">
          {mobileItems.map((item, index) => (
            <Button
              key={index}
              variant="link"
              onClick={() => {
                navigate(item.path)
                setOpen(false);
              }}
            >
              {item.name}
            </Button>
          ))}
          <Button onClick={() => window.open("https://docs.google.com/document/d/1256y-Cy_sXboqbvpiMf-pVD8hbM3a-DEOMTaLAcopoM/edit?usp=sharing", "_blank")}>
            Resume
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
