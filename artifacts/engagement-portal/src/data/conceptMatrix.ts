// AUTO-GENERATED from Mercy_ASM_Health_Plan_Layout_Concept_Matrix.xlsx
  // Source workbook sheets: Concept Matrix, Source Field Mapping, Input Artifacts, Summary, Notes.
  // To regenerate, see .agents/memory/office-file-parsing.md (unzip + parse XML).

  export const HP_COLUMNS = ["UHC","Humana","Global Health","Essence","BCBSOK / EDPS","Anthem","Aetna"] as const;

  export const MATRIX_LEGEND = "Legend: ☑ = required / present in the provided payer layout; ☒ = not required / not found in the provided layout. For UHC and Humana templates, all visible template columns were treated as required layout columns because no separate required flag was provided.";

  export type MatrixRow = {
    concept: string;
    canonical: string;
    category: string;
    present: boolean[];
  };

  export const CONCEPT_MATRIX: MatrixRow[] = [
  {
    "concept": "File / Record Type",
    "canonical": "record_type",
    "category": "File / Control",
    "present": [
      true,
      false,
      false,
      false,
      true,
      false,
      true
    ]
  },
  {
    "concept": "Vendor / Submitter Name",
    "canonical": "submitter_or_health_plan_name",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      true,
      false
    ]
  },
  {
    "concept": "File Sent Date",
    "canonical": "sent_date",
    "category": "File / Control",
    "present": [
      false,
      false,
      true,
      false,
      true,
      true,
      false
    ]
  },
  {
    "concept": "Claim Type",
    "canonical": "claim_type",
    "category": "File / Control",
    "present": [
      false,
      true,
      true,
      false,
      false,
      true,
      true
    ]
  },
  {
    "concept": "Risk Assessment Code",
    "canonical": "risk_assessment_code",
    "category": "File / Control",
    "present": [
      true,
      false,
      false,
      false,
      false,
      false,
      true
    ]
  },
  {
    "concept": "Supplemental / Chart Review Type",
    "canonical": "supplemental_type",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      true
    ]
  },
  {
    "concept": "Unique Encounter / Reference ID",
    "canonical": "encounter_or_submission_record_id",
    "category": "File / Control",
    "present": [
      true,
      false,
      true,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Billingprovideraddress",
    "canonical": "billingprovideraddress",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Billingproviderlastname",
    "canonical": "billingproviderlastname",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Billingproviderzipcode",
    "canonical": "billingproviderzipcode",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Fielddelimiter",
    "canonical": "fielddelimiter",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Formatversion",
    "canonical": "formatversion",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "N U Indicator",
    "canonical": "n_u_indicator",
    "category": "File / Control",
    "present": [
      true,
      false,
      false,
      false,
      false,
      false,
      false
    ]
  },
  {
    "concept": "Payerplanaddress",
    "canonical": "payerplanaddress",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Payerplanname",
    "canonical": "payerplanname",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Payerplantype",
    "canonical": "payerplantype",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Payerplanzipcode",
    "canonical": "payerplanzipcode",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Planid",
    "canonical": "planid",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Record Id",
    "canonical": "record_id",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      false,
      false,
      true
    ]
  },
  {
    "concept": "Recordinitiator",
    "canonical": "recordinitiator",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Service End Date",
    "canonical": "service_end_date",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      false,
      false,
      true
    ]
  },
  {
    "concept": "Service Start Date",
    "canonical": "service_start_date",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      false,
      false,
      true
    ]
  },
  {
    "concept": "Serviceenddate",
    "canonical": "serviceenddate",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Servicestartdate",
    "canonical": "servicestartdate",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Testorprodindicator",
    "canonical": "testorprodindicator",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Wiprocustomerid",
    "canonical": "wiprocustomerid",
    "category": "File / Control",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Member Health Plan ID",
    "canonical": "member_health_plan_id",
    "category": "Member",
    "present": [
      true,
      true,
      true,
      true,
      false,
      true,
      true
    ]
  },
  {
    "concept": "Member CMS ID / MBI / HICN",
    "canonical": "member_mbi_hicn",
    "category": "Member",
    "present": [
      true,
      false,
      false,
      false,
      true,
      false,
      true
    ]
  },
  {
    "concept": "Member CMS Contract / Site / State Code",
    "canonical": "member_contract_or_site_code",
    "category": "Member",
    "present": [
      true,
      false,
      true,
      false,
      false,
      false,
      false
    ]
  },
  {
    "concept": "Member Last Name",
    "canonical": "member_last_name",
    "category": "Member",
    "present": [
      true,
      false,
      true,
      true,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Member First Name",
    "canonical": "member_first_name",
    "category": "Member",
    "present": [
      true,
      false,
      true,
      true,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Member Middle Name / Initial / Suffix",
    "canonical": "member_middle_or_suffix",
    "category": "Member",
    "present": [
      true,
      false,
      false,
      true,
      false,
      false,
      false
    ]
  },
  {
    "concept": "Member Date of Birth",
    "canonical": "member_dob",
    "category": "Member",
    "present": [
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ]
  },
  {
    "concept": "Member Gender",
    "canonical": "member_gender",
    "category": "Member",
    "present": [
      true,
      false,
      true,
      false,
      true,
      true,
      false
    ]
  },
  {
    "concept": "Member Address Line 1",
    "canonical": "member_address_1",
    "category": "Member",
    "present": [
      true,
      false,
      true,
      false,
      false,
      false,
      false
    ]
  },
  {
    "concept": "Member Address Line 2",
    "canonical": "member_address_2",
    "category": "Member",
    "present": [
      true,
      false,
      false,
      false,
      false,
      false,
      false
    ]
  },
  {
    "concept": "Member City",
    "canonical": "member_city",
    "category": "Member",
    "present": [
      true,
      false,
      true,
      false,
      false,
      false,
      false
    ]
  },
  {
    "concept": "Member State",
    "canonical": "member_state",
    "category": "Member",
    "present": [
      true,
      false,
      false,
      false,
      false,
      false,
      false
    ]
  },
  {
    "concept": "Member ZIP Code",
    "canonical": "member_zip",
    "category": "Member",
    "present": [
      true,
      false,
      true,
      false,
      false,
      false,
      false
    ]
  },
  {
    "concept": "Memberaddress",
    "canonical": "memberaddress",
    "category": "Member",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Memberfirstname",
    "canonical": "memberfirstname",
    "category": "Member",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Memberid",
    "canonical": "memberid",
    "category": "Member",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Memberlastname",
    "canonical": "memberlastname",
    "category": "Member",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Provider NPI",
    "canonical": "provider_npi",
    "category": "Provider",
    "present": [
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ]
  },
  {
    "concept": "Rendering / Attending Provider NPI",
    "canonical": "rendering_attending_provider_npi",
    "category": "Provider",
    "present": [
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Provider Tax ID",
    "canonical": "provider_tax_id",
    "category": "Provider",
    "present": [
      true,
      true,
      true,
      false,
      true,
      true,
      false
    ]
  },
  {
    "concept": "Provider Taxonomy / Specialty",
    "canonical": "provider_taxonomy_or_specialty",
    "category": "Provider",
    "present": [
      true,
      false,
      true,
      false,
      false,
      false,
      false
    ]
  },
  {
    "concept": "Provider Type",
    "canonical": "provider_type",
    "category": "Provider",
    "present": [
      true,
      false,
      false,
      false,
      false,
      false,
      true
    ]
  },
  {
    "concept": "Provider Last / Facility Name",
    "canonical": "provider_last_or_facility_name",
    "category": "Provider",
    "present": [
      true,
      false,
      true,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Provider First Name",
    "canonical": "provider_first_name",
    "category": "Provider",
    "present": [
      false,
      false,
      true,
      false,
      false,
      false,
      false
    ]
  },
  {
    "concept": "Provider ID / Statutory / Internal",
    "canonical": "provider_internal_or_statutory_id",
    "category": "Provider",
    "present": [
      true,
      false,
      false,
      true,
      false,
      false,
      false
    ]
  },
  {
    "concept": "Provider Address Line 1",
    "canonical": "provider_address_1",
    "category": "Provider",
    "present": [
      false,
      false,
      true,
      false,
      false,
      false,
      false
    ]
  },
  {
    "concept": "Provider City",
    "canonical": "provider_city",
    "category": "Provider",
    "present": [
      false,
      false,
      true,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Provider State",
    "canonical": "provider_state",
    "category": "Provider",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Provider ZIP Code",
    "canonical": "provider_zip",
    "category": "Provider",
    "present": [
      false,
      false,
      true,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Provider Signature on File",
    "canonical": "provider_signature_on_file",
    "category": "Provider",
    "present": [
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Provider Accepts Assignment",
    "canonical": "provider_accepts_assignment",
    "category": "Provider",
    "present": [
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Date of Service From",
    "canonical": "dos_from",
    "category": "Service / Encounter",
    "present": [
      true,
      true,
      true,
      true,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Date of Service Through",
    "canonical": "dos_through",
    "category": "Service / Encounter",
    "present": [
      true,
      true,
      true,
      true,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Bill Type / Type of Bill",
    "canonical": "type_of_bill",
    "category": "Service / Encounter",
    "present": [
      true,
      false,
      true,
      false,
      false,
      true,
      true
    ]
  },
  {
    "concept": "Frequency Code",
    "canonical": "frequency_code",
    "category": "Service / Encounter",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Place of Service",
    "canonical": "place_of_service",
    "category": "Service / Encounter",
    "present": [
      true,
      false,
      true,
      false,
      false,
      false,
      false
    ]
  },
  {
    "concept": "CPT / HCPCS / Procedure Code",
    "canonical": "procedure_code",
    "category": "Service / Encounter",
    "present": [
      true,
      false,
      true,
      false,
      false,
      true,
      true
    ]
  },
  {
    "concept": "Procedure Code Type / Qualifier",
    "canonical": "procedure_code_type",
    "category": "Service / Encounter",
    "present": [
      false,
      false,
      true,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Revenue Code",
    "canonical": "revenue_code",
    "category": "Service / Encounter",
    "present": [
      true,
      false,
      true,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Line Charge",
    "canonical": "line_charge",
    "category": "Service / Encounter",
    "present": [
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Line Units Type",
    "canonical": "line_units_type",
    "category": "Service / Encounter",
    "present": [
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Line Units",
    "canonical": "line_units",
    "category": "Service / Encounter",
    "present": [
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Patient Status Code",
    "canonical": "patient_status_code",
    "category": "Service / Encounter",
    "present": [
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Patient Amount to Pay",
    "canonical": "patient_amount_to_pay",
    "category": "Service / Encounter",
    "present": [
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "ICD Level / ICD Indicator",
    "canonical": "icd_level",
    "category": "Diagnosis",
    "present": [
      true,
      false,
      true,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Diagnosis Code - Primary / Principal",
    "canonical": "primary_diagnosis_code",
    "category": "Diagnosis",
    "present": [
      false,
      true,
      true,
      true,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Diagnosis Codes - Other / Additional",
    "canonical": "diagnosis_code",
    "category": "Diagnosis",
    "present": [
      true,
      true,
      false,
      false,
      false,
      false,
      true
    ]
  },
  {
    "concept": "Admitting Diagnosis",
    "canonical": "admitting_diagnosis_code",
    "category": "Diagnosis",
    "present": [
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "External Cause Diagnosis",
    "canonical": "external_cause_diagnosis_code",
    "category": "Diagnosis",
    "present": [
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Add/Delete Diagnosis Indicator",
    "canonical": "diagnosis_add_delete_indicator",
    "category": "Diagnosis",
    "present": [
      false,
      false,
      true,
      false,
      false,
      false,
      false
    ]
  },
  {
    "concept": "Chart Barcode / Encounter / Diagnosis Key",
    "canonical": "chart_tracking_key",
    "category": "Diagnosis",
    "present": [
      true,
      false,
      false,
      false,
      false,
      false,
      false
    ]
  },
  {
    "concept": "Diagnosiscode 1",
    "canonical": "diagnosiscode_1",
    "category": "Diagnosis",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Diagnosiscodetype 1",
    "canonical": "diagnosiscodetype_1",
    "category": "Diagnosis",
    "present": [
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]
  },
  {
    "concept": "Benefits Assigned",
    "canonical": "benefits_are_assigned",
    "category": "Administrative / Attestation",
    "present": [
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Release of Information Indicator",
    "canonical": "release_of_info_indicator",
    "category": "Administrative / Attestation",
    "present": [
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]
  },
  {
    "concept": "Status Code",
    "canonical": "status_code",
    "category": "Administrative / Attestation",
    "present": [
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ]
  },
  {
    "concept": "End of Record / Record Delimiter",
    "canonical": "end_of_record_delimiter",
    "category": "Administrative / Attestation",
    "present": [
      false,
      false,
      false,
      false,
      false,
      false,
      true
    ]
  }
];

  export type SummaryMetric = { metric: string; values: string[] };
  export const SUMMARY_METRICS: SummaryMetric[] = [
  {
    "metric": "Required Concept Count",
    "values": [
      "32",
      "9",
      "30",
      "11",
      "34",
      "32",
      "16"
    ]
  },
  {
    "metric": "Total Extracted Fields",
    "values": [
      "65",
      "31",
      "80",
      "13",
      "100",
      "130",
      "236"
    ]
  }
];
  export const CONCEPTS_REQUIRED_IN_ALL = "2";
  export const COMMON_CONCEPTS = ["Member Date of Birth","Provider NPI"];

  export type InputArtifact = { plan: string; artifacts: string; interpretation: string };
  export const INPUT_ARTIFACTS: InputArtifact[] = [
  {
    "plan": "UHC",
    "artifacts": "UHC Template.csv / UHC Template.xlsx; UHC INST/AMB SQL",
    "interpretation": "Visible template columns treated as required layout columns."
  },
  {
    "plan": "Humana",
    "artifacts": "Humana ASM Template New 2026.xlsx; Humana SQL",
    "interpretation": "Input File headers treated as required layout columns."
  },
  {
    "plan": "Global Health",
    "artifacts": "Global Health File Layout Requirements for IPA 12.05.2024.xlsx; GH SQL",
    "interpretation": "Requirements sheet REQUIRED = Y treated as required."
  },
  {
    "plan": "Essence",
    "artifacts": "Essence Additional Dx Spec workbook; Essence SQL",
    "interpretation": "File Specification & Layout REQUIRED = Yes treated as required."
  },
  {
    "plan": "BCBSOK / EDPS",
    "artifacts": "EDPS Institutional Spec Wipro workbook; BCBSOK SQL",
    "interpretation": "HDR/CR/DGS/TLR fields marked Required treated as required."
  },
  {
    "plan": "Anthem",
    "artifacts": "2024 MARA SDF Job Aid MRCYMO and MHSC; Anthem SQL",
    "interpretation": "Fields with P/I/O flag = R in either job aid treated as required."
  },
  {
    "plan": "Aetna",
    "artifacts": "Aetna Verscend Supplemental Data layout workbook; Aetna SQL",
    "interpretation": "DetailRecord rows with Req = R treated as required."
  }
];

  export type MatrixNote = { assumption: string; description: string };
  export const MATRIX_NOTES: MatrixNote[] = [
  {
    "assumption": "Meaning of checkmark",
    "description": "☑ indicates the concept is required / present in the provided health plan layout based on explicit required flags where available."
  },
  {
    "assumption": "Meaning of cross",
    "description": "☒ indicates the concept was not identified as required / present in the provided layout."
  },
  {
    "assumption": "UHC and Humana interpretation",
    "description": "The UHC and Humana files provided were templates rather than full field-specification workbooks with required/optional flags; visible template columns were treated as required layout columns."
  },
  {
    "assumption": "Concept consolidation",
    "description": "Similar fields were grouped into consulting concepts to support a future Mercy-format canonical staged source. For exact source field names, use the Source Field Mapping sheet."
  },
  {
    "assumption": "Next refinement",
    "description": "Once final payer technical specs are confirmed, this matrix should be updated to distinguish Required, Optional/Situational, Not Applicable, and Defaulted fields."
  }
];

  export type MappingRow = { concept: string; category: string; sources: string[] };
  export const SOURCE_FIELD_MAPPING: MappingRow[] = [
  {
    "concept": "File / Record Type",
    "category": "File / Control",
    "sources": [
      "SEG TYPE",
      "",
      "",
      "",
      "FileType; RecordId",
      "",
      "Record Type"
    ]
  },
  {
    "concept": "Vendor / Submitter Name",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "PayerSubmitterId",
      "Vendor_Name",
      ""
    ]
  },
  {
    "concept": "File Sent Date",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "SENT_DATE",
      "",
      "FileDate",
      "Sent_Date",
      ""
    ]
  },
  {
    "concept": "Claim Type",
    "category": "File / Control",
    "sources": [
      "",
      "CLAIM TYPE",
      "CLAIM_TYPE",
      "",
      "",
      "Claim_Type",
      "Claim Indicator; Claim Type Indicator"
    ]
  },
  {
    "concept": "Risk Assessment Code",
    "category": "File / Control",
    "sources": [
      "RA Code- Required for Professional",
      "",
      "",
      "",
      "",
      "",
      "Risk Assessment Code Diagnosis 1"
    ]
  },
  {
    "concept": "Supplemental / Chart Review Type",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "ChartReviewId; ChartReview_Claim_Count",
      "",
      "Supplemental Type"
    ]
  },
  {
    "concept": "Unique Encounter / Reference ID",
    "category": "File / Control",
    "sources": [
      "CLAIMID/PCN; REF #",
      "",
      "ENCOUNTER_ID; PATIENT_ACCOUNT_NUMBER",
      "",
      "",
      "Encounter_ID; Patient_Account_Number",
      ""
    ]
  },
  {
    "concept": "Billingprovideraddress",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "BillingProviderAddress",
      "",
      ""
    ]
  },
  {
    "concept": "Billingproviderlastname",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "BillingProviderLastName",
      "",
      ""
    ]
  },
  {
    "concept": "Billingproviderzipcode",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "BillingProviderZipCode",
      "",
      ""
    ]
  },
  {
    "concept": "Fielddelimiter",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "FieldDelimiter",
      "",
      ""
    ]
  },
  {
    "concept": "Formatversion",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "FormatVersion",
      "",
      ""
    ]
  },
  {
    "concept": "N U Indicator",
    "category": "File / Control",
    "sources": [
      "N&U INDICATOR",
      "",
      "",
      "",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "Payerplanaddress",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "PayerPlanAddress",
      "",
      ""
    ]
  },
  {
    "concept": "Payerplanname",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "PayerPlanName",
      "",
      ""
    ]
  },
  {
    "concept": "Payerplantype",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "PayerPlanType",
      "",
      ""
    ]
  },
  {
    "concept": "Payerplanzipcode",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "PayerPlanZipCode",
      "",
      ""
    ]
  },
  {
    "concept": "Planid",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "PlanId",
      "",
      ""
    ]
  },
  {
    "concept": "Record Id",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "",
      "Record ID"
    ]
  },
  {
    "concept": "Recordinitiator",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "RecordInitiator",
      "",
      ""
    ]
  },
  {
    "concept": "Service End Date",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "",
      "Service End Date"
    ]
  },
  {
    "concept": "Service Start Date",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "",
      "Service Start Date"
    ]
  },
  {
    "concept": "Serviceenddate",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "ServiceEndDate",
      "",
      ""
    ]
  },
  {
    "concept": "Servicestartdate",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "ServiceStartDate",
      "",
      ""
    ]
  },
  {
    "concept": "Testorprodindicator",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "TestOrProdIndicator",
      "",
      ""
    ]
  },
  {
    "concept": "Wiprocustomerid",
    "category": "File / Control",
    "sources": [
      "",
      "",
      "",
      "",
      "WiproCustomerId",
      "",
      ""
    ]
  },
  {
    "concept": "Member Health Plan ID",
    "category": "Member",
    "sources": [
      "MEMBER ID",
      "UMID",
      "MEMBER_ID_CMS_HICN; MEMBER_ID_HEALTH_PLAN",
      "member_nbr",
      "",
      "Member_ID_Health_Plan",
      "Member ID"
    ]
  },
  {
    "concept": "Member CMS ID / MBI / HICN",
    "category": "Member",
    "sources": [
      "MEMBER/MBI",
      "",
      "",
      "",
      "MemberHICN",
      "",
      "MBI"
    ]
  },
  {
    "concept": "Member CMS Contract / Site / State Code",
    "category": "Member",
    "sources": [
      "Contract ID; STATE CODE",
      "",
      "MEMBER_STATE_CODE; PROVIDER_STATE_CODE",
      "",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "Member Last Name",
    "category": "Member",
    "sources": [
      "LAST NAME; PROVIDER LAST NAME",
      "",
      "MEMBER_NAME_LAST",
      "member_last_name; provider_last_name",
      "",
      "Member_Name_Last",
      ""
    ]
  },
  {
    "concept": "Member First Name",
    "category": "Member",
    "sources": [
      "FIRST NAME; PROVIDER FIRST NAME",
      "",
      "MEMBER_NAME_FIRST",
      "member_first_name; provider_first_name",
      "",
      "Member_Name_First",
      ""
    ]
  },
  {
    "concept": "Member Middle Name / Initial / Suffix",
    "category": "Member",
    "sources": [
      "MI",
      "",
      "",
      "member_nbr_sfx",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "Member Date of Birth",
    "category": "Member",
    "sources": [
      "DOB",
      "MEMBER DATE OF BIRTH",
      "MEMBER_DATE_OF_BIRTH",
      "member_dob",
      "MemberDOB",
      "Member_Date_of_Birth",
      "Member DOB"
    ]
  },
  {
    "concept": "Member Gender",
    "category": "Member",
    "sources": [
      "GENDER",
      "",
      "MEMBER_GENDER",
      "",
      "MemberGender",
      "Member_Gender",
      ""
    ]
  },
  {
    "concept": "Member Address Line 1",
    "category": "Member",
    "sources": [
      "Mem Street Address",
      "",
      "MEMBER_STREET_ADDRESS_1",
      "",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "Member Address Line 2",
    "category": "Member",
    "sources": [
      "Mem Address 2",
      "",
      "",
      "",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "Member City",
    "category": "Member",
    "sources": [
      "Mem City",
      "",
      "MEMBER_CITY",
      "",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "Member State",
    "category": "Member",
    "sources": [
      "Mem State",
      "",
      "",
      "",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "Member ZIP Code",
    "category": "Member",
    "sources": [
      "Mem Zip Code",
      "",
      "MEMBER_ZIP_CODE",
      "",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "Memberaddress",
    "category": "Member",
    "sources": [
      "",
      "",
      "",
      "",
      "MemberAddress",
      "",
      ""
    ]
  },
  {
    "concept": "Memberfirstname",
    "category": "Member",
    "sources": [
      "",
      "",
      "",
      "",
      "MemberFirstName",
      "",
      ""
    ]
  },
  {
    "concept": "Memberid",
    "category": "Member",
    "sources": [
      "",
      "",
      "",
      "",
      "MemberId",
      "",
      ""
    ]
  },
  {
    "concept": "Memberlastname",
    "category": "Member",
    "sources": [
      "",
      "",
      "",
      "",
      "MemberLastname",
      "",
      ""
    ]
  },
  {
    "concept": "Provider NPI",
    "category": "Provider",
    "sources": [
      "NPI NUMBER; RETRIEVAL NPI",
      "RENDERING PROVIDER NPI",
      "PROVIDER_NPI",
      "provider_npin",
      "BillingProviderNPI",
      "Provider_NPI",
      "Rendering Provider NPI"
    ]
  },
  {
    "concept": "Rendering / Attending Provider NPI",
    "category": "Provider",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "Provider_ID_Internal",
      ""
    ]
  },
  {
    "concept": "Provider Tax ID",
    "category": "Provider",
    "sources": [
      "TAX ID",
      "BILLING PROVIDER TAX ID NUMBER",
      "PROVIDER_TAX_ID",
      "",
      "BillingProviderTaxId",
      "Provider_Tax_ID",
      ""
    ]
  },
  {
    "concept": "Provider Taxonomy / Specialty",
    "category": "Provider",
    "sources": [
      "CMS SPECIALTY",
      "",
      "PROVIDER_SPECIALTY",
      "",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "Provider Type",
    "category": "Provider",
    "sources": [
      "PROV TYPE",
      "",
      "",
      "",
      "",
      "",
      "Provider Type"
    ]
  },
  {
    "concept": "Provider Last / Facility Name",
    "category": "Provider",
    "sources": [
      "FACILITY NAME",
      "",
      "PROVIDER_NAME_LAST",
      "",
      "",
      "Provider_Name_Last_Facility_Name",
      ""
    ]
  },
  {
    "concept": "Provider First Name",
    "category": "Provider",
    "sources": [
      "",
      "",
      "PROVIDER_NAME_FIRST",
      "",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "Provider ID / Statutory / Internal",
    "category": "Provider",
    "sources": [
      "PROV ID",
      "",
      "",
      "Essence_provider_number",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "Provider Address Line 1",
    "category": "Provider",
    "sources": [
      "",
      "",
      "PROVIDER_STREET_ADDRESS_1",
      "",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "Provider City",
    "category": "Provider",
    "sources": [
      "",
      "",
      "PROVIDER_CITY",
      "",
      "BillingProviderCity; MemberCity; PayerPlanCity",
      "",
      ""
    ]
  },
  {
    "concept": "Provider State",
    "category": "Provider",
    "sources": [
      "",
      "",
      "",
      "",
      "BillingProviderState; MemberState; PayerPlanState",
      "",
      ""
    ]
  },
  {
    "concept": "Provider ZIP Code",
    "category": "Provider",
    "sources": [
      "",
      "",
      "PROVIDER_ZIP_CODE",
      "",
      "MemberZip",
      "",
      ""
    ]
  },
  {
    "concept": "Provider Signature on File",
    "category": "Provider",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "Provider_Signature_on_File",
      ""
    ]
  },
  {
    "concept": "Provider Accepts Assignment",
    "category": "Provider",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "Provider_Accepts_Assignment",
      ""
    ]
  },
  {
    "concept": "Date of Service From",
    "category": "Service / Encounter",
    "sources": [
      "FROM DATE OF SERVICE; SERVICE FDOS",
      "DOS FROM",
      "DATE_OF_SERVICE_FROM",
      "from_date",
      "",
      "Date_of_Service_From",
      ""
    ]
  },
  {
    "concept": "Date of Service Through",
    "category": "Service / Encounter",
    "sources": [
      "SERVICE TDOS; TO DATE OF SERVICE",
      "DOS THROUGH",
      "DATE_OF_SERVICE_THRU",
      "thru_date",
      "",
      "Date_of_Service_Thru",
      ""
    ]
  },
  {
    "concept": "Bill Type / Type of Bill",
    "category": "Service / Encounter",
    "sources": [
      "BILL TYPE- Institutional Only",
      "",
      "TYPE_OF_BILL",
      "",
      "",
      "Type_of_Bill",
      "Place of Service Code / Bill Type"
    ]
  },
  {
    "concept": "Frequency Code",
    "category": "Service / Encounter",
    "sources": [
      "",
      "",
      "",
      "",
      "FrequencyCode",
      "",
      ""
    ]
  },
  {
    "concept": "Place of Service",
    "category": "Service / Encounter",
    "sources": [
      "POS",
      "",
      "PLACE_OF_SERVICE",
      "",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "CPT / HCPCS / Procedure Code",
    "category": "Service / Encounter",
    "sources": [
      "CPT",
      "",
      "PROCEDURE_CODE",
      "",
      "",
      "Procedure_Code",
      "Procedure Code"
    ]
  },
  {
    "concept": "Procedure Code Type / Qualifier",
    "category": "Service / Encounter",
    "sources": [
      "",
      "",
      "PROCEDURE_CODE_TYPE",
      "",
      "",
      "Procedure_Code_Type",
      ""
    ]
  },
  {
    "concept": "Revenue Code",
    "category": "Service / Encounter",
    "sources": [
      "REV CODE",
      "",
      "REVENUE_CODE",
      "",
      "",
      "Revenue_Code",
      ""
    ]
  },
  {
    "concept": "Line Charge",
    "category": "Service / Encounter",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "Inpatient_Discharge_Time; Line_Charge",
      ""
    ]
  },
  {
    "concept": "Line Units Type",
    "category": "Service / Encounter",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "Line_Units_Type",
      ""
    ]
  },
  {
    "concept": "Line Units",
    "category": "Service / Encounter",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "Line_Units",
      ""
    ]
  },
  {
    "concept": "Patient Status Code",
    "category": "Service / Encounter",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "Patient_Status_Code",
      ""
    ]
  },
  {
    "concept": "Patient Amount to Pay",
    "category": "Service / Encounter",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "Patient_Amount_to_Pay",
      ""
    ]
  },
  {
    "concept": "ICD Level / ICD Indicator",
    "category": "Diagnosis",
    "sources": [
      "ICD INDIC",
      "",
      "ICD_LEVEL",
      "",
      "",
      "ICD_Level",
      ""
    ]
  },
  {
    "concept": "Diagnosis Code - Primary / Principal",
    "category": "Diagnosis",
    "sources": [
      "",
      "ICD CODE 1",
      "DIAGNOSIS_CODE_PRIMARY",
      "diagnosis_code",
      "",
      "Diagnosis_Code_Primary",
      ""
    ]
  },
  {
    "concept": "Diagnosis Codes - Other / Additional",
    "category": "Diagnosis",
    "sources": [
      "DX1; DX10; DX11; DX12; DX13; DX14; DX15; DX16; DX17; DX18; DX19; DX2; DX20; DX21; DX22; DX23; DX24; DX25; DX3; DX4; DX5; DX6; DX7; DX8; DX9",
      "ICD CODE 10; ICD CODE 11; ICD CODE 12; ICD CODE 13; ICD CODE 14; ICD CODE 15; ICD CODE 16; ICD CODE 17; ICD CODE 18; ICD CODE 19; ICD CODE 2; ICD CODE 20; ICD CODE 21; ICD CODE 22; ICD CODE 23; ICD CODE 24; ICD CODE 3; ICD CODE 4; ICD CODE 5; ICD CODE 6; ICD CODE 7; ICD CODE 8; ICD CODE 9",
      "",
      "",
      "",
      "",
      "Diagnosis Code 1; Diagnosis Code 1 Qualifier"
    ]
  },
  {
    "concept": "Admitting Diagnosis",
    "category": "Diagnosis",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "Diagnosis_Code_Admitting",
      ""
    ]
  },
  {
    "concept": "External Cause Diagnosis",
    "category": "Diagnosis",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "Admission_Source_Code; Admission_Type_Code",
      ""
    ]
  },
  {
    "concept": "Add/Delete Diagnosis Indicator",
    "category": "Diagnosis",
    "sources": [
      "",
      "",
      "ADD_DELETE_IND",
      "",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "Chart Barcode / Encounter / Diagnosis Key",
    "category": "Diagnosis",
    "sources": [
      "Chart Barcode; Chart DX Key; Chart Enc Key",
      "",
      "",
      "",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "Diagnosiscode 1",
    "category": "Diagnosis",
    "sources": [
      "",
      "",
      "",
      "",
      "DiagnosisCode_1",
      "",
      ""
    ]
  },
  {
    "concept": "Diagnosiscodetype 1",
    "category": "Diagnosis",
    "sources": [
      "",
      "",
      "",
      "",
      "DiagnosisCodeType_1",
      "",
      ""
    ]
  },
  {
    "concept": "Benefits Assigned",
    "category": "Administrative / Attestation",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "Benefits_Are_Assigned",
      ""
    ]
  },
  {
    "concept": "Release of Information Indicator",
    "category": "Administrative / Attestation",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "Release_of_Info_Ind",
      ""
    ]
  },
  {
    "concept": "Status Code",
    "category": "Administrative / Attestation",
    "sources": [
      "",
      "",
      "",
      "status_code",
      "",
      "",
      ""
    ]
  },
  {
    "concept": "End of Record / Record Delimiter",
    "category": "Administrative / Attestation",
    "sources": [
      "",
      "",
      "",
      "",
      "",
      "",
      "End of Record Indicator"
    ]
  }
];
  