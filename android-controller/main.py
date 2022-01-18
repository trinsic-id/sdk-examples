# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import asyncio
import json
from os.path import abspath, join, dirname

from trinsic.services import AccountService, CredentialsService

# Press the green button in the gutter to run the script.
from trinsic.trinsic_util import trinsic_test_config


def samples_licensing_dir() -> str:
    return abspath(join(dirname(__file__), '..', 'samples', 'licensing'))


def drivers_license_frame_path() -> str:
    return abspath(join(samples_licensing_dir(), 'drivers-license-unsigned.json'))


async def issue_credential():
    # Create the police officer to verify
    account_service = AccountService(server_config=trinsic_test_config())
    motor_vehicle_dept, _ = await account_service.sign_in()
    credential_service = CredentialsService(motor_vehicle_dept, trinsic_test_config())

    # Load from the demo data directory
    with open(drivers_license_frame_path(), 'r') as fid:
        drivers_license_unsigned = json.load(fid)

    credential = await credential_service.issue_credential(drivers_license_unsigned)

    print(f"Signed driver's license:\n{json.dumps(credential)}")
    credential_service.close()
    account_service.close()


async def verify_credential():
    # Create the police officer to verify
    account_service = AccountService(server_config=trinsic_test_config())
    police_officer, _ = await account_service.sign_in()
    credential_service = CredentialsService(police_officer, trinsic_test_config())
    # Get the item-id to verify
    credential_string = input("Enter the credential proof as JSON:")
    proof_document = json.loads(credential_string)
    is_valid = await credential_service.verify_proof(proof_document)
    print(f"Proof {'IS' if is_valid else 'IS NOT'} valid")
    credential_service.close()
    account_service.close()


async def main():
    await issue_credential()

    await verify_credential()


if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(main())

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
