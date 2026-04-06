export interface ModelTag {
  tag_name: string;
  parameters: string | null;
  quantization: string | null;
  variant: string | null;
  size_str: string | null;
  size_bytes: number | null;
  context_window: string | null;
  input_type: string | null;
  digest: string | null;
  updated_at: string | null;
}

export interface Model {
  name: string;
  description: string | null;
  family: string | null;
  capabilities: string[];
  pulls: string | null;
  tag_count: number | null;
  last_updated: string | null;
  updated_date: string | null;
  updated_days_ago: number;   // always an integer; 7 if unknown
  fetched_at: string | null;
  tags: ModelTag[];
  default_size_bytes: number | null;
  default_params: string | null;
  default_quant: string | null;
  param_sizes: string[];
}

export interface ModelsData {
  exported_at: string;
  count: number;
  models: Model[];
}
