import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'categories',
        short_label: 'N',
        name: 'categories',
        type: 'link',
        icon: 'icon-layout-cta-right',
      },
      {
        state: 'products',
        short_label: 'N',
        name: 'products',
        type: 'link',
        icon: 'icon-layout-cta-right',
      },
      {
        state: 'users',
        short_label: 'N',
        name: 'users',
        type: 'link',
        icon: 'icon-layout-cta-right',
      },
      {
        state: 'inboxes',
        short_label: 'N',
        name: 'inboxes',
        type: 'link',
        icon: 'icon-layout-cta-right',
      },
    ],
  },
];

const MENUITEMSAPP = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'anybackup-app-conversations',
        short_label: 'N',
        name: 'Conversations',
        type: 'sub',
        icon: 'icon-layout-cta-right',
        children:[
          {
            state: 'inbox',
            name: 'Inbox',
          },
          {
            state: 'new-message',
            name: 'New Message',
          },
        ]
      },
    ]
  }
]

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  getAllMenuApp(): Menu[] {
    return MENUITEMSAPP;
  }
}
