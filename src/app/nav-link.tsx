'use client';

import { usePathname } from 'next/navigation';
import Link from './link';

export default function NavLink({ href, children }: React.PropsWithChildren<{ href: string }>) {
  const pathname = usePathname();
  return (
    <Link href={href} className={pathname === href ? 'focus-link' : 'no-focus-link'}>
      {children}
    </Link>
  );
}
