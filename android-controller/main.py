# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import asyncio
import json
from os.path import abspath, join, dirname

from trinsic.account_service import AccountService
from trinsic.credential_service import CredentialService
from trinsic.proto.services.account.v1 import AccountDetails, SignInRequest
from trinsic.proto.services.verifiablecredentials.v1 import IssueRequest, SendRequest, VerifyProofRequest
from trinsic.trinsic_util import trinsic_config
from trinsic.wallet_service import WalletService
from trinsicokapi import oberon
from trinsicokapi.proto.okapi.security.v1 import CreateOberonKeyRequest, CreateOberonTokenRequest, \
    CreateOberonProofRequest


def samples_licensing_dir() -> str:
    return abspath(join(dirname(__file__), '..', 'samples', 'licensing'))


def drivers_license_frame_path() -> str:
    return abspath(join(samples_licensing_dir(), 'drivers-license-unsigned.json'))


def verify_okapi_oberon() -> None:
    id = bytes('test@example.com'.encode('utf-8'))
    nonce = bytes('123'.encode('utf-8'))

    key = oberon.create_key(CreateOberonKeyRequest())
    token = oberon.create_token(CreateOberonTokenRequest(data=id, sk=key.sk))
    proof = oberon.create_proof(CreateOberonProofRequest(data=id, token=token.token, nonce=nonce))

    print(f'Proof length={len(proof.proof)}')


async def issue_credential(email: str):
    # Create the police officer to verify
    account_service = AccountService()
    motor_vehicle_dept = await account_service.sign_in()
    credential_service = CredentialService(server_config=trinsic_config(motor_vehicle_dept))

    # Load from the demo data directory
    with open(drivers_license_frame_path(), 'r') as fid:
        drivers_license_unsigned = fid.read()

    issue_response = await credential_service.issue(request=IssueRequest(document_json=drivers_license_unsigned))

    signed_doc = issue_response.signed_document_json
    print(f"Signed driver's license:\n{signed_doc}")
    print(f"Sending credential to:{email}")
    await credential_service.send(request=SendRequest(document_json=signed_doc, email=email))

    credential_service.close()
    account_service.close()


async def verify_credential(proof_document: dict) -> bool:
    # Create the police officer to verify
    account_service = AccountService()
    police_officer = await account_service.sign_in()
    credential_service = CredentialService(server_config=trinsic_config(police_officer))
    verify_response = await credential_service.verify_proof(request=VerifyProofRequest(proof_document_json=json.dumps(proof_document)))
    is_valid = verify_response.is_valid
    print(f"Proof {'IS' if is_valid else 'IS NOT'} valid")
    credential_service.close()
    account_service.close()
    return is_valid


async def signin(email: str) -> str:
    account_service = AccountService()
    new_account = await account_service.sign_in(request=SignInRequest(details=AccountDetails(email=email)))
    verify_code = input("Code sent to email, enter it here:")
    new_account_unprotect = account_service.unprotect(profile=new_account, security_code=verify_code.encode('utf-8'))
    return new_account_unprotect


async def check_wallet_contents(profile: str) -> dict:
    # Check wallet contents
    wallet_service = WalletService(server_config=trinsic_config(auth_token=profile))
    search_results = await wallet_service.search()
    print(f"Wallet content items={search_results.items}")

    return json.loads(search_results.items[-1])


async def main():
    verify_okapi_oberon()
    signin_email = input('Enter email to sign in:')
    account_profile = await signin(signin_email)
    email = input('Enter email to send credential:')
    await issue_credential(email)
    input('Press enter when the proof has been returned')
    proof = await check_wallet_contents(account_profile)
    print(f"Proof:\n{json.dumps(proof)}")
    await verify_credential(proof['data'])


if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(main())

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
