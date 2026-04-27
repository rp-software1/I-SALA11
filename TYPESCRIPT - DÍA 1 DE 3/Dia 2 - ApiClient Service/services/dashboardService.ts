import { apiClient } from './apiClient';
import type { DashboardData, Project, ApiResponse } from '../types';

interface CreateProjectPayload {
    name: string;
    owner: string;
    budget?: number;
    status?: 'active' | 'paused';
}

export async function apiGetDashboard(
    { token }: { token: string }
): Promise<ApiResponse<DashboardData>> {
    apiClient.setToken(token);
    return apiClient.get<DashboardData>('/dashboard');
}

export async function apiCreateProject(
    { token, payload }: { token: string; payload: CreateProjectPayload }
): Promise<ApiResponse<Project>> {
    apiClient.setToken(token);
    return apiClient.post<Project>('/projects', payload);
}

export async function apiToggleProjectStatus(
    { token, id }: { token: string; id: string }
): Promise<ApiResponse<Project>> {
    apiClient.setToken(token);
    return apiClient.patch<Project>(`/projects/${id}/toggle`, {});
}