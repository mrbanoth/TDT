// Validate required environment variables at startup
const requiredEnvVars = [
  'VITE_CONTENTFUL_SPACE_ID',
  'VITE_CONTENTFUL_ACCESS_TOKEN',
  'VITE_TAWKTO_PROPERTY_ID',
  'VITE_TAWKTO_WIDGET_ID'
];

// Check for missing environment variables
const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  console.error('Please check your .env file and restart the server.');
  throw new Error('Missing required environment variables');
}

// Export validated environment variables
export const env = {
  // Contentful
  contentful: {
    spaceId: import.meta.env.VITE_CONTENTFUL_SPACE_ID as string,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN as string,
    environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master' as string,
  },
  
  // Tawk.to
  tawkto: {
    propertyId: import.meta.env.VITE_TAWKTO_PROPERTY_ID as string,
    widgetId: import.meta.env.VITE_TAWKTO_WIDGET_ID as string,
  },
  
  // App
  nodeEnv: import.meta.env.MODE as 'development' | 'production',
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
} as const;

// Type safety for environment variables
type EnvVars = {
  VITE_CONTENTFUL_SPACE_ID: string;
  VITE_CONTENTFUL_ACCESS_TOKEN: string;
  VITE_CONTENTFUL_ENVIRONMENT?: string;
  VITE_TAWKTO_PROPERTY_ID: string;
  VITE_TAWKTO_WIDGET_ID: string;
  MODE: 'development' | 'production';
  PROD: boolean;
  DEV: boolean;
};

declare global {
  interface ImportMeta {
    readonly env: EnvVars & Record<string, string | boolean | undefined>;
  }
}
