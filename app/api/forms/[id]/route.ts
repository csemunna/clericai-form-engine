import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import forms from "../forms.json";

export async function GET(_req, context) {
  const { id } = await context.params;

  // Step 1: Validate ID is known
  const formMeta = forms.find((f) => f.id === id);
  if (!formMeta) {
    return NextResponse.json(
      { error: "Form not found" },
      { status: 404 }
    );
  }

  // Step 2: Load the actual JSON file from /forms folder
  const filePath = path.join(process.cwd(), "forms", `${id}.json`);

  try {
    const fileData = await fs.readFile(filePath, "utf8");
    const formJson = JSON.parse(fileData);
    return NextResponse.json(formJson);
  } catch (error) {
    return NextResponse.json(
      { error: "Form file missing or invalid" },
      { status: 500 }
    );
  }
}
