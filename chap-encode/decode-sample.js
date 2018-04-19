const readHeader = buf => {
  const magic = buf.slice(0, 4)
  const command = buf
    .slice(4, 16)
    .toString('ascii')
    .replace(/\0/g, '')
  const payloadLength = buf.readUInt32LE(16)
  const checksum = buf.slice(20)
  return {magic, command, payloadLength, checksum}
}

const header = Buffer.from(
  'f9beb4d976657273696f6e000000000005000000deadbeaf',
  'hex'
)
console.log(readHeader(header))
/*
{ magic: <Buffer f9 be b4 d9>,
  command: 'version',
  payloadLength: 5,
  checksum: <Buffer de ad be af> }
*/
