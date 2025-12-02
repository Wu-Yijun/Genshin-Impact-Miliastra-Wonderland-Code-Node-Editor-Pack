import type { GraphDocument } from './node';
import type {
  StructDocument,
  StructManifestEntry,
  StructManifestGroup,
} from './struct';

export type ProjectTopFolder = 'server' | 'client';

export interface ProjectCategoryDefinition {
  key: string;
  directory: string;
  label: string;
  topFolder: ProjectTopFolder;
}

export const DEFAULT_GROUP_NAME = '未分类页签';
export const DEFAULT_GROUP_SLUG = 'default';

export interface ProjectManifestGroup {
  topFolder: ProjectTopFolder;
  categoryKey: string;
  groupSlug: string;
  groupName: string;
}

export interface ProjectManifestStructGroup extends StructManifestGroup { }

export interface ProjectManifestGraph {
  graphId: string;
  name: string;
  path: string;
  groupName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectManifest {
  manifestVersion: number;
  appVersion: string;
  project: {
    id: string;
    name: string;
  };
  graphs: ProjectManifestGraph[];
  groups: ProjectManifestGroup[];
  structGroups?: ProjectManifestStructGroup[];
  structures?: StructManifestEntry[];
}

export const PROJECT_MANIFEST_VERSION = 2;

export interface ProjectGraphLocation {
  topFolder: ProjectTopFolder;
  categoryKey: string;
  categoryDirectory: string;
  groupSlug: string;
  groupName: string;
}

export interface ProjectDocument {
  manifest: ProjectManifest;
  graphs: Record<string, GraphDocument>;
  structs?: Record<string, StructDocument>;
}

export interface ProjectGraphDescriptor {
  graphId: string;
  name: string;
  location: ProjectGraphLocation;
}

export const PROJECT_CATEGORY_DEFINITIONS: ProjectCategoryDefinition[] = [
  { topFolder: 'server', key: 'entity', directory: 'entity', label: '实体节点图' },
  { topFolder: 'server', key: 'stats', directory: 'stats', label: '状态节点图' },
  { topFolder: 'server', key: 'profession', directory: 'profession', label: '职业节点图' },
  { topFolder: 'server', key: 'item', directory: 'item', label: '道具节点图' },
  { topFolder: 'client', key: 'boolean-filter', directory: 'boolean-filter', label: '布尔过滤器节点图' },
  { topFolder: 'client', key: 'integer-filter', directory: 'integer-filter', label: '整数过滤器节点图' },
  { topFolder: 'client', key: 'skill', directory: 'skill', label: '技能节点图' },
];

export const PROJECT_CATEGORIES_BY_TOP: Record<ProjectTopFolder, ProjectCategoryDefinition[]> = {
  server: PROJECT_CATEGORY_DEFINITIONS.filter((definition) => definition.topFolder === 'server'),
  client: PROJECT_CATEGORY_DEFINITIONS.filter((definition) => definition.topFolder === 'client'),
};

export const PROJECT_CATEGORY_BY_DIRECTORY = new Map(
  PROJECT_CATEGORY_DEFINITIONS.map((definition) => [definition.directory, definition]),
);

export const PROJECT_CATEGORY_BY_KEY = new Map(
  PROJECT_CATEGORY_DEFINITIONS.map((definition) => [definition.key, definition]),
);