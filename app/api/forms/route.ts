import { NextResponse } from "next/server";
import forms from "./forms.json";

export async function GET() {
  try {
    // Return the list of all forms
    return NextResponse.json(forms);
  } catch (error) {
    console.error("Error loading forms:", error);
    return NextResponse.json(
      { error: "Unable to load forms" },
      { status: 500 }
    );
  }
}
