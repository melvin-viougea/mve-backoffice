import jwt from 'jsonwebtoken';

export function authenticate(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return { authenticated: false, message: 'No authorization header provided' };
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return { authenticated: false, message: 'Token not found' };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "cd011b85e6f06cf38b9b8cd478a96a5cf9f79268774666c0");
    return { authenticated: true, user: decoded };
  } catch (error) {
    return { authenticated: false, message: 'Invalid token' };
  }
}
