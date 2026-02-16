export interface AppProgram {
  code: string;
  label: string;
}

export interface AppCardModel {
  key: string;
  logoUrl: string;
  name: string;
  partnerName: string;
  rating: number;
  installs: number;
  summary: string;
  programs: AppProgram[];
}

export interface SecurityInfo {
  dataManagement?: {
    storageLocation?: string;
    dataResidency?: string;
    backupPolicy?: string;
  };
  compliance?: string[];
  security?: {
    encryptionAtRest?: boolean;
    encryptionInTransit?: boolean;
    bugBounty?: boolean;
    auditLog?: boolean;
  };
  privacy?: {
    dpAgreement?: boolean;
    piiProcessing?: string;
    retentionPolicy?: string;
  };
}

export interface AppDetailModel extends AppCardModel {
  id: string;
  description?: string;
  pricingModel?: string;
  partner?: {
    name: string;
    websiteUrl?: string;
  };
  reviews?: Array<{
    id: string;
    rating: number;
    title?: string;
    content?: string;
    user?: { id: string; name: string };
    createdAt: string;
  }>;
  securityInfo?: SecurityInfo;
}
