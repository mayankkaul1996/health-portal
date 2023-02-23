interface DatabaseConfig {
	host: string;
	user: string;
	password: string;
	port: number;
	name: string;
	schema: string;
};
interface GCPConfig {
	project_id: string;
	storage: {
		locker_document_bucket: string;
	}
};
interface Security {
	allowed_origins: string;
	cookie_domain: string;
	domain_checking: string;
};

interface AppConfig {
	port: number;
	database: DatabaseConfig;
	gcpConfig: GCPConfig;
	jwt_secret: string;
	security: Security;
};

export default (): AppConfig => {
	const {
		env: {
			PORT,
			DB_HOST,
			DB_USER,
			DB_PORT,
			DB_PASSWORD,
			DB_DATABASE,
			DB_SCHEMA,
			GCP_PROJECT_ID,
			JWT_SECRET,
			ALLOWED_ORIGINS,
			DOMAIN_CHECKING,
			COOKIE_DOMAIN,
			LOCKER_DOCUMENT_BUCKET
		}
	} = process;
	return {
		port: +PORT,
		database: {
			host: DB_HOST,
			user: DB_USER,
			password: DB_PASSWORD,
			port: +DB_PORT,
			name: DB_DATABASE,
			schema: DB_SCHEMA
		},
		gcpConfig: {
			project_id: GCP_PROJECT_ID,
			storage: {
				locker_document_bucket: LOCKER_DOCUMENT_BUCKET
			}
		},
		jwt_secret: JWT_SECRET,
		security: {
			allowed_origins: ALLOWED_ORIGINS,
			cookie_domain: COOKIE_DOMAIN,
			domain_checking: DOMAIN_CHECKING
		},
	};
};
