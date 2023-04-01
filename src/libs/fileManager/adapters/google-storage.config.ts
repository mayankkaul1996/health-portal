import { ConfigService } from '@nestjs/config';

export type GCPConfig = {
    projectId: string;
    privateKey: string;
    clientEmail: string;
    mediaBucket: string;
};

export default (): GCPConfig => ({
    projectId: 'docmanager-381518',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2QEsOcMm5/hi0\npXl4O6hWvsPJYKqPqe3sRbKw8ZWx8Vp8yI8MNyJeYYgW10YtRK+EicqTpoiYFHtz\nlrMsbPzPnjNCWVOosaaocRjwn5AZH1DdN5QAHeFNNdBUSmeoOre5GXARdEVfStnr\n5OGOn7RMihrVreAguz9KIHYPDFE4BSQBTCmwkq8MOJ1gkkOlK7ZHPo1OsWikU9hY\nG3nciv2Pgu71qxB274gkbENUeg1xXcWc+fFPZCK0ikBf6yr/erXi9wkQdrchqjEj\nV1TH0vRm00Dk/zZbjZIxVJPFy8n3CfJ8dVLDrDYAeK2PdZviJZtttRGm+kujU3qq\n1SXh+ix3AgMBAAECggEAB5Pyyv3rlV04X8KFo3cvj7PM5kGrtd+F8g4P2QWiiMyV\nS5z3PbXJKw15ICIBW/6AIc2s66jAAzrOy0aX2qAJfwR/8yFNtjT0zgot1Et+LV08\n+oXGFJ8pcBFtwSN63ebbHsos+7zO6aBuIT3aFxkS4R/Y78uUByhiAE4LOqLzeZXD\nAiX7i24BlWPZIbT7liKdHwb680LM0NyVDnJQK7qwgQ/+FrB+jTu185loBHx1Rlyg\neKkPW1w+KhqAtqz5CaIv/BgIp+s34B//fWEJxCDoAbEHQ6AH6xcoewkf2kK/F3rm\n2uaSYcK8Xr5/TpYzovFnqvKcNLcK5Y2JsBN3xZVyOQKBgQD3MS1nun/e2szL1Roq\n8/97NRdNu54SaTRYY3CLJnPYKDfZ1SmQAySjfmJnT+713N92N8eD4KCbSnkRNHr5\nUnKorg3EelZbZ4YWSyqHvGAvjT8mg7JFM/2wQ09k53egjBlBpbSJNFEhreGr1hkf\n/uoPcrBLDag8+05tFI7+PVKFEwKBgQC8vr29yfYopufe7UFMieKNxrS7RwDqmhBh\n5AE1us0AaZhikUdrz1099gvGO4zmRp9M7P3REZuloc7ISH8ogZuUvim81yXrnlhf\n28oNGXoVfhKmrCWfOR9gdJYmkKyH57MgFph1WqRADk3pqpBqHlHxOFaubKxf9Ot6\nOUEAjqa7jQKBgQCwiujYynQE39OgSER2JOl0P0izdanBkG2YKvz4BLB70s2AwCL8\n/aGvOtZg3s/VvLfEILZX05ghEKFCzm59norROe4PQyhmA5vaVDi91KYFkCVoBmrN\nzgIDXy9W65GekjB/mC9GRp0jJqKkLTaoiVD1U33hPJHJa9ppQWOW5IkJDQKBgDXz\nW68dRJSYKN0q+ihTnYOjEdQaVqO4iAhDMSlXjPOaO2mpVz301xU3+GOgcAT+mNhX\nQbH6E4CDwOS0/EvqyDr7JFkLMpan+2DjJV0bNC9iixhDSrm5jUN379d0MSzjyOra\nKpgY4axBqnmpPIBozElkLjrLa3Y+PvT/2pm7LOOdAoGAaO9FCcCYlHdtTcl6vkal\nqvI4ZwmZ5wNyxQyy1w/kgWlROIaLUNYFEgXbCfrihGSGQb1LqgofPZKqgmAMN64r\nrvwJnjIuBaZmck1navuSI3oqZQb/e447jCgVGeq+vXTc9qwssBfrrlYf6Es7HWch\nwNQzZcFbCHs6WxSBEiDeP0E=\n-----END PRIVATE KEY-----\n',
    clientEmail: 'storage-admin@docmanager-381518.iam.gserviceaccount.com',
    mediaBucket: 'locker',
});
