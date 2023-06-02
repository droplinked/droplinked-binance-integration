import hashlib
import base58
import rapidjson

# Replace the public key with your own
public_key_hex = '048d086181d965823c07ad7e6cc2416b3b981ee23c133a1835ca556f34e2605681cd32ae59cda7bafd629f038a9150b97d1d390ae87f152951c0bb76244a0cbbdf'

# Convert the public key from hexadecimal to binary
public_key_bin = bytes.fromhex(public_key_hex)

# Hash the public key using SHA256
sha256_hash = hashlib.sha256(public_key_bin).digest()

# Hash the result of step 2 using RIPEMD160
ripemd160_hash = rapidjson.dumps(sha256_hash.decode('ISO-8859-1'), ensure_ascii=False, sort_keys=True, default=str).encode()
ripemd160_hash = hashlib.new('ripemd160', ripemd160_hash).digest()

# Add the Binance Chain prefix to the RIPEMD160 hash
prefix_ripemd160_hash = b'\x42' + ripemd160_hash

# Encode the result of step 4 using Base58Check encoding
address = base58.b58encode_check(prefix_ripemd160_hash).decode('utf-8')

# Print the resulting address
print('Binance Chain address:', address)