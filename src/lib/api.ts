const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Request failed' };
      }

      return { data };
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  // Auth
  async register(email: string, password: string, displayName?: string) {
    const result = await this.request<{ user: object; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, displayName }),
    });
    if (result.data?.token) {
      this.setToken(result.data.token);
    }
    return result;
  }

  async login(email: string, password: string) {
    const result = await this.request<{ user: object; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (result.data?.token) {
      this.setToken(result.data.token);
    }
    return result;
  }

  async logout() {
    this.setToken(null);
  }

  async getMe() {
    return this.request<{ user: object }>('/auth/me');
  }

  async connectWallet(walletAddress: string, signature: string, message: string) {
    return this.request('/auth/connect-wallet', {
      method: 'POST',
      body: JSON.stringify({ walletAddress, signature, message }),
    });
  }

  // Projects
  async getProjects() {
    return this.request<{ projects: object[] }>('/projects');
  }

  async getProject(id: string) {
    return this.request<{ project: object }>(`/projects/${id}`);
  }

  async createProject(data: { name: string; description?: string; blocks?: object[]; edges?: object[] }) {
    return this.request<{ project: object }>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: object) {
    return this.request<{ project: object }>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, { method: 'DELETE' });
  }

  async duplicateProject(id: string) {
    return this.request<{ project: object }>(`/projects/${id}/duplicate`, {
      method: 'POST',
    });
  }

  // Compile
  async compileContract(projectId: string, sourceCode: string, contractName: string) {
    return this.request<{
      success: boolean;
      abi: object[];
      bytecode: string;
      gasEstimates: object;
      securityReport: object;
      warnings: string[];
    }>('/compile', {
      method: 'POST',
      body: JSON.stringify({ projectId, sourceCode, contractName }),
    });
  }

  async securityScan(sourceCode: string) {
    return this.request<{ securityReport: object }>('/compile/security-scan', {
      method: 'POST',
      body: JSON.stringify({ sourceCode }),
    });
  }

  // Deploy
  async getNetworks() {
    return this.request<{ networks: object[] }>('/deploy/networks');
  }

  async estimateGas(networkId: string, bytecode: string, abi: object[], constructorArgs?: unknown[]) {
    return this.request<{ gasEstimate: string; gasCostWei: string; gasCostEth: string }>(
      '/deploy/estimate-gas',
      {
        method: 'POST',
        body: JSON.stringify({ networkId, bytecode, abi, constructorArgs }),
      }
    );
  }

  async createDeployment(projectId: string, networkId: string, constructorArgs?: unknown[]) {
    return this.request<{
      deployment: object;
      bytecode: string;
      abi: object[];
      constructorArgs: unknown[];
      network: object;
    }>('/deploy', {
      method: 'POST',
      body: JSON.stringify({ projectId, networkId, constructorArgs }),
    });
  }

  async confirmDeployment(id: string, contractAddress: string, transactionHash: string, gasUsed: number) {
    return this.request<{ deployment: object }>(`/deploy/${id}/confirm`, {
      method: 'PUT',
      body: JSON.stringify({ contractAddress, transactionHash, gasUsed }),
    });
  }

  async failDeployment(id: string, error: string) {
    return this.request<{ deployment: object }>(`/deploy/${id}/fail`, {
      method: 'PUT',
      body: JSON.stringify({ error }),
    });
  }

  async getDeployments() {
    return this.request<{ deployments: object[] }>('/deploy');
  }

  async getDeployment(id: string) {
    return this.request<{ deployment: object }>(`/deploy/${id}`);
  }

  async verifyContract(deploymentId: string) {
    return this.request<{ success: boolean; guid?: string; error?: string }>(
      `/deploy/${deploymentId}/verify`,
      { method: 'POST' }
    );
  }

  // Templates
  async getPublicTemplates(params?: { category?: string; search?: string; sort?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<{ templates: object[] }>(`/templates/public${query ? `?${query}` : ''}`);
  }

  async getPublicTemplate(id: string) {
    return this.request<{ template: object }>(`/templates/public/${id}`);
  }

  async getMyTemplates() {
    return this.request<{ templates: object[] }>('/templates/mine');
  }

  async createTemplate(data: object) {
    return this.request<{ template: object }>('/templates', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTemplate(id: string, data: object) {
    return this.request<{ template: object }>(`/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTemplate(id: string) {
    return this.request(`/templates/${id}`, { method: 'DELETE' });
  }

  async useTemplate(id: string, name?: string) {
    return this.request<{ project: object }>(`/templates/${id}/use`, {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  // User
  async updateProfile(data: { displayName?: string; avatar?: string }) {
    return this.request<{ user: object }>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/users/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async getUsage() {
    return this.request<{
      subscription: string;
      deploymentsUsed: number;
      deploymentsLimit: number;
      resetsAt: string;
      projectCount: number;
      deploymentCount: number;
      templateCount: number;
    }>('/users/usage');
  }

  async getApiKeys() {
    return this.request<{ apiKeys: object[] }>('/users/api-keys');
  }

  async createApiKey(name: string, permissions?: string[], expiresAt?: string) {
    return this.request<{ apiKey: object; key: string }>('/users/api-keys', {
      method: 'POST',
      body: JSON.stringify({ name, permissions, expiresAt }),
    });
  }

  async deleteApiKey(id: string) {
    return this.request(`/users/api-keys/${id}`, { method: 'DELETE' });
  }

  async deleteAccount(password: string) {
    return this.request('/users/account', {
      method: 'DELETE',
      body: JSON.stringify({ password }),
    });
  }
}

export const api = new ApiClient();
export default api;
