export interface PublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
}

export interface File {
  uid: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  content_type: string;
  file_size: string;
  tags: string[];
  filename: string;
  url: string;
  ACL: any[] | object;
  is_dir: boolean;
  parent_uid: string;
  _version: number;
  title: string;
  _metadata?: object;
  description?: string;
  dimension?: {
    height: number;
    width: number;
  };
  publish_details: PublishDetails;
  /** CSLP mapping for editable fields */
  $?: {
    url?: CSLPFieldMapping;
    title?: CSLPFieldMapping;
    filename?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
  };
}

export interface Link {
  title: string;
  href: string;
}

export interface Taxonomy {
  taxonomy_uid: string;
  max_terms?: number;
  mandatory: boolean;
  non_localizable: boolean;
}

export interface CSLPAttribute {
  "data-cslp"?: string;
  "data-cslp-parent-field"?: string;
}
export type CSLPFieldMapping = CSLPAttribute;

export interface SystemFields {
  uid?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  _content_type_uid?: string;
  tags?: string[];
  ACL?: any[];
  _version?: number;
  _in_progress?: boolean;
  locale?: string;
  publish_details?: PublishDetails;
  title?: string;
}

/** A block! */
export interface Block {
  /** Version */
  _version?: number;
  /** Title */
  title?: string;
  /** Copy */
  copy?: string;
  /** Image */
  image?: File | null;
  /** Layout */
  layout?: ("image_left" | "image_right") | null;
  /** Metadata */
  _metadata?: { uid: string };
  /** CSLP mapping for editable fields */
  $?: {
    title?: CSLPFieldMapping;
    copy?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    layout?: CSLPFieldMapping;
  };
}

export interface Blocks extends SystemFields {
  block: Block;
}

export interface Page extends SystemFields {
  /** UID - required for live preview */
  uid: string;
  /** Version */
  _version?: number;
  /** Title */
  title: string;
  /** URL */
  url?: string;
  /** Description */
  description?: string;
  /** Image */
  image?: File | null;
  /** Rich Text */
  rich_text?: string;
  /** blocks */
  blocks?: Blocks[];
  /** CSLP mapping for editable fields */
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    rich_text?: CSLPFieldMapping;
    blocks?: CSLPFieldMapping;
    [key: string]: CSLPFieldMapping | undefined; // Allow dynamic block indexing
  };
}
