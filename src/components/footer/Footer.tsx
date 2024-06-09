import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', position: 'fixed', bottom: 0, width: '100%' }}>
  <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
    <Link href="/" className="flex items-center cursor-pointer">
      <Image
        src="https://cdn-icons-png.flaticon.com/512/15216/15216856.png"
        alt="Mhux heek"
        width={60}
        height={60}
      />
    </Link>
    <p>© 2024 Mi Compañía. Todos los derechos reservados.</p>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li style={{ display: 'inline', marginRight: '10px' }}><a href="#">Inicio</a></li>
      <li style={{ display: 'inline', marginRight: '10px' }}><a href="#">Acerca de</a></li>
      <li style={{ display: 'inline', marginRight: '10px' }}><a href="#">Servicios</a></li>
      <li style={{ display: 'inline', marginRight: '10px' }}><a href="#">Contacto</a></li>
    </ul>
  </div>
</footer>

  );
}

export default Footer;
