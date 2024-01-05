import decode from 'jwt-decode';

// AuthService class to handle user authentication
class AuthService {
  // Get user data from the decoded token
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  // Get the user token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Save user token to localStorage and redirect to '/'
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Clear user token and profile data from localStorage and reload the page
  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
