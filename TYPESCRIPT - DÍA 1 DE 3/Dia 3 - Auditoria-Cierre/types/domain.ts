export type ProjectStatus = 'active' | 'paused';

export interface Project {
    id: string;
    name: string;
    status: ProjectStatus;
    owner: string;
    budget: number;
}

export type ProjectCard = Pick<Project, 'id' | 'name' | 'status'>;
export type NewProject = Omit<Project, 'id'>;
export type ProjectUpdate = Partial<Omit<Project, 'id'>>;
export type ProjectWithUIState = Project & {
    isSelected: boolean;
    isToggling: boolean;
};