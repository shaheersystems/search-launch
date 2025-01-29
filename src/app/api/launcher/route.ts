import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const launchers = await prisma.launcher.findMany();
    return NextResponse.json({
      count: launchers.length,
      data: launchers,
    });
  } catch (error) {
    return new Response(error as string, { status: 500 });
  }
}
