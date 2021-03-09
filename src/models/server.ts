export interface Server {
    id: string;
    name: string;
    description: string;
    powerStatus: boolean;
    createdAt: Date;
    imagePath?: any;
}
