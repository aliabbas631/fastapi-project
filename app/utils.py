
from pwdlib import PasswordHash

# u can create keys from this command: python -c "import secrets; print(secrets.token_hex(32))"


password_hash = PasswordHash.recommended()
DUMMY_HASH = password_hash.hash("dummypassword")


def hash_password(password: str):
    return password_hash.hash(password)

def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)
