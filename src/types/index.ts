export interface Company {
  id: number;
  name: string;
  messageCount: number;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  backgroundColor: string;
  companies: Company[];
  active: boolean;
}

export type MessageUpdate = {
  platformId: string;
  companyId: number;
  newCount: number;
}