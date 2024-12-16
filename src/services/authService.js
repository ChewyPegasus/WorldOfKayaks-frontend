import api from './api';

class AuthService {
    async login(username, password) {
        try {
            console.log('Sending login request to:', '/auth/authenticate');
            const response = await api.post('/auth/authenticate', { username, password });
            console.log('Login response:', response);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                if (response.data.user) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }
            }
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(username, password) {
        try {
            console.log('Sending register request to:', '/auth/register');
            const response = await api.post('/auth/register', { username, password });
            console.log('Register response:', response);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                if (response.data.user) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }
            }
            return response.data;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }
}

const authService = new AuthService();
export default authService;
