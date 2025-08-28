import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);
const SALT_LENGTH = 16; // 16 bytes = 128 bits
const KEY_LENGTH = 32; // 32 bytes = 256 bits
const SCRYPT_PARAMS = {
  N: 16384, // CPU/memory cost factor
  r: 8,     // block size
  p: 1      // parallelization factor
};

export async function hashPassword(password) {
  // Generate a random salt
  const salt = randomBytes(SALT_LENGTH).toString('hex');
  
  // Hash the password with the salt
  const derivedKey = await scryptAsync(
    password,
    salt,
    KEY_LENGTH,
    SCRYPT_PARAMS
  );
  
  // Combine the salt and hash
  const hash = derivedKey.toString('hex');
  return `${salt}:${hash}`;
}

export async function verifyPassword(password, storedHash) {
  try {
    const [salt, hash] = storedHash.split(':');
    if (!salt || !hash) return false;
    
    // Hash the provided password with the stored salt
    const derivedKey = await scryptAsync(
      password,
      salt,
      KEY_LENGTH,
      SCRYPT_PARAMS
    );
    
    // Use timing-safe comparison to prevent timing attacks
    return timingSafeEqual(
      Buffer.from(hash, 'hex'),
      derivedKey
    );
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}
