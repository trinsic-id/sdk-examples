import asyncio
import json
from os.path import abspath, join, dirname

from trinsic.proto.services.account.v1 import LoginRequest, LoginResponse
from trinsic.proto.services.universalwallet.v1 import SearchRequest
from trinsic.proto.services.verifiablecredentials.v1 import (
    IssueRequest,
    SendRequest,
    VerifyProofRequest,
)
from trinsic.trinsic_service import TrinsicService
from trinsicokapi import oberon
from trinsicokapi.proto.okapi.security.v1 import (
    CreateOberonKeyRequest,
    CreateOberonTokenRequest,
    CreateOberonProofRequest,
)

DEFAULT_LOGIN_EMAIL = ""  # TODO - Change this to match yours
DEFAULT_TARGET_EMAIL = ""  # TODO - Change this to match yours
DEFAULT_LOGIN_ECOSYSTEM = ""  # TODO - Change this to match yours

SAVED_PROFILE = ""  # TODO - Speeds up the signin process


class AndroidController:
    def __init__(self):
        self.__account_profile: str = ""
        self.__trinsic_service = TrinsicService()
        self.__login_response = LoginResponse()

    def __del__(self):
        self.close()

    def close(self):
        self.__trinsic_service.close()

    async def begin_login(self, email: str, ecosystem_id: str):
        self.__login_response = await self.__trinsic_service.account.login(
            request=LoginRequest(email=email, ecosystem_id=ecosystem_id)
        )

    async def complete_login(self, auth_code: str):
        self.__account_profile = await self.__trinsic_service.account.login_confirm(
            auth_code=auth_code, challenge=self.__login_response.challenge
        )
        print("Profile:", self.__account_profile)

    async def load_profile(self, account_profile: str):
        self.__trinsic_service.set_auth_token(account_profile)

    async def issue_credential(self, target_email: str):
        # Load from the demo data directory
        with open(AndroidController.drivers_license_frame_path(), "r") as fid:
            drivers_license_unsigned = fid.read()

        issue_response = await self.__trinsic_service.credential.issue(
            request=IssueRequest(document_json=drivers_license_unsigned)
        )

        signed_doc = issue_response.signed_document_json
        print(f"Signed driver's license:\n{signed_doc}")
        print(f"Sending credential to:{target_email}")
        await self.__trinsic_service.credential.send(
            request=SendRequest(document_json=signed_doc, email=target_email)
        )

    async def verify_credential(self, proof_document: dict) -> bool:
        verify_response = await self.__trinsic_service.credential.verify_proof(
            request=VerifyProofRequest(proof_document_json=json.dumps(proof_document))
        )
        is_valid = verify_response.is_valid
        print(
            f"Proof {'IS' if is_valid else 'IS NOT'} valid",
            verify_response.validation_results,
        )
        return is_valid

    async def check_wallet_contents(self) -> dict:
        # Check wallet contents
        query = "SELECT * FROM c WHERE ARRAY_CONTAINS(c.data.type, 'Iso18013DriversLicenseCredential') ORDER BY c.data.proof.created DESC"
        search_results = await self.__trinsic_service.wallet.search(
            request=SearchRequest(query=query)
        )
        print(f"Wallet content items={search_results.items}")
        # TODO - Check for the right type of credentials?
        return json.loads(search_results.items[0])

    @staticmethod
    def samples_licensing_dir() -> str:
        return abspath(
            join(dirname(__file__), "..", "android", "app", "src", "main", "assets")
        )

    @staticmethod
    def drivers_license_frame_path() -> str:
        return abspath(
            join(
                AndroidController.samples_licensing_dir(),
                "drivers-license-unsigned.json",
            )
        )


def verify_okapi_oberon() -> None:
    data = bytes("test@example.com".encode("utf-8"))
    nonce = bytes("123".encode("utf-8"))

    key = oberon.create_key(CreateOberonKeyRequest())
    token = oberon.create_token(CreateOberonTokenRequest(data=data, sk=key.sk))
    proof = oberon.create_proof(
        CreateOberonProofRequest(data=data, token=token.token, nonce=nonce)
    )

    print(f"Proof length={len(proof.proof)}")


async def main():
    verify_okapi_oberon()
    controller = AndroidController()
    target_email = DEFAULT_TARGET_EMAIL
    if not SAVED_PROFILE:
        signin_ecosystem = (
            input(f"Enter ecosystem to sign in [{DEFAULT_LOGIN_ECOSYSTEM}]:")
            or DEFAULT_LOGIN_ECOSYSTEM
        )
        signin_email = (
            input(f"Enter email to sign in [{DEFAULT_LOGIN_EMAIL}]:")
            or DEFAULT_LOGIN_EMAIL
        )
        target_email = (
            input(f"Enter target email to send credential [{DEFAULT_TARGET_EMAIL}]:")
            or DEFAULT_TARGET_EMAIL
        )

        await controller.begin_login(signin_email, signin_ecosystem)
        verify_code = input("Code sent to email, enter it here:")
        await controller.complete_login(verify_code)
    else:
        await controller.load_profile(SAVED_PROFILE)

    await controller.issue_credential(target_email)
    input("Press enter when the proof has been returned")
    proof = await controller.check_wallet_contents()
    print(f"Proof:\n{json.dumps(proof, indent=4)}")
    await controller.verify_credential(proof["data"])

    controller.close()


if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(main())

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
