const opTable = [
  {opCode: 0x00, mnemonic: ['0', 'FALSE']},
  {opCode: 0x4c, mnemonic: ['PUSHDATA1']},
  {opCode: 0x4d, mnemonic: ['PUSHDATA2']},
  {opCode: 0x4e, mnemonic: ['PUSHDATA4']},
  {opCode: 0x4f, mnemonic: ['1NEGATE']},
  {opCode: 0x51, mnemonic: ['1', 'TRUE']},
  {opCode: 0x61, mnemonic: ['NOP']},
  {opCode: 0x63, mnemonic: ['IF']},
  {opCode: 0x64, mnemonic: ['NOTIF']},
  {opCode: 0x67, mnemonic: ['ELSE']},
  {opCode: 0x68, mnemonic: ['ENDIF']},
  {opCode: 0x6a, mnemonic: ['RETURN']},
  {opCode: 0x69, mnemonic: ['VERIFY']},
  {opCode: 0x6b, mnemonic: ['TOALTSTACK']},
  {opCode: 0x6c, mnemonic: ['FROMALTSTACK']},
  {opCode: 0x6d, mnemonic: ['2DROP']},
  {opCode: 0x6e, mnemonic: ['2DUP']},
  {opCode: 0x6f, mnemonic: ['3DUP']},
  {opCode: 0x70, mnemonic: ['2OVER']},
  {opCode: 0x71, mnemonic: ['2ROT']},
  {opCode: 0x72, mnemonic: ['2SWAP']},
  {opCode: 0x73, mnemonic: ['IFDUP']},
  {opCode: 0x75, mnemonic: ['DROP']},
  {opCode: 0x76, mnemonic: ['DUP']},
  {opCode: 0x77, mnemonic: ['NIP']},
  {opCode: 0x78, mnemonic: ['OVER']},
  {opCode: 0x79, mnemonic: ['PICK']},
  {opCode: 0x7a, mnemonic: ['ROLL']},
  {opCode: 0x7b, mnemonic: ['ROT']},
  {opCode: 0x7c, mnemonic: ['SWAP']},
  {opCode: 0x7d, mnemonic: ['TUCK']},
  {opCode: 0x87, mnemonic: ['EQUAL']},
  {opCode: 0x88, mnemonic: ['EQUALVERIFY']},
  {opCode: 0x8b, mnemonic: ['1ADD']},
  {opCode: 0x8c, mnemonic: ['1SUB']},
  {opCode: 0x8f, mnemonic: ['NEGATE']},
  {opCode: 0x90, mnemonic: ['ABS']},
  {opCode: 0x91, mnemonic: ['NOT']},
  {opCode: 0x92, mnemonic: ['0NOTEQUAL']},
  {opCode: 0x93, mnemonic: ['ADD']},
  {opCode: 0x94, mnemonic: ['SUB']},
  {opCode: 0x9a, mnemonic: ['BOOLAND']},
  {opCode: 0x9b, mnemonic: ['BOOLOR']},
  {opCode: 0x9c, mnemonic: ['NUMEQUAL']},
  {opCode: 0x9d, mnemonic: ['NUMEQUALVERIFY']},
  {opCode: 0x9f, mnemonic: ['LESSTHAN']},
  {opCode: 0xa0, mnemonic: ['GREATERTHAN']},
  {opCode: 0xa1, mnemonic: ['LESSTHANOREQUAL']},
  {opCode: 0xa2, mnemonic: ['GREATERTHANOREQUAL']},
  {opCode: 0xa3, mnemonic: ['MIN']},
  {opCode: 0xa4, mnemonic: ['MAX']},
  {opCode: 0xa5, mnemonic: ['WITHIN']},
  {opCode: 0xa6, mnemonic: ['RIPEMD160']},
  {opCode: 0xa7, mnemonic: ['SHA1']},
  {opCode: 0xa8, mnemonic: ['SHA256']},
  {opCode: 0xa9, mnemonic: ['HASH160']},
  {opCode: 0xaa, mnemonic: ['HASH256']},
  {opCode: 0xab, mnemonic: ['CODESEPARATOR']},
  {opCode: 0xac, mnemonic: ['CHECKSIG']},
  {opCode: 0xad, mnemonic: ['CHECKSIGVERIFY']},
  {opCode: 0xae, mnemonic: ['CHECKMULTISIG']},
  {opCode: 0xaf, mnemonic: ['CHECKMULTISIGVERIFY']},
  {opCode: 0xb1, mnemonic: ['CHECKLOCKTIMEVERIFY']},
  {opCode: 0xb2, mnemonic: ['CHECKSEQUENCEVERIFY']}

]
for (let i = 0x52; i <= 0x60; i++) {
  opTable.push({opCode: i, mnemonic: [`OP_${i - 0x50}`]})
}

module.exports = {
  opTable,
}