import jwt from 'jsonwebtoken';

interface JwtPayloadCustom {
  email: string;
  isSuperAdmin: boolean;
  iat?: number;
  exp?: number;
}

export function authenticate(request: Request, requireSuperAdmin = false) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return { authenticated: false, message: 'No authorization header provided' };
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return { authenticated: false, message: 'Token not found' };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayloadCustom;
    if (requireSuperAdmin && !decoded.isSuperAdmin) {
      return { authenticated: false, message: 'Insufficient permissions' };
    }
    return { authenticated: true, user: decoded };
  } catch (error) {
    return { authenticated: false, message: 'Invalid token' };
  }
}