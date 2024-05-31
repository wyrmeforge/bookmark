const token = process.env.NEXT_PUBLIC_MOVIE_DB_TOKEN;

class MovieService {
  async auth() {
    try {
      await fetch('https://api.themoviedb.org/3/authentication', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('aa');
      await this.createNewToken();
    } catch {
      throw new Error('Failed to auth');
    }
  }
  async createNewToken() {
    try {
      const { request_token } = await fetch(
        'https://api.themoviedb.org/3/authentication/token/new',
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((response) => response);

      await this.createSession(request_token);
    } catch {
      throw new Error('Failed to createNewToken');
    }
  }
  async createSession(token: string) {
    try {
      await fetch('https://api.themoviedb.org/3/authentication/session/new', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(token),
      });
    } catch {
      throw new Error('Failed to createSession');
    }
  }
}

export default MovieService;
