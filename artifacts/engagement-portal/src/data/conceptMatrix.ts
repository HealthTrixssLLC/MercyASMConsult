// AUTO-GENERATED from Mercy_ASM_Health_Plan_Layout_Concept_Matrix_REVISED.xlsx
  // Source workbook sheets: Concept Matrix, Field Mapping, Notes & Legend.
  // To regenerate, see .agents/memory/office-file-parsing.md (unzip + parse XML).

  export const HP_COLUMNS = ["UHC","Humana","Global Health","Essence","BCBSOK / EDPS","Anthem","Aetna"] as const;

  export const CROSSWALK_TITLE = "Revised Health Plan Layout Concept Crosswalk";

  export type ConceptStatus = "present" | "situational" | "absent" | "confirm";

  export type MatrixRow = {
    category: string;
    concept: string;
    definition: string;
    status: ConceptStatus[];
    notes: string;
  };

  export const CONCEPT_MATRIX: MatrixRow[] = [
  {
    "category": "Submission / File",
    "concept": "Submitter / Vendor Identifier",
    "definition": "Payer-assigned submitter/vendor abbreviation or entity identifier.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "present",
      "absent"
    ],
    "notes": "Anthem formal job aid uses Vendor_Name; other payer SQL may not expose file naming metadata."
  },
  {
    "category": "Submission / File",
    "concept": "Sent / File Creation Date",
    "definition": "Date file is generated or sent to payer.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "present",
      "absent"
    ],
    "notes": "Global Health and Anthem include Sent_Date / sent_Date."
  },
  {
    "category": "Submission / File",
    "concept": "Record / Segment Type",
    "definition": "Row type indicator such as DTL, CR, D, or equivalent.",
    "status": [
      "present",
      "absent",
      "absent",
      "absent",
      "present",
      "absent",
      "present"
    ],
    "notes": "Do not merge with claim type; this describes record structure."
  },
  {
    "category": "Submission / File",
    "concept": "Claim Type / Claim Indicator",
    "definition": "Professional, inpatient, outpatient, institutional, ambulatory, or claim-type indicator.",
    "status": [
      "present",
      "present",
      "present",
      "absent",
      "absent",
      "present",
      "present"
    ],
    "notes": "Separate from bill type/POS."
  },
  {
    "category": "Submission / File",
    "concept": "ICD Level / ICD Indicator",
    "definition": "Indicates ICD-9 vs ICD-10 coding or ICD indicator.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "absent",
      "present",
      "absent"
    ],
    "notes": "Anthem uses ICD_Level; Global Health IDC_Level; UHC ICD_INDIC."
  },
  {
    "category": "Submission / File",
    "concept": "Supplemental / Chart Review Type",
    "definition": "Identifies supplemental/chart review record type.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "present",
      "absent",
      "present"
    ],
    "notes": "BCBSOK uses CR; Aetna uses Supplemental_type."
  },
  {
    "category": "Submission / File",
    "concept": "End of Record Marker",
    "definition": "Explicit end-of-record delimiter or marker.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "present"
    ],
    "notes": "Aetna uses End_of_Rec."
  },
  {
    "category": "Identifiers",
    "concept": "Encounter ID",
    "definition": "Clinical encounter/account-level unique identifier.",
    "status": [
      "absent",
      "present",
      "present",
      "absent",
      "present",
      "present",
      "present"
    ],
    "notes": "Not the same as claim ID or invoice/reference number."
  },
  {
    "category": "Identifiers",
    "concept": "Reference / Invoice Number",
    "definition": "Payer or extract reference such as REF# or invoice number used for file row tracking.",
    "status": [
      "present",
      "absent",
      "present",
      "present",
      "present",
      "present",
      "present"
    ],
    "notes": "Used differently by payer; preserve original field mapping."
  },
  {
    "category": "Identifiers",
    "concept": "Claim / Patient Control Number",
    "definition": "Claim ID, patient control number, or claim-level identifier submitted to payer.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "present",
      "absent",
      "situational"
    ],
    "notes": "Aetna includes plan/original claim identifiers; UHC has CLAIMID PCN."
  },
  {
    "category": "Identifiers",
    "concept": "CMS ICN",
    "definition": "CMS internal control number when available.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "present",
      "absent",
      "absent"
    ],
    "notes": "Keep separate from MBI/HICN and claim ID."
  },
  {
    "category": "Identifiers",
    "concept": "Chart Review Reference / Chart Keys",
    "definition": "Chart barcode, encounter key, diagnosis key, or chart review reference identifier.",
    "status": [
      "present",
      "absent",
      "absent",
      "absent",
      "present",
      "absent",
      "absent"
    ],
    "notes": "UHC has chart fields; BCBSOK has ChartReviewReferenceId."
  },
  {
    "category": "Identifiers",
    "concept": "Original / Prior Record Identifier",
    "definition": "Identifier for prior/original submitted record for correction/delete workflows.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "present"
    ],
    "notes": "Aetna has original_record_id/original_plan_claim_id."
  },
  {
    "category": "Member",
    "concept": "Member Health Plan ID",
    "definition": "Health plan member ID/subscriber ID.",
    "status": [
      "present",
      "present",
      "present",
      "present",
      "present",
      "present",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Member",
    "concept": "Member CMS ID / MBI / HICN",
    "definition": "CMS-assigned member identifier, MBI or HICN.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "present",
      "situational",
      "present"
    ],
    "notes": "Anthem marks situational; can populate from plan ID if valid."
  },
  {
    "category": "Member",
    "concept": "Plan / Contract ID",
    "definition": "Plan ID, CMS contract, contract/site number, or payer plan grouping.",
    "status": [
      "present",
      "absent",
      "absent",
      "absent",
      "present",
      "situational",
      "situational"
    ],
    "notes": "Do not merge with member ID."
  },
  {
    "category": "Member",
    "concept": "Member Name - Last",
    "definition": "Member last name.",
    "status": [
      "present",
      "present",
      "present",
      "present",
      "present",
      "present",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Member",
    "concept": "Member Name - First",
    "definition": "Member first name.",
    "status": [
      "present",
      "present",
      "present",
      "present",
      "present",
      "present",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Member",
    "concept": "Member Middle Initial / Middle Name",
    "definition": "Member middle initial/name.",
    "status": [
      "present",
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "situational"
    ],
    "notes": ""
  },
  {
    "category": "Member",
    "concept": "Member Name Suffix",
    "definition": "Member name suffix.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "situational"
    ],
    "notes": ""
  },
  {
    "category": "Member",
    "concept": "Member Date of Birth",
    "definition": "Member date of birth.",
    "status": [
      "present",
      "present",
      "present",
      "present",
      "present",
      "present",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Member",
    "concept": "Member Gender",
    "definition": "Member sex/gender code.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "present",
      "present",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Member",
    "concept": "Member Address Line 1",
    "definition": "Member street address line 1.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "present",
      "situational",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Member",
    "concept": "Member Address Line 2",
    "definition": "Member street address line 2.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "absent",
      "situational",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Member",
    "concept": "Member City",
    "definition": "Member city.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "present",
      "situational",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Member",
    "concept": "Member State",
    "definition": "Member state.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "present",
      "situational",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Member",
    "concept": "Member ZIP",
    "definition": "Member ZIP / ZIP+4.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "present",
      "situational",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Member",
    "concept": "Member County / Country / Group",
    "definition": "Additional member geography/group fields.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "situational"
    ],
    "notes": "Aetna-specific optional/blank fields."
  },
  {
    "category": "Provider",
    "concept": "Billing Provider NPI",
    "definition": "Billing provider NPI.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "present",
      "present",
      "present"
    ],
    "notes": "Keep separate from rendering/attending NPI."
  },
  {
    "category": "Provider",
    "concept": "Rendering / Attending Provider NPI",
    "definition": "Rendering provider NPI for professional or attending provider NPI for institutional.",
    "status": [
      "present",
      "present",
      "present",
      "present",
      "absent",
      "present",
      "present"
    ],
    "notes": "Anthem Provider_ID_Internal is not same as Provider_NPI."
  },
  {
    "category": "Provider",
    "concept": "Retrieval NPI",
    "definition": "Retrieval NPI or chart retrieval provider identifier.",
    "status": [
      "present",
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "absent"
    ],
    "notes": "UHC-specific."
  },
  {
    "category": "Provider",
    "concept": "Provider Tax ID",
    "definition": "Provider tax identification number.",
    "status": [
      "present",
      "present",
      "present",
      "absent",
      "present",
      "present",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Provider",
    "concept": "Provider Taxonomy Code",
    "definition": "Provider taxonomy classification code.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "present",
      "absent",
      "situational"
    ],
    "notes": "Aetna has rendering taxonomy-related fields."
  },
  {
    "category": "Provider",
    "concept": "Provider Specialty Code",
    "definition": "CMS/payer provider specialty code.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "absent",
      "absent",
      "absent"
    ],
    "notes": "Specialty mapping should remain a controlled reference table."
  },
  {
    "category": "Provider",
    "concept": "Provider Type",
    "definition": "Provider type/category such as P/I, INPT/OUTP, professional/institutional.",
    "status": [
      "present",
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Provider",
    "concept": "Provider / Facility Name - Last or Organization",
    "definition": "Provider last name, organization, or facility name depending on claim type.",
    "status": [
      "present",
      "absent",
      "present",
      "present",
      "present",
      "present",
      "present"
    ],
    "notes": "Do not merge with health plan name."
  },
  {
    "category": "Provider",
    "concept": "Provider Name - First",
    "definition": "Provider first name where applicable.",
    "status": [
      "present",
      "absent",
      "present",
      "present",
      "absent",
      "situational",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Provider",
    "concept": "Facility Name",
    "definition": "Facility name when separately populated.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "absent",
      "present",
      "present"
    ],
    "notes": "Sometimes same field as Provider_Name_Last_Facility_Name; mapping sheet clarifies."
  },
  {
    "category": "Provider",
    "concept": "Provider Statutory / Internal ID",
    "definition": "State license, Medicare hospital number, internal provider ID, or plan provider ID.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "absent",
      "situational",
      "situational"
    ],
    "notes": ""
  },
  {
    "category": "Provider",
    "concept": "Provider Address Line 1",
    "definition": "Provider/billing provider street address line 1.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "present",
      "situational",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Provider",
    "concept": "Provider Address Line 2",
    "definition": "Provider/billing provider street address line 2.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "situational",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Provider",
    "concept": "Provider City",
    "definition": "Provider/billing provider city.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "present",
      "situational",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Provider",
    "concept": "Provider State",
    "definition": "Provider/billing provider state.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "present",
      "situational",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Provider",
    "concept": "Provider ZIP",
    "definition": "Provider/billing provider ZIP / ZIP+4.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "present",
      "situational",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Provider",
    "concept": "Provider Phone / Credentials",
    "definition": "Provider credential, phone, oversight, or additional provider details.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "situational"
    ],
    "notes": "Primarily Aetna optional fields."
  },
  {
    "category": "Service / Claim",
    "concept": "Date of Service From",
    "definition": "Start date of service.",
    "status": [
      "present",
      "present",
      "present",
      "present",
      "present",
      "present",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Date of Service Through",
    "definition": "End date of service.",
    "status": [
      "present",
      "present",
      "present",
      "present",
      "present",
      "present",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Bill Type / Type of Bill",
    "definition": "Institutional bill type or type of bill.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "present",
      "present",
      "absent"
    ],
    "notes": "Do not merge with POS for professional claims unless payer uses same concept field."
  },
  {
    "category": "Service / Claim",
    "concept": "Place of Service",
    "definition": "Professional place of service code.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "present",
      "present",
      "absent"
    ],
    "notes": "For Anthem, Type_of_Bill carries POS for professional records."
  },
  {
    "category": "Service / Claim",
    "concept": "Revenue Code",
    "definition": "Revenue code for institutional/outpatient records.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "present",
      "present",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Procedure Code Type",
    "definition": "Procedure code set qualifier, e.g., HC or HP.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "situational",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Procedure / CPT / HCPCS Code",
    "definition": "CPT/HCPCS/procedure code.",
    "status": [
      "present",
      "absent",
      "present",
      "absent",
      "present",
      "situational",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Procedure Modifier",
    "definition": "Procedure modifier.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "situational",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Frequency Code",
    "definition": "Bill frequency/frequency code.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "present",
      "absent",
      "absent"
    ],
    "notes": "BCBSOK-specific."
  },
  {
    "category": "Service / Claim",
    "concept": "Patient Type",
    "definition": "Patient type classification.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "present",
      "absent",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Admission Type",
    "definition": "Admission type code.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "present",
      "situational",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Admission Source",
    "definition": "Admission source code.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "present",
      "situational",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Patient Status / Discharge Disposition",
    "definition": "Patient status/discharge disposition code.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "present",
      "situational",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Inpatient Discharge Time",
    "definition": "Time of inpatient discharge.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "situational",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Line Charge",
    "definition": "Line charge amount.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "present",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Line Units Type",
    "definition": "Line unit type such as UN, DA, MJ.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "present",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Line Units",
    "definition": "Line units quantity.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "present",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Provider Signature on File",
    "definition": "Provider signature on file indicator.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "situational",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Provider Accepts Assignment",
    "definition": "Assignment/participating agreement indicator.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "present",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Benefits Assigned",
    "definition": "Benefits assigned indicator.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "present",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Release of Information Indicator",
    "definition": "Release of information / PHI authorization indicator.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "present",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Patient Amount to Pay",
    "definition": "Patient amount to pay.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "present",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Service / Claim",
    "concept": "Emergency Basis Indicator",
    "definition": "Service provided on emergency basis indicator.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "situational",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Diagnosis",
    "concept": "Primary / Principal Diagnosis",
    "definition": "Primary/principal diagnosis field.",
    "status": [
      "present",
      "present",
      "present",
      "absent",
      "present",
      "present",
      "present"
    ],
    "notes": "Essence uses one diagnosis per row rather than primary/other split."
  },
  {
    "category": "Diagnosis",
    "concept": "Admitting Diagnosis",
    "definition": "Admitting diagnosis.",
    "status": [
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "situational",
      "absent"
    ],
    "notes": ""
  },
  {
    "category": "Diagnosis",
    "concept": "Other / Additional Diagnosis Codes",
    "definition": "Additional diagnosis positions or repeated diagnosis rows.",
    "status": [
      "present",
      "present",
      "present",
      "present",
      "present",
      "present",
      "present"
    ],
    "notes": "Different max counts: UHC up to 40 per row; Anthem/GH up to 24; Aetna up to 30; Essence repeated rows."
  },
  {
    "category": "Diagnosis",
    "concept": "Diagnosis Type / Qualifier",
    "definition": "Diagnosis qualifier/type, such as ICD diagnosis type or ABF/10 qualifiers.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "present",
      "absent",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Diagnosis",
    "concept": "POA Indicator - Primary",
    "definition": "Present-on-admission indicator for primary diagnosis.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "situational",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Diagnosis",
    "concept": "POA Indicator - Other Diagnoses",
    "definition": "Present-on-admission indicators for other diagnoses.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "situational",
      "present"
    ],
    "notes": ""
  },
  {
    "category": "Diagnosis",
    "concept": "Delete Diagnosis Flag",
    "definition": "Indicates diagnosis deletion/removal.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "situational"
    ],
    "notes": "Aetna delete diagnosis fields; Anthem separate delete file naming."
  },
  {
    "category": "Diagnosis",
    "concept": "Risk Adjustment Indicator per Diagnosis",
    "definition": "Diagnosis-level RA flag/indicator.",
    "status": [
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "situational"
    ],
    "notes": "Aetna RA1-RA30 fields."
  },
  {
    "category": "Diagnosis",
    "concept": "Status Code",
    "definition": "Diagnosis/record status code.",
    "status": [
      "absent",
      "absent",
      "absent",
      "present",
      "absent",
      "absent",
      "absent"
    ],
    "notes": "Essence status_code."
  }
];

  export type MappingRow = { concept: string; fields: string[] };

  export const FIELD_MAPPING: MappingRow[] = [
  {
    "concept": "Member Health Plan ID",
    "fields": [
      "Plan ID / cvg.subscr_num",
      "UMID",
      "Member_ID_Health_Plan",
      "member_nbr",
      "Member_ID",
      "Member_ID_Health_Plan",
      "Member_ID"
    ]
  },
  {
    "concept": "Member CMS ID / MBI / HICN",
    "fields": [
      "MBI- need either member ID or HIC",
      "",
      "Member_ID_CMS_HICN",
      "",
      "HICN",
      "Member_ID_CMS_HICN",
      "HICN"
    ]
  },
  {
    "concept": "Billing Provider NPI",
    "fields": [
      "NPI / bil_prov_npi",
      "",
      "Provider_NPI",
      "",
      "BillingProviderNPI",
      "Provider_NPI",
      "Provider_NPI"
    ]
  },
  {
    "concept": "Rendering / Attending Provider NPI",
    "fields": [
      "attending/rendering provider fields",
      "RENDERING_PROVIDER_NPI",
      "Provider_NPI / attending",
      "provider_NPI",
      "",
      "Provider_ID_Internal",
      "Provider_NPI / rendering"
    ]
  },
  {
    "concept": "Provider Tax ID",
    "fields": [
      "TAX_ID",
      "BILLING_PROVIDER_TAX_ID_NUMBER",
      "Provider_Tax_ID",
      "",
      "BillingProviderTaxId",
      "Provider_Tax_ID",
      "provider_tax_id"
    ]
  },
  {
    "concept": "Date of Service From",
    "fields": [
      "FDOS",
      "DOS_FROM",
      "Date_of_Service_From",
      "from_date",
      "DOS_FROM",
      "Date_of_Service_From",
      "Date_of_Service_From"
    ]
  },
  {
    "concept": "Date of Service Through",
    "fields": [
      "TDOS",
      "DOS_THROUGH",
      "Date_of_Service_Thru",
      "thru_date",
      "DOS_Through",
      "Date_of_Service_Thru",
      "Date_of_Service_Thru"
    ]
  },
  {
    "concept": "Bill Type / Type of Bill",
    "fields": [
      "BILL_TYPE",
      "",
      "Bill_Type",
      "",
      "bill_type",
      "Type_of_Bill",
      ""
    ]
  },
  {
    "concept": "Procedure / CPT / HCPCS Code",
    "fields": [
      "CPT_CODE / CPT",
      "",
      "Procedure_Code",
      "",
      "ProcedureCode",
      "Procedure_Code",
      "cpt_code"
    ]
  },
  {
    "concept": "Revenue Code",
    "fields": [
      "REV_CODE",
      "",
      "Revenue_Code",
      "",
      "Revenue_Code",
      "Revenue_Code",
      "rev_code"
    ]
  },
  {
    "concept": "Primary / Principal Diagnosis",
    "fields": [
      "dx_1",
      "dx_1",
      "Diagnosis_Code_Primary",
      "",
      "dx_1",
      "Diagnosis_Code_Primary",
      "dx_1"
    ]
  },
  {
    "concept": "Other / Additional Diagnosis Codes",
    "fields": [
      "dx_2...dx_40",
      "dx_2...dx_24",
      "Diagnosis_Code_1...24",
      "diagnosis_code by repeated rows",
      "dx_2...dx_25/12",
      "Diagnosis_Code_Other1...24",
      "dx_2...dx_30"
    ]
  },
  {
    "concept": "Encounter ID",
    "fields": [
      "",
      "Encounter_ID",
      "Encounter_ID",
      "",
      "Encounter_ID",
      "Encounter_ID",
      "Encounter_ID"
    ]
  },
  {
    "concept": "Claim / Patient Control Number",
    "fields": [
      "CLAIMID PCN",
      "",
      "patient_account_number",
      "",
      "claim_id_a",
      "",
      "plan_claim_number / Patient_account_num"
    ]
  },
  {
    "concept": "Provider / Facility Name - Last or Organization",
    "fields": [
      "FACILITY_NM / provider last",
      "",
      "Facility_Name",
      "provider_last_name",
      "prov_name / last_name",
      "Provider_Name_Last_Facility_Name",
      "rend_Prov_Last / provider org"
    ]
  }
];

  export type LegendItem = { symbol: string; meaning: string; use: string };

  export const LEGEND: LegendItem[] = [
  {
    "symbol": "☑",
    "meaning": "Required / present in provided layout artifact",
    "use": "Use when the field/concept appears as part of the submitted payer layout or formal spec indicates required."
  },
  {
    "symbol": "△",
    "meaning": "Situational / optional / conditional",
    "use": "Use when formal spec marks as situational/optional or applicability depends on claim type."
  },
  {
    "symbol": "☒",
    "meaning": "Not required / not present in provided artifact",
    "use": "Use when the concept is not represented in the payer artifact reviewed."
  },
  {
    "symbol": "?",
    "meaning": "Needs confirmation",
    "use": "Use when the artifact is SQL/template only or requirement status cannot be proven from provided files."
  }
];

  export const REVISION_PRINCIPLE = "Concepts are merged only when the business meaning is the same. Fields with similar names but different roles are kept separate, e.g., Billing Provider NPI vs Rendering/Attending Provider NPI; Encounter ID vs Claim/Patient Control Number vs CMS ICN.";

  export const SOURCE_NOTE = "Where a payer artifact is a SQL extract or template rather than a formal required/optional specification, ☑ indicates that the concept is present in the provided layout logic, not that the payer spec independently confirmed it as required.";
  