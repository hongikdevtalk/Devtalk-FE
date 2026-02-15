export interface FileData {
  fileName: string;
  fileExtension: string;
  fileSize: number;
  fileUrl: string;
}

export interface PendingFiles {
  thumbnail: File | null;
  materials: File[];
  speakerProfiles: Map<number, File | null>;
  deletedMaterialUrls: string[];
}
