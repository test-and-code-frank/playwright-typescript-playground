import fs from 'fs';
import yaml from 'js-yaml';

interface EnvSettings {
  username: string;
  password: string;
  webdriverVisible: boolean;
}

interface EnvConfig {
  settings: {
    env: EnvSettings;
  };
}

export function loadYamlEnv(): EnvSettings {
  const file = fs.readFileSync('./config/local.yaml', 'utf8'); // Make sure this path is correct
  const config = yaml.load(file) as EnvConfig;
  return config.settings.env;
}
