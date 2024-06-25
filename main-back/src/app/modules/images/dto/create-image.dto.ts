export class CreateImageDto {
    data: Buffer; // Dane binarne obrazu
    contentType: string; // Typ MIME obrazu
    fileName?: string; // Opcjonalna nazwa pliku
    size?: number;
}
