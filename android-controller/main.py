# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import asyncio
import json
from os.path import abspath, join, dirname

from trinsic.proto.services.account.v1 import LoginRequest
from trinsic.proto.services.universalwallet.v1 import SearchRequest
from trinsic.proto.services.verifiablecredentials.v1 import IssueRequest, SendRequest, VerifyProofRequest
from trinsic.trinsic_service import TrinsicService
from trinsic.trinsic_util import trinsic_config
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
    trinsic_service = TrinsicService()
    motor_vehicle_dept = await trinsic_service.account.login_anonymous()
    trinsic_service.set_auth_token(motor_vehicle_dept)

    # Load from the demo data directory
    with open(drivers_license_frame_path(), 'r') as fid:
        drivers_license_unsigned = fid.read()

    issue_response = await trinsic_service.credential.issue(request=IssueRequest(document_json=drivers_license_unsigned))

    signed_doc = issue_response.signed_document_json
    print(f"Signed driver's license:\n{signed_doc}")
    print(f"Sending credential to:{email}")
    await trinsic_service.credential.send(request=SendRequest(document_json=signed_doc, email=email))

    trinsic_service.close()


async def verify_credential(proof_document: dict) -> bool:
    # Create the police officer to verify
    trinsic_service = TrinsicService()
    police_officer = await trinsic_service.account.login_anonymous()
    trinsic_service.set_auth_token(police_officer)
    verify_response = await trinsic_service.credential.verify_proof(request=VerifyProofRequest(proof_document_json=json.dumps(proof_document)))
    is_valid = verify_response.is_valid
    print(f"Proof {'IS' if is_valid else 'IS NOT'} valid")
    trinsic_service.close()
    return is_valid


async def signin(email: str) -> str:
    trinsic_service = TrinsicService()
    login_response = await trinsic_service.account.login(request=LoginRequest(email=email, ecosystem_id="default"))
    verify_code = input("Code sent to email, enter it here:")
    new_account = await trinsic_service.account.login_confirm(challenge=login_response.challenge, auth_code=verify_code)
    return new_account


async def check_wallet_contents(profile: str) -> dict:
    # Check wallet contents
    trinsic_service = TrinsicService(server_config=trinsic_config(auth_token=profile))
    search_results = await trinsic_service.wallet.search(request=SearchRequest(query="SELECT * FROM _"))
    print(f"Wallet content items={search_results.items}")

    trinsic_service.close()

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
