import AirtablePlus from "airtable-plus";
import { ensureAuthed } from "../../login/test";

export default async function handler(req, res) {
  const user = await ensureAuthed(req);
  if (user.error) {
    return res.status(401).json(user);
  }

  const body = req.body;
  if (!body) {
    return res.status(400).json({ error: "No body provided" });
  }

  const updatedFields = { deleted: true };

  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'app4kCWulfB02bV8Q',
    tableName: "Showcase"
  });

  const { projectID } = req.query;

  try {
    await airtable.update(projectID, updatedFields);

    // No content returned, only status code 204 for success
    return res.status(204).end();
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({ error: "Failed to update project" });
  }
}
