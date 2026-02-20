interface CorsConfig {
  origin: string | string[];
  methods?: string[];
  credentials?: boolean;
}

export const devCorsConfig: CorsConfig = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true,
};

export const prodCorsConfig: CorsConfig = {
  origin: 'https://meudominio.com',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
};

export function getCorsConfig(): CorsConfig {
  return process.env.NODE_ENV === 'production'
    ? prodCorsConfig
    : devCorsConfig;
}
