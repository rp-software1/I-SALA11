export type ProjectStatus = 'active' | 'paused';

export interface Project {
    id: string;
    name: string;
    status: ProjectStatus;
    owner: string;
    budget: number;
}

export interface Stats {
    revenue: number;
    newUsers: number;
    churn: number;
}

export interface CurrentUser {
    id: string;
    name: string;
    role: string;
}

export interface DashboardData {
    me: CurrentUser;
    stats: Stats;
    projects: Project[];
}