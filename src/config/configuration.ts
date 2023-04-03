interface DatabaseConfig {
	postgresql: {
		host: string;
		user: string;
		password: string;
		port: number;
		name: string;
		schema: string;
	},
	mongo: {
		uri: string
		db: string
	}
	
};
interface GCPConfig {
	project_id: string;
	client_email: string;
};
interface Security {
	allowed_origins: string;
	cookie_domain: string;
	domain_checking: string;
};

interface FileManager {
	cloudProvider: string;
	storage: {
		locker_document_bucket: string;
	};
}

interface AppConfig {
	port: number;
	database: DatabaseConfig;
	gcpConfig: GCPConfig;
	jwt_secret: string;
	security: Security;
	fileManager: FileManager;
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
			LOCKER_DOCUMENT_BUCKET,
			GCP_CLIENT_EMAIL,
			MONGO_URI,
			MONGO_DB_NAME,
			GLOBAL_FILE_MANAGER_CLOUD_PROVER
		}
	} = process;
	return {
		port: +PORT,
		database: {
			postgresql: {
				host: DB_HOST,
				user: DB_USER,
				password: DB_PASSWORD,
				port: +DB_PORT,
				name: DB_DATABASE,
				schema: DB_SCHEMA
			},
			mongo: {
				uri: MONGO_URI,
				db: MONGO_DB_NAME
			}
		},
		gcpConfig: {
			project_id: GCP_PROJECT_ID,
			client_email: GCP_CLIENT_EMAIL,
		},
		jwt_secret: JWT_SECRET,
		security: {
			allowed_origins: ALLOWED_ORIGINS,
			cookie_domain: COOKIE_DOMAIN,
			domain_checking: DOMAIN_CHECKING
		},
		fileManager: {
			cloudProvider: GLOBAL_FILE_MANAGER_CLOUD_PROVER,
			storage: {
				locker_document_bucket: LOCKER_DOCUMENT_BUCKET
			}
		}
	};
};
