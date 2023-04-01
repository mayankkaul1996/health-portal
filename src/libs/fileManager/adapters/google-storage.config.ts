import { ConfigService } from '@nestjs/config';

export type GCPConfig = {
    projectId?: string;
    privateKey?: string;
    clientEmail?: string;
    mediaBucket: string;
};

export default (): GCPConfig => ({
    mediaBucket: 'locker',
});
