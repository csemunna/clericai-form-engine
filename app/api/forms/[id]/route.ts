import { NextRequest, NextResponse } from "next/server";
import forms from "../forms.json";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const form = (forms as any)[id];

  if (!form) {
    return NextResponse.json(
      { error: "Form not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(form);
}
