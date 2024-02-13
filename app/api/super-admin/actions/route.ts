import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import countries from "i18n-iso-countries";

import { db } from "@/lib/db";

// export async function POST(req: Request) {
//   try {
//     // Get English names of all countries
//     const countryNames = countries.getNames('en');

//     // Convert the country names to the format needed for the database
//     const countryData = Object.values(countryNames).map(name => ({ name }));

//     // Add the countries to the database
//     await db.country.createMany({ data: countryData });

//     return NextResponse.json({ message: "Countries added successfully" }, { status: 200 });
//   } catch (error) {
//     console.log("[COUNTRIES_ADD]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

export async function POST(req: Request) {
  try {
    // Add the currencies to the database

    return NextResponse.json(
      { message: "Currencies added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[CURRENCIES_ADD]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
