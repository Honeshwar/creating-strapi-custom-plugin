// import { StrapiAdminPlugin } from '@strapi/types';
import PluginIcon from './icons/PluginIcon';
const myPlugin: any = {
  register(app: any) {
    app.addMenuLink({
      to: '/plugins/my-plugin',
      icon: PluginIcon, // 'PluginIcon' Replace with the desired icon
      intlLabel: {
        id: 'my-plugin.label',
        defaultMessage: 'My Plugin',
      },
      Component: async () => import('./pages/App'), // Path to your custom React component
      permissions: [], // Add permissions if required
    });
  },
};

export default myPlugin;
