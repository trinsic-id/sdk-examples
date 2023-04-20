import { TrinsicService } from "@trinsic/trinsic";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const templateId = "urn:template:okeydoke:event-attendee";

async function main() {
  // Construct a TrinsicService and configure it with the auth token for your issuer wallet
  const trinsic = new TrinsicService();
  trinsic.setAuthToken("[ISSUER AUTH TOKEN]");

  // Load the database for this example.
  // In this example, we're using SQLite -- your use case may look different depending on your data source.
  const db = await open({
    filename: './data/attendees.db',
    driver: sqlite3.Database
  });

  // Fetch the data from the database
  const attendees = await db.all("SELECT email, name, age, allergies FROM attendees");

  // Issue a credential to each attendee
  for (const attendee of attendees) {
    // Prepare the JSON to issue the credential
    // The key names here must match the key names used when creating the template
    const credentialValues = {
      name: attendee.name,
      age: attendee.age,
      email: attendee.email,
      allergies: attendee.allergies
    };

    // Issue the credential -- this returns a signed credential, but does not store it in a wallet yet
    const issuedCredential = await trinsic.credential().issueFromTemplate({
      templateId: templateId, // Use your template ID here
      valuesJson: JSON.stringify(credentialValues)
    });

    // Store the credential in the attendee's wallet; this will create it if it does not exist.
    await trinsic.credential().send({
      email: attendee.email,
      documentJson: issuedCredential.documentJson
    });
  }
}

main()
  .then()
  .catch((reason) => console.error(reason));
