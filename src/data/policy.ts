export interface Vehicle {
  nickname: string;
  registration: string;
  year: number;
}

export interface CoverSection {
  id: string;
  title: string;
  summary: string;
  exclusions: string[];
  isAddOn?: boolean;
}

export interface Limit {
  label: string;
  amount: string;
  per: "Per claim" | "Per policy";
}

export interface MotorPolicy {
  id: string;
  status: "Active" | "Expired" | "Cancelled";
  productName: string;
  coverType: "Comprehensive" | "Third Party" | "Third Party Fire & Theft";
  vehicle: Vehicle;
  renewalDate: string;
  startDate: string;
  protectedNcd: boolean;
  voluntaryExcess: number;
  compulsoryExcess: number;
  limits: Limit[];
  coverSections: CoverSection[];
}

export const motorPolicy: MotorPolicy = {
  id: "POL-123456789",
  status: "Active",
  productName: "Lloyds Bank Car Insurance",
  coverType: "Comprehensive",
  vehicle: {
    nickname: "Ford Fiesta",
    registration: "AB12 CDE",
    year: 2019,
  },
  renewalDate: "2026-06-12",
  startDate: "2025-06-13",
  protectedNcd: true,
  voluntaryExcess: 250,
  compulsoryExcess: 150,
  limits: [
    { label: "Personal belongings cover", amount: "£250", per: "Per claim" },
    { label: "Audio / sat-nav equipment", amount: "£750", per: "Per claim" },
    { label: "Courtesy car", amount: "Up to 21 days", per: "Per claim" },
  ],
  coverSections: [
    {
      id: "accidental-damage",
      title: "Accidental damage",
      summary: "We'll repair or replace your car if it's accidentally damaged.",
      exclusions: [
        "Wear and tear or mechanical failure",
        "Damage while racing or on track days",
      ],
    },
    {
      id: "fire-theft",
      title: "Fire & theft",
      summary: "Cover if your car is stolen or damaged by fire.",
      exclusions: ["Belongings not locked away", "Keys left in the car"],
    },
    {
      id: "windscreen",
      title: "Windscreen cover",
      summary: "Repair or replacement if your windscreen is chipped or cracked.",
      exclusions: ["Non-approved repairers may have higher excess"],
    },
    {
      id: "courtesy-car",
      title: "Courtesy car",
      summary: "A replacement car while yours is being repaired after an accident.",
      exclusions: ["Not available for theft claims", "Subject to availability"],
    },
    {
      id: "driving-abroad",
      title: "Driving abroad",
      summary: "Cover for driving in EU countries and other specified territories.",
      exclusions: ["Cover limited to 90 days per trip", "Some countries excluded"],
    },
    {
      id: "breakdown-cover",
      title: "Breakdown cover",
      summary: "24/7 roadside assistance and recovery service.",
      exclusions: ["Not included in basic policy", "Home start may require upgrade"],
      isAddOn: true,
    },
  ],
};

