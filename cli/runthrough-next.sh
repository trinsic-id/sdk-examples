#!/usr/bin/env bash
trinsic wallet create --name airtech

# Invite Participants
trinsic -p provider provider invite --organization --method-email issuer@example.com
trinsic -p provider  provider invite --organization --method-email verifier@example.com
trinsic -p provider provider invite --individual --method-email holder@example.com

# Provider creates wallets for clinic and airline
trinsic wallet create --description --name clinic --security-code
trinsic wallet create --description --name airline;

# Allison creates a wallet
trinsic wallet create --name allison --security-code <code>

# Issuer
trinsic --profile clinic issuer issue --document vaccination-certificate-unsigned.jsonld --out ./clinic/vaccination-certificate-signed.jsonld

more ./clinic/vaccination-certificate-signed.jsonld

# Send to holder. Can be done many ways
mv ./clinic/vaccination-certificate-signed.jsonld allison

# Allison inserts credential into cloud wallet 
trinsic --profile allison wallet insert-item --item ./allison/vaccination-certificate-signed.jsonld

# Allison creates a proof of her credential
trinsic --profile allison issuer create-proof --document-id "" --out ./allison/vaccination-certificate-partial-proof.jsonld --reveal-document ./vaccination-certificate-frame.jsonld

more ./allison/vaccination-certificate-partial-proof.jsonld

# Allison sends proof of vaccination to an airline
mv ./allison/vaccination-certificate-partial-proof.json ./airline

# Airline verifies proof
trinsic --profile airline issuer verify-proof --proof-document ./airline/vaccination-certificate-partial-proof.jsonld

#! /bin/bash

# Define your credential templates of the data that you'll be exchanging
# trinsic -p provider list_credential_templates

# trinsic -p provider create_credential_template --schema ./schema.json

# trinsic -p provider get_credential_template --id schema123

# Great! You'll use this credential template once you've created an issuer. 
trinsic -p provider provider invite --organization --method-email issuer@example.com
trinsic -p provider  provider invite --organization --method-email verifier@example.com
trinsic -p provider provider invite --individual --method-email holder@example.com

# In this case, you'll be the issuer, holder, and verifier. However, you can invite anyone else to these wallets as well. 
trinsic wallet create --name issuer --security-code <code>
trinsic create wallet --name issuer --security-code <code>


# **** Create your ecosystem config ****
trinsic --profile provider trust-registry register-egf // TODO
trinsic --profile provider register-issuer --credential-type https://schema.trinsic.id/schema123 --did did:key:1234556

# **** Issue a credential ****
# Now that you've gotten your ecosystem set up and invited your participants, you can now exchange credentials! 

trinsic --profile issuer 
