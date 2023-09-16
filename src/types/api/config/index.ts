export type ConfigResponse = {
  language: ConfigItem[];
  tone: ConfigItem[];
  style: ConfigItem[];
  detail: ConfigItem[];
};

export type ConfigItem = {
  en: string;
  vi: string;
};

export type ConfigInitialState = {
  pending?: boolean;
  error?: boolean;
  responseConfig?: ConfigResponse;
};
