# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import asyncio
import json

from trinsic.services import AccountService, CredentialsService

# Press the green button in the gutter to run the script.
from trinsic.trinsic_util import trinsic_test_config


async def main():
    # Create the police officer to verify
    account_service = AccountService(server_config=trinsic_test_config())
    police_officer, _ = await account_service.sign_in()
    credential_service = CredentialsService(police_officer, trinsic_test_config())
    # Get the item-id to verify
    credential_string = input("Enter the credential proof:")
    proof_document = json.loads(credential_string)
    is_valid = await credential_service.verify_proof(proof_document)

    print(f"Proof {'IS' if is_valid else 'IS NOT'} valid")

    credential_service.close()
    account_service.close()


if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(main())

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
