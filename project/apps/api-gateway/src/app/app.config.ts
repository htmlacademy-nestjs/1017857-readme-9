import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 4000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export enum HttpClient {
  MaxRedirects = 5,
  Timeout = 3000,
}

export enum ApplicationServiceURL {
  Users = 'http://localhost:3000/api/auth',
  Blog = 'http://localhost:3001/api/posts',
  Comments = 'http://localhost:3001/api/comments',
  Likes = 'http://localhost:3001/api/likes',
  Files = 'http://localhost:3002/api/files',
  Notify = 'http://localhost:3003/api/digest',
}

type Environment = (typeof ENVIRONMENTS)[number];

export interface ApplicationConfig {
  environment: string;
  port: number;
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT),
});

function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
