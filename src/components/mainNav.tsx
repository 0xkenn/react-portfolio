import { Button } from './ui/button';
import { useNavigate } from 'react-router'; // assuming you're using `react-router-dom`

const mainNavItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' }
];

export default function MainNav() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 py-2 w-full">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">0xkenn</span> 
      </div>

      <div className="hidden md:flex gap-5">
        {mainNavItems.map((item, index) => (
          <Button
            key={index}
            variant="link"
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </Button>
        ))}
          <Button onClick={() => window.open("https://docs.google.com/document/d/1256y-Cy_sXboqbvpiMf-pVD8hbM3a-DEOMTaLAcopoM/edit?usp=sharing", "_blank")}>
            Resume
          </Button>
      </div>
    </div>
  );
}
