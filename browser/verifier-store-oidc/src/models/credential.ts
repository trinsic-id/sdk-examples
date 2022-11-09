export interface CredentialSchema {
  id: string;
  type: string;
}
export interface CredentialStatus {
  id: string;
  type: string;
  revocationListCredential: string;
  revocationListIndex: string;
}

export interface CredentialSubject {
  id?: string;
  address?: string;
  certificationGrade?: string;
  city?: string;
  idNumber?: string;
  name?: string;
  produceType?: string;
  state?: string;
}

export interface CredentialProof {
  type: string;
  created: string;
  nonce: string;
  proofPurpose: string;
  proofValue: string;
  verificationMethod: string;
}

export interface CredentialDerivedProof {
  "@context": string[];
  id: string;
  type: string[];
  credentialSchema: CredentialSchema;
  credentialStatus: CredentialStatus;
  credentialSubject: CredentialSubject;
  issuanceDate: string;
  issuer: string;
  proof: CredentialProof;
}
