import btoa from 'btoa'

/**
 * Generate 16 bytes salt for bcrypt by seed. Should return the same salt for the same seed.
 * @param  {string} seed The seed for salt
 */
export default function (seed) {
  let bytes = []

  for (let i = 0, l = seed.length; i < l; i++) {
    bytes.push(seed.charCodeAt(i))
  }

  //-- pad array if length shorter than 16
  while (bytes.length < 16) {
    bytes.push(0)
  }

  // Convert byte array to base64 string
  let salt = btoa(String.fromCharCode.apply(String, bytes.slice(0, 16)))

  // add header + do 10 rounds
  return '$2a$10$' + salt
};
