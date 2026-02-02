import { CtmSnavItems } from '@kato-lee/admin-layout';

export const SIDE_NAV: CtmSnavItems[] = [
  {
    type: 'link',
    name: 'Home',
    icon: 'dashboard',
    url: 'home',
    showForMobile: true,
    showForWeb: true,
  },
  {
    type: 'collection',
    name: 'Seguridad',
    url: 'seg',
    icon: 'general_device',
    showForMobile: true,
    showForWeb: true,
    objects: [
      {
        type: 'dropdown',
        name: 'Permisos',
        url: 'permisos',
        icon: 'lock',
        showForMobile: true,
        showForWeb: true,
        dropdownLinks: [
          {
            name: 'Crear modulos, submodulos y permisos',
            url: 'create',
            showForMobile: true,
            showForWeb: true,
          },
          {
            name: 'Gestionar permisos por usuario',
            url: 'manage-by-usuario',
            showForMobile: true,
            showForWeb: true,
          },
          {
            name: 'Gestionar permisos por rol',
            url: 'manage-by-rol',
            showForMobile: true,
            showForWeb: true,
          },
        ],
      },
    ],
  },
];
