export interface IMenuItem {
  name: string;
  link: string;
  type: string;
  assetUrl?: string;
}

export interface ISideMenu {
  menuItems: IMenuItem[];
  className: string;
}
