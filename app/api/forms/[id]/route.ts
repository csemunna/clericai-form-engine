import { NextRequest, NextResponse } from "next/server";
import forms from "../forms.json";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(
  _req: NextRequest,
  { params }: Params
) {
  const { id } = params;

  const form = (forms as any)[id];

  if (!form) {
    return NextResponse.json({ error: "Form not found" }, { status: 404 });
  }

  return NextResponse.json(form);
}
