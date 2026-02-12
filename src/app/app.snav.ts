import { CtmSnavItems } from '@kato-lee/admin-layout';

export const SIDE_NAV: CtmSnavItems[] = [
  {
    type: 'link',
    name: 'Home',
    icon: 'assets/images/sidebar-icons/home.png',
    iconType: 'img',
    url: 'home',
  },
  {
    type: 'collection',
    name: 'Seguridad',
    url: 'seg',
    iconType: 'img',
    objects: [
      {
        type: 'dropdown',
        name: 'Permisos',
        url: 'permisos',
        icon: 'assets/images/sidebar-icons/lock.png',
        iconType: 'img',
        dropdownLinks: [
          {
            name: 'Crear modulos, submodulos y permisos',
            url: 'create',
          },
          {
            name: 'Gestionar permisos por usuario',
            url: 'manage-by-usuario',
          },
          {
            name: 'Gestionar permisos por rol',
            url: 'manage-by-rol',
          },
        ],
      },
    ],
  },
];
