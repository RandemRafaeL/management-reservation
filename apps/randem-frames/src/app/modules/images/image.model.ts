// image.model.ts
export interface Image {
    id: string;
    fileName?: string;
    contentType: string;
    size?: number;
    createdAt?: Date;
}

export interface UploadedFileResponse {
    id: string;
    data: {
        type: string;
        data: number[];
    };
    contentType: string;
    fileName: string;
    size: number;
    createdAt: string;
}
