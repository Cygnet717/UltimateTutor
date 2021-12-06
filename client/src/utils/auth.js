// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {

  /* Get the user token currently housed in localStorage. This will be used 
  to verify whether the user is logged in. */
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Get user data from the token by decoding it. 
  getProfile() {
    return decode(this.getToken());
  }

  /* If we have a valid token, and it hasn't expired, the user must be 
  logged in. */
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  /* Checks to see if the token is expired */
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  /* When the user successfully logs in, a token is received 
  from the server. That token is written to localStorage. Until 
  that token expires, the user is considered to be logged in and 
  will not need to re-authenticate. */
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  /* When the user logs out, we delete the token from localStorage. We 
  then reload the page, which resets the state of the application */
  logout() {
    localStorage.removeItem('id_token'); 
    window.location.assign('/');
  }
}

export default new AuthService();