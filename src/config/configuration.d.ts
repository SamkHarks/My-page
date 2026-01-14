declare const configuration: {
  baseUrls: {
    firebase: string;
    dev: string;
    prod: string;
  };
  paths: {
    images: {
      me: string;
      skate: string;
    };
    cv: {
      en: string;
      fi: string;
    };
    data: {
      skills: string;
      sections: string;
    };
    email: {
      contact: string;
      health: string;
    };
  };
};

export default configuration;