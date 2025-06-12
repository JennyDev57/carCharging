const basicInfo = {
  openapi: "3.0.3", // present supported openapi version
  info: {
    title: "Simple API", // short title.
    description: "A simple API", //  desc.
    version: "1.0.0", // version number
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: "Jennifer Durthaler", // your name
      email: "jennifer.durthaler@gmail.com", // your email
      url: "", // your website
    },
  },
  servers: [
    {
      url: 'http://localhost:5000/',
      description: 'Development server',
    },
  ],

};

export default basicInfo;
