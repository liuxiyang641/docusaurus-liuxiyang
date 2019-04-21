/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'liuxiyang',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: '/webstatic/img/lxy-img.jpg',
    infoLink: 'https://github.com/liuxiyang641',
    pinned: true,
  },
];

const siteConfig = {
  title: "Lxy's blog for learning", // Title for your website.
  tagline: 'A website for docs',
  url: 'https://github.com/liuxiyang641', // Your website URL
  baseUrl: '/docusaurus-liuxiyang/', // Base URL for your project */
  repoUrl: 'https://github.com/liuxiyang641/docusaurus-liuxiyang/',
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'docusaurus-liuxiyang',
  organizationName: 'liuxiyang641',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  blogSidebarTitle: { default: 'Recent posts1', all: 'All blog posts' },
  blogSidebarCount: 'ALL',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'html-css/web-basic-intro', label: 'HTML&CSS' },
    { doc: 'react/react-hoc', label: 'React' },
    { blog: true, label: 'Blog' },
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: '',
  footerIcon: '',
  favicon: '',

  /* Colors for website */
  colors: {
    primaryColor: 'rgb(59,61,62,1)',
    secondaryColor: 'rgb(81,86,88,1)',
  },

  /* Custom fonts for website */

  // fonts: {
  //   myFont: [
  //     "Times New Roman",
  //     "Sim Hei"
  //   ],
  // },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} liu xiyang`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'darcula',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  docsSideNavCollapsible: true,
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/',
  twitterImage: '',

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,
  enableUpdateBy: true,
  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
  usePrism: ['jsx'],
};

module.exports = siteConfig;
