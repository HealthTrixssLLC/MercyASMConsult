---Main Query
-- report name Sweeps_GlobalHealth_OKC_AMB_YYYY_MM_DD.txt the date at the end is the date you send file, pipe delimited and leave the headers
--- Always drop the table before running report
--remove inv_number before sending the report out, I use it to verify my results
----  12/16/2025 change this join to pick up ones that don't have a visit num:JOIN HSP_ACCOUNT HA ON inv.pb_hosp_act_id = HA.HSP_ACCOUNT_ID  and added it to the report
---- added and inv.visit_number is null





--drop table GH_main_query1;


create table GH_main_query1 as
select 
txi.tx_id,
ibi.inv_num,
to_char(sysdate,'YYYYMMDD') as sent_Date,
'P'  claim_type,
'10'  IDC_Level,
HA.HSP_ACCOUNT_ID Encounter_ID,
'A' Risk_Assessment_code,
replace(cvg.subscr_num,',','')  Member_ID_Health_Plan, 
 upper(regexp_replace(regexp_replace(cvg.medicare_subscr_id,'[- ]',''), '^(([0-9]{9}[a-z][0-9a-z]?)$|([a-z]{1,3}[0-9]{6})$|([a-z]{1,3}
 [0-9]{9})$|([0-9][a-z][0-9a-z][0-9][a-z][0-9a-z][0-9][a-z]{2}[0-9]{2}$)|.*)','\2\3\4\5',1,0,'i')) Member_ID_CMS_HICN,
cast(null as number) Member_Site_Number,
pat.pat_last_name Member_Name_Last,
pat.pat_first_name Member_Name_First,
to_char(pat.birth_date,'MM/DD/YYYY') Member_Date_of_Birth,
case 
when pat.sex_c = 1 then 'F'
when pat.sex_c = 2 then 'M'
else pat.sex_c
end as Member_Gender,
ibi.mailing_name as Health_Plan_Name,
refser.prov_last_name  Facility_Name,
refser.prov_first_name Provider_Name_First,
refser.prov_npi_ID as Provider_NPI,
cv.bil_prov_taxid as Provider_Tax_ID,
cast( null as number) Provider_ID_Statutory,
cast (null as number) Provider_ID_Internal,
CASE 
   max(refser.PROV_SPCLTY_NAME) ------------------------------------ change specialty to CMS Code
when 'General Practice' then '01'
when 'General Surgery' then '02'
when 'Allergy Immunology' then '03'
when 'Otolaryngology' then '04'
when 'Anesthesiology' then '05'
when 'Cardiology' then '06'
when 'Dermatology' then '07'
when 'Family Practice' then '08'
when 'Interventional Pain Management IPM' then '09'
when 'Gastroenterology' then '10'
when 'Internal Medicine' then '11'
when 'Osteopathic Manipulative Medicine' then '12'
when 'Neurology' then '13'
when 'Neurosurgery' then '14'
when 'Speech Language Pathologist' then '15'
when 'Obstetrics Gynecology' then '16'
when 'Hospice and Palliative Care' then '17'
when 'Ophthalmology' then '18'
when 'Oral Surgery' then '19'
when 'Orthopedic Surgery' then '20'
when 'Cardiac Electrophysiology' then '21'
when 'Pathology' then '22'
when 'Sports Medicine' then '23'
when 'Plastic and Reconstructive Surgery' then '24'
when 'Physical Medicine And Rehabilitation' then '25'
when 'Psychiatry' then '26'
when 'Geriatric Psychiarty' then '27'
when 'Colorectal Surgery' then '28'
when 'Pulmary Disease' then '29'
when 'Thoracic Surgery' then '33'
when 'Urology' then '34'
when 'Chiropractic' then '35'
when 'Nuclear Medicine' then '36'
when 'Pediatric Medicine' then '37' 
when 'Pediatric' then '37'
when 'Geriatric Medicine' then '38'
when 'Nephrology' then '39'
when 'Hand Surgery' then '40'
when 'Optometry' then '41'
when 'Certified Nurse Midwife' then '42'
when 'Certified Registered Nurse Anesthetist' then '43'
when 'Infectious Disease' then '44'
when 'Endocrinology' then '46'
when 'Podiatry' then '48'
when 'Nurse Practitioner' then '50'
when 'Psychologist' then '62'
when 'Audiologist' then '64'
when 'Physical Therapist' then '65'
when 'Rheumatology' then '66'
when 'Occupational Therapist' then '67'
when 'Clinical Psychologist' then '68'
when 'Pain Management' then '72'
when 'Peripheral Vascular Disease' then '76'
when 'Vascular Surgery' then '77'
when 'Cardiac Surgery' then '78'
when 'Addiction Medicine' then '79'
when 'Licensed Clinical Social Worker' then '80'
when 'Critical Care intensivists' then '81'
when 'Hematology' then '82'
when 'Hematology Oncology' then '83'
when 'Preventative Medicine' then '84'
when 'Maxillofacial Surgery' then '85'
when 'Neuropsychiatry' then '86'
when 'Certified Clinical Nurse Specialist' then '89'
when 'Medical Oncology' then '90'
when 'Surgical Oncology' then '91'
when 'Radiation Oncology' then '92'
when 'Emergency Medicine' then '93'
when 'Interventional Radiology' then '94'
when 'Physician Assistant' then '97'
when 'Gynecologist/Onclolgist' then '98'
when 'Unknown Physician Specialty' then '99'
when 'Sleep Medicine' then 'C0'
else '99'
end as Provider_Specialty,
'11' Bill_Type,
to_char(arpb.service_date,'MM/DD/YYYY') as Date_of_Service_From,
to_char(arpb.service_date,'MM/DD/YYYY') as Date_of_Service_Thru,
substr(pos.pos_code,1,20) POS,
cast(null as number) DIAGNOSIS_CODE_ADMITTING,
cast(null as number) Revenue_Code,
'HC' Procedure_Code_Type,
arpb.cpt_code Procedure_Code,
cast(null as number)Procedure_Modifier,
refser.prov_addr_1 as Provider_Street_Address_1,
refser.prov_addr_2 as Provider_Street_Address_2,
refser.prov_city_name as Provider_city,
refser.prov_state_name as Provider_state,
(case 	when refser.prov_zip_cd is null then '123459998'
WHEN substr(refser.prov_zip_cd ,6,9) is null then replace(refser.prov_zip_cd, '-','')||'9998'
else replace(refser.prov_zip_cd, '-','') end)  as Provider_Zip_Code,
pat.add_line_1 as Member_Street_Address_1,
pat.add_line_2 as Member_Street_Address_2,
pat.city as Member_City,
st.abbr as Member_State_Code,
(case when pat.zip is null then '123459998'
 when substr(pat.zip,6,9) is null then replace(pat.zip, '-','')||'9998'
 else replace(pat.zip, '-','') end)as Member_Zip_Code,
'000' Line_Charge,
'UN' Line_Units_Type,
'0' Line_Units,
'Y' Provider_Signature_on_File,
'A' Provider_Accepts_Assignment,
'Y' Benefits_Are_Assigned,
'I' Release_of_Info_Ind,
cast(null as number) Inpatient_Discharge_Time,
cast(null as number) Admission_Type_Code,
cast(null as number) Admission_Source_Code,
cast(null as number) Patient_Status_Code,
'000' Patient_Amount_to_Pay,
inv.account_id patient_account_number
from invoice inv
join inv_basic_info ibi on inv.invoice_id = ibi.inv_id
join clarity.svc_ln_info sli on ibi.clm_ext_val_id = SLI.RECORD_ID
JOIN HSP_ACCOUNT HA ON inv.visit_number = HA.HSP_ACCOUNT_ID  
join clarity.clarity_loc loc on HA.loc_id = loc.loc_id 
join clarity.clm_values cv on cv.record_id = sli.record_id 
join bi_clarity.mv_ref_ser refser on ha.attending_prov_id = refser.prov_id
join coverage cvg on ibi.cvg_id = cvg.coverage_id
join tx_invoices txi on inv.invoice_id = txi.invoice_id
and txi.line = 1
join arpb_transactions arpb on txi.tx_id = arpb.tx_id
left join patient pat on pat.pat_id = arpb.patient_id
left join zc_state st on st.state_c = pat.state_c
join clarity_pos pos on pos.pos_id = arpb.pos_id
where 1=1
and sli.line = 1
and ibi.inv_status_c not in (4,5,7,8)    ------- Errors, rejected, removes voids and removed claims
and ibi.to_svc_date  >= '01-JUL-24'
and ibi.to_svc_date  < '01-JUL-25'
--and ibi.inv_num = 'POK1301518880'
and loc.loc_id in 
(50001, -- PARENT MERCY HOSPITAL HEALDTON
50003, -- PARENT MERCY HOSPITAL OKLAHOMA CITY
50004, -- PARENT MERCY HOSPITAL ARDMORE
50005, -- PARENT MERCY HOSPITAL TISHOMINGO
50006, -- PARENT MERCY HOSPITAL WATONGA
50007, -- PARENT MERCY HOSPITAL ADA
50009, -- PARENT MERCY HOSPITAL LOGAN COUNTY
50011) -- PARENT MERCY HOSPITAL KINGFISHER
and ibi.EPP_ID in
(2014501, -- GLOBAL HEALTH MEDICARE HMO 
2014502, -- GENERATIONS HEALTHCARE MCR HMO 
32014501, -- GLOBAL HEALTH MEDICARE HMO CONTRACTED 
32014502, -- GENERATIONS HEALTHCARE MCR HMO CONTRACTED 
42014501, -- GLOBAL HEALTH MEDICARE HMO NON-CONTRACTED 
42014502) -- GENERATIONS HEALTHCARE MCR HMO NON-CONTRACTED

and ( cv.bill_typ_fac_cd in (11, 12, 18) or
        ( cv.bill_typ_fac_cd in (13, 14, 71, 73, 76, 77, 85
        , 02, 22 --- added 02,22 on 7/15 due to it eliminating a confidential OV and ECHO identified as needing to be on
        , 19, 21, 23, 31, 33) ------- based off of previously submitted files for Humana
       )
       )
and arpb.cpt_code in (select distinct proc_code from lareed4.sweep_cpt_hcpcs_list_2024)   ---lareed4.sweep_cpt_hcpcs_list_2024
group by 
txi.tx_id,
ibi.inv_num,
sysdate,
HA.HSP_ACCOUNT_ID,
cvg.subscr_num, 
cvg.medicare_subscr_id,
pat.pat_last_name,
pat.pat_first_name,
pat.birth_date,
pat.sex_c,
ibi.mailing_name,
refser.prov_last_name,
refser.prov_first_name,
refser.prov_npi_ID,
cv.bil_prov_taxid,
arpb.service_date,
arpb.service_date,
pos.pos_code,
arpb.cpt_code,
refser.prov_addr_1,
refser.prov_addr_2,
refser.prov_city_name,
refser.prov_state_name,
refser.prov_zip_cd,
pat.add_line_1,
pat.add_line_2,
pat.city,
st.abbr,
pat.zip,
inv.account_id
_______________________________________________________________________________________________________________________________________________________________________________________________________
--DX Code query grabs all the DX codes from the GH_main_query1

--drop table GH_OP_DX_query;

create table GH_OP_DX_query as
select distinct main.inv_num,
main.Date_of_Service_From,
main.Date_of_Service_Thru,
replace(vdx.dx_code,'.','') as dx,
DENSE_RANK() OVER (PARTITION BY inv_num,Procedure_Code,Date_of_Service_From,Date_of_Service_Thru ORDER BY inv_num,Date_of_Service_From,Date_of_Service_Thru,line ASC) line,
main.Procedure_Code
from  GH_main_query1 main 
 join v_arpb_coding_dx vdx on main.tx_id = vdx.tx_id
                                  and vdx.source_key = 3
 where 1=1
-- and vdx.dx_code not in (select dx_dec from lareed4.cancer_dx_2023)   --- lareed4.cancer_dx_2024  -- remove per JS 12/15/2024
 and vdx.dx_code is not null

_____________________________________________________________________________________________________________________________________________________________________________________________________________________


---Final ouput has the DX codes in the correct format up to 24 dx codes.
--- If you need more DX codes then grab the whole query again and do a another 24 of DX codes.
--- remove inv_number before sending the report out, I use it to verify my results


with cohert as(

select distinct 
--"Tax ID1",
opdx.inv_num,
sent_Date,
'P'  claim_type,
'10'  IDC_Level,
Encounter_ID,
'A' Risk_Assessment_code,
Member_ID_Health_Plan,
Member_ID_CMS_HICN,
Member_Site_Number,
Member_Name_Last,
Member_Name_First,
Member_Date_of_Birth,
Member_Gender,
Health_Plan_Name,
Facility_Name,
Provider_Name_First,
Provider_NPI,
Provider_Tax_ID,
Provider_ID_Statutory,
Provider_ID_Internal,
Provider_Specialty,
'11' Bill_Type,
opdx.Date_of_Service_From,
opdx.Date_of_Service_Thru,
pos,
--Diagnosis_Code_Primary,
DIAGNOSIS_CODE_ADMITTING,
Revenue_Code,
'HC' Procedure_Code_Type,
opdx.Procedure_Code,
Procedure_Modifier,
Provider_Street_Address_1,
Provider_Street_Address_2,
Provider_city,
Provider_state,
Provider_Zip_Code,
Member_Street_Address_1,
Member_Street_Address_2,
Member_City,
Member_State_Code,
Member_Zip_Code,
'000' Line_Charge,
'UN' Line_Units_Type,
'0' Line_Units,
'Y' Provider_Signature_on_File,
'A' Provider_Accepts_Assignment,
'Y' Benefits_Are_Assigned,
'I' Release_of_Info_Ind,
Inpatient_Discharge_Time,
Admission_Type_Code,
Admission_Source_Code,
Patient_Status_Code,
'000' Patient_Amount_to_Pay,
patient_account_number
 from
 GH_OP_DX_query opdx
 join GH_main_query1 main on main.inv_num = opdx.inv_num

 where 1=1
) 
select distinct 
c.inv_num,
c.sent_Date,
'P'  claim_type,
'10'  IDC_Level,
c.Encounter_ID,
'A' Risk_Assessment_code,
c.Member_ID_Health_Plan,
c.Member_ID_CMS_HICN,
c.Member_Site_Number,
c.Member_Name_Last,
c.Member_Name_First,
c.Member_Date_of_Birth,
c.Member_Gender,
c.Health_Plan_Name,
c.Facility_Name,
c.Provider_Name_First,
c.Provider_NPI,
c.Provider_Tax_ID,
c.Provider_ID_Statutory,
c.Provider_ID_Internal,
c.Provider_Specialty,
'11' Bill_Type,
c.Date_of_Service_From,
c.Date_of_Service_Thru,
c.pos,
opdxp.dx as Diagnosis_Code_Primary,
c.DIAGNOSIS_CODE_ADMITTING,
opdx1.dx as Diagnosis_Code_1,
opdx2.dx as Diagnosis_Code_2,
opdx3.dx as Diagnosis_Code_3,
opdx4.dx as Diagnosis_Code_4,
opdx5.dx as Diagnosis_Code_5,
opdx6.dx as Diagnosis_Code_6,
opdx7.dx as Diagnosis_Code_7,
opdx8.dx as Diagnosis_Code_8,
opdx9.dx as Diagnosis_Code_9,
opdx10.dx as Diagnosis_Code_10,
opdx11.dx as Diagnosis_Code_11,
opdx12.dx as Diagnosis_Code_12,
opdx13.dx as Diagnosis_Code_13,
opdx14.dx as Diagnosis_Code_14,
opdx15.dx as Diagnosis_Code_15,
opdx16.dx as Diagnosis_Code_16,
opdx17.dx as Diagnosis_Code_17,
opdx18.dx as Diagnosis_Code_18,
opdx19.dx as Diagnosis_Code_19,
opdx20.dx as Diagnosis_Code_20,
opdx21.dx as Diagnosis_Code_21,
opdx22.dx as Diagnosis_Code_22,
opdx23.dx as Diagnosis_Code_23,
opdx24.dx as Diagnosis_Code_24,
c.Revenue_Code,
'HC' Procedure_Code_Type,
c.Procedure_Code,
c.Procedure_Modifier,
c.Provider_Street_Address_1,
c.Provider_Street_Address_2,
c.Provider_city,
c.Provider_state,
c.Provider_Zip_Code,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
'000' Line_Charge,
'UN' Line_Units_Type,
'0' Line_Units,
'Y' Provider_Signature_on_File,
'A' Provider_Accepts_Assignment,
'Y' Benefits_Are_Assigned,
'I' Release_of_Info_Ind,
c.Inpatient_Discharge_Time,
c.Admission_Type_Code,
c.Admission_Source_Code,
c.Patient_Status_Code,
'000' Patient_Amount_to_Pay,
c.patient_account_number
--opdx25.dx as dx_25,
--opdx26.dx as dx_26,
--opdx27.dx as dx_27,
--opdx28.dx as dx_28,
--opdx29.dx as dx_29,
--opdx30.dx as dx_30,
--opdx31.dx as dx_31,
--opdx32.dx as dx_32,
--opdx33.dx as dx_33,
--opdx34.dx as dx_34,
--opdx35.dx as dx_35,
--opdx36.dx as dx_36,
--opdx37.dx as dx_37,
--opdx38.dx as dx_38,
--opdx39.dx as dx_39,
--opdx40.dx as dx_40
      from cohert c
      left join GH_OP_DX_query opdxp on opdxp.inv_num = c.inv_num      
                       and opdxp.Date_of_Service_From = c.Date_of_Service_From
                       and  opdxp.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdxp.Procedure_Code = c.Procedure_Code
                        and  opdxp.line = 1    
  left join GH_OP_DX_query opdx1 on opdx1.inv_num = c.inv_num      
                       and opdx1.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx1.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx1.Procedure_Code = c.Procedure_Code
                        and  opdx1.line = 1                   
   left join GH_OP_DX_query opdx2 on opdx2.inv_num = c.inv_num      
                       and opdx2.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx2.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx2.Procedure_Code = c.Procedure_Code
                        and  opdx2.line = 2                                     
   left join GH_OP_DX_query opdx3 on opdx3.inv_num = c.inv_num      
                       and opdx3.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx3.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx3.Procedure_Code = c.Procedure_Code
                        and  opdx3.line = 3   
    left join GH_OP_DX_query opdx4 on opdx4.inv_num = c.inv_num      
                       and opdx4.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx4.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx4.Procedure_Code = c.Procedure_Code
                        and  opdx4.line = 4   
   left join GH_OP_DX_query opdx5 on opdx5.inv_num = c.inv_num      
                       and opdx5.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx5.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx5.Procedure_Code = c.Procedure_Code
                        and  opdx5.line = 5   
   left join GH_OP_DX_query opdx6 on opdx6.inv_num = c.inv_num      
                       and opdx6.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx6.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx6.Procedure_Code = c.Procedure_Code
                        and  opdx6.line = 6   
   left join GH_OP_DX_query opdx7 on opdx7.inv_num = c.inv_num      
                       and opdx7.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx7.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx7.Procedure_Code = c.Procedure_Code
                        and  opdx7.line = 7   
   left join GH_OP_DX_query opdx8 on opdx8.inv_num = c.inv_num      
                       and opdx8.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx8.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx8.Procedure_Code = c.Procedure_Code
                        and  opdx8.line = 8   
   left join GH_OP_DX_query opdx9 on opdx9.inv_num = c.inv_num      
                       and opdx9.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx9.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx9.Procedure_Code = c.Procedure_Code
                        and  opdx9.line = 9   
   left join GH_OP_DX_query opdx10 on opdx10.inv_num = c.inv_num      
                       and opdx10.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx10.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx10.Procedure_Code = c.Procedure_Code
                        and  opdx10.line = 10   
   left join GH_OP_DX_query opdx11 on opdx11.inv_num = c.inv_num      
                       and opdx11.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx11.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx11.Procedure_Code = c.Procedure_Code
                        and  opdx11.line = 11   
   left join GH_OP_DX_query opdx12 on opdx12.inv_num = c.inv_num      
                       and opdx12.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx12.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx12.Procedure_Code = c.Procedure_Code
                        and  opdx12.line = 12   
   left join GH_OP_DX_query opdx13 on opdx13.inv_num = c.inv_num      
                       and opdx13.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx13.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx13.Procedure_Code = c.Procedure_Code
                        and  opdx13.line = 13   
   left join GH_OP_DX_query opdx14 on opdx14.inv_num = c.inv_num      
                       and opdx14.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx14.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx14.Procedure_Code = c.Procedure_Code
                       and  opdx14.line = 14   
   left join GH_OP_DX_query opdx15 on opdx15.inv_num = c.inv_num      
                       and opdx15.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx15.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx15.Procedure_Code = c.Procedure_Code
                        and  opdx15.line = 15   
   left join GH_OP_DX_query opdx16 on opdx16.inv_num = c.inv_num      
                       and opdx16.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx16.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx16.Procedure_Code = c.Procedure_Code
                        and  opdx16.line = 16   
    left join GH_OP_DX_query opdx17 on opdx17.inv_num = c.inv_num      
                       and opdx17.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx17.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx17.Procedure_Code = c.Procedure_Code
                        and  opdx17.line = 17   
   left join GH_OP_DX_query opdx18 on opdx18.inv_num = c.inv_num      
                       and opdx18.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx18.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx18.Procedure_Code = c.Procedure_Code
                        and  opdx18.line = 18   
   left join GH_OP_DX_query opdx19 on opdx19.inv_num = c.inv_num      
                       and opdx19.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx19.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx19.Procedure_Code = c.Procedure_Code
                        and  opdx19.line = 19   
   left join GH_OP_DX_query opdx20 on opdx20.inv_num = c.inv_num      
                       and opdx20.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx20.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx20.Procedure_Code = c.Procedure_Code
                        and  opdx20.line = 20   
   left join GH_OP_DX_query opdx21 on opdx21.inv_num = c.inv_num      
                       and opdx21.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx21.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx21.Procedure_Code = c.Procedure_Code
                        and  opdx21.line = 21   
   left join GH_OP_DX_query opdx22 on opdx22.inv_num = c.inv_num      
                       and opdx22.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx22.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx22.Procedure_Code = c.Procedure_Code
                        and  opdx22.line = 22   
   left join GH_OP_DX_query opdx23 on opdx23.inv_num = c.inv_num      
                       and opdx23.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx23.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx23.Procedure_Code = c.Procedure_Code
                        and  opdx23.line = 23   
   left join GH_OP_DX_query opdx24 on opdx24.inv_num = c.inv_num      
                       and opdx24.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx24.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx24.Procedure_Code = c.Procedure_Code
                        and  opdx24.line = 24   


______________________________________________________________________________________________________________________________________________________________________________________________________________________________

---Final ouput has the DX codes in the correct format up to 24 dx codes.
--- If you need more DX codes then grab the whole query again and do a another 24 of DX codes.
--- remove inv_number before sending the report out, I use it to verify my results



with cohert as(

select distinct 
--"Tax ID1",
opdx.inv_num,
sent_Date,
'P'  claim_type,
'10'  IDC_Level,
Encounter_ID,
'A' Risk_Assessment_code,
Member_ID_Health_Plan,
Member_ID_CMS_HICN,
Member_Site_Number,
Member_Name_Last,
Member_Name_First,
Member_Date_of_Birth,
Member_Gender,
Health_Plan_Name,
Facility_Name,
Provider_Name_First,
Provider_NPI,
Provider_Tax_ID,
Provider_ID_Statutory,
Provider_ID_Internal,
Provider_Specialty,
'11' Bill_Type,
opdx.Date_of_Service_From,
opdx.Date_of_Service_Thru,
pos,
--Diagnosis_Code_Primary,
DIAGNOSIS_CODE_ADMITTING,
Revenue_Code,
'HC' Procedure_Code_Type,
opdx.Procedure_Code,
Procedure_Modifier,
Provider_Street_Address_1,
Provider_Street_Address_2,
Provider_city,
Provider_state,
Provider_Zip_Code,
Member_Street_Address_1,
Member_Street_Address_2,
Member_City,
Member_State_Code,
Member_Zip_Code,
'000' Line_Charge,
'UN' Line_Units_Type,
'0' Line_Units,
'Y' Provider_Signature_on_File,
'A' Provider_Accepts_Assignment,
'Y' Benefits_Are_Assigned,
'I' Release_of_Info_Ind,
Inpatient_Discharge_Time,
Admission_Type_Code,
Admission_Source_Code,
Patient_Status_Code,
'000' Patient_Amount_to_Pay,
patient_account_number
 from
 GH_OP_DX_query opdx
 join GH_main_query1 main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 24
) 
select distinct 
c.inv_num,
c.sent_Date,
'P'  claim_type,
'10'  IDC_Level,
c.Encounter_ID,
'A' Risk_Assessment_code,
c.Member_ID_Health_Plan,
c.Member_ID_CMS_HICN,
c.Member_Site_Number,
c.Member_Name_Last,
c.Member_Name_First,
c.Member_Date_of_Birth,
c.Member_Gender,
c.Health_Plan_Name,
c.Facility_Name,
c.Provider_Name_First,
c.Provider_NPI,
c.Provider_Tax_ID,
c.Provider_ID_Statutory,
c.Provider_ID_Internal,
c.Provider_Specialty,
'11' Bill_Type,
c.Date_of_Service_From,
c.Date_of_Service_Thru,
c.pos,
opdxp.dx as Diagnosis_Code_Primary,
c.DIAGNOSIS_CODE_ADMITTING,
opdx25.dx as Diagnosis_Code_1,
opdx26.dx as Diagnosis_Code_2,
opdx27.dx as Diagnosis_Code_3,
opdx28.dx as Diagnosis_Code_4,
opdx29.dx as Diagnosis_Code_5,
opdx30.dx as Diagnosis_Code_6,
opdx31.dx as Diagnosis_Code_7,
opdx32.dx as Diagnosis_Code_8,
opdx33.dx as Diagnosis_Code_9,
opdx34.dx as Diagnosis_Code_10,
opdx35.dx as Diagnosis_Code_11,
opdx36.dx as Diagnosis_Code_12,
opdx37.dx as Diagnosis_Code_13,
opdx38.dx as Diagnosis_Code_14,
opdx39.dx as Diagnosis_Code_15,
opdx40.dx as Diagnosis_Code_16,
opdx41.dx as Diagnosis_Code_17,
opdx42.dx as Diagnosis_Code_18,
opdx43.dx as Diagnosis_Code_19,
opdx44.dx as Diagnosis_Code_20,
opdx45.dx as Diagnosis_Code_21,
opdx46.dx as Diagnosis_Code_22,
opdx47.dx as Diagnosis_Code_23,
opdx48.dx as Diagnosis_Code_24,
c.Revenue_Code,
'HC' Procedure_Code_Type,
c.Procedure_Code,
c.Procedure_Modifier,
c.Provider_Street_Address_1,
c.Provider_Street_Address_2,
c.Provider_city,
c.Provider_state,
c.Provider_Zip_Code,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
'000' Line_Charge,
'UN' Line_Units_Type,
'0' Line_Units,
'Y' Provider_Signature_on_File,
'A' Provider_Accepts_Assignment,
'Y' Benefits_Are_Assigned,
'I' Release_of_Info_Ind,
c.Inpatient_Discharge_Time,
c.Admission_Type_Code,
c.Admission_Source_Code,
c.Patient_Status_Code,
'000' Patient_Amount_to_Pay,
c.patient_account_number
      from cohert c
      left join GH_OP_DX_query opdxp on opdxp.inv_num = c.inv_num      
                       and opdxp.Date_of_Service_From = c.Date_of_Service_From
                       and  opdxp.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdxp.Procedure_Code = c.Procedure_Code
                        and  opdxp.line = 1    
    left join GH_OP_DX_query opdx25 on opdx25.inv_num = c.inv_num      
                       and opdx25.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx25.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx25.Procedure_Code = c.Procedure_Code
                        and  opdx25.line = 25  
     left join GH_OP_DX_query opdx26 on opdx26.inv_num = c.inv_num      
                       and opdx26.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx26.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx26.Procedure_Code = c.Procedure_Code
                        and  opdx26.line = 26 
   left join GH_OP_DX_query opdx27 on opdx27.inv_num = c.inv_num      
                       and opdx27.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx27.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx27.Procedure_Code = c.Procedure_Code
                        and  opdx27.line = 27   
   left join GH_OP_DX_query opdx28 on opdx28.inv_num = c.inv_num      
                       and opdx28.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx28.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx28.Procedure_Code = c.Procedure_Code
                        and  opdx28.line = 28   
   left join GH_OP_DX_query opdx29 on opdx29.inv_num = c.inv_num      
                       and opdx29.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx29.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx29.Procedure_Code = c.Procedure_Code
                        and  opdx29.line = 29   
   left join GH_OP_DX_query opdx30 on opdx30.inv_num = c.inv_num      
                       and opdx30.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx30.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx30.Procedure_Code = c.Procedure_Code
                        and  opdx30.line = 30   
   left join GH_OP_DX_query opdx31 on opdx31.inv_num = c.inv_num      
                       and opdx31.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx31.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx31.Procedure_Code = c.Procedure_Code
                        and  opdx31.line = 31   
   left join GH_OP_DX_query opdx32 on opdx32.inv_num = c.inv_num      
                       and opdx32.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx32.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx32.Procedure_Code = c.Procedure_Code
                        and  opdx32.line = 32   
   left join GH_OP_DX_query opdx33 on opdx33.inv_num = c.inv_num      
                       and opdx33.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx33.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx33.Procedure_Code = c.Procedure_Code
                        and  opdx33.line = 33   
   left join GH_OP_DX_query opdx34 on opdx34.inv_num = c.inv_num      
                       and opdx34.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx34.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx34.Procedure_Code = c.Procedure_Code
                        and  opdx34.line = 34   
   left join GH_OP_DX_query opdx35 on opdx35.inv_num = c.inv_num      
                       and opdx35.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx35.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx35.Procedure_Code = c.Procedure_Code
                        and  opdx35.line = 35  
 left join GH_OP_DX_query opdx36 on opdx36.inv_num = c.inv_num      
                       and opdx36.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx36.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx36.Procedure_Code = c.Procedure_Code
                        and  opdx36.line = 36   
 left join GH_OP_DX_query opdx37 on opdx37.inv_num = c.inv_num      
                       and opdx37.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx37.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx37.Procedure_Code = c.Procedure_Code
                        and  opdx37.line = 37   
 left join GH_OP_DX_query opdx38 on opdx38.inv_num = c.inv_num      
                       and opdx38.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx38.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx38.Procedure_Code = c.Procedure_Code
                        and  opdx38.line = 38   
 left join GH_OP_DX_query opdx39 on opdx39.inv_num = c.inv_num      
                       and opdx39.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx39.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx39.Procedure_Code = c.Procedure_Code
                        and  opdx39.line = 39   
 left join GH_OP_DX_query opdx40 on opdx40.inv_num = c.inv_num      
                       and opdx40.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx40.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx40.line = 40 
left join GH_OP_DX_query opdx41 on opdx41.inv_num = c.inv_num      
                       and opdx41.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx41.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx41.Procedure_Code = c.Procedure_Code
                        and  opdx41.line = 41 
left join GH_OP_DX_query opdx42 on opdx42.inv_num = c.inv_num      
                       and opdx42.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx42.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx42.Procedure_Code = c.Procedure_Code
                        and  opdx42.line = 42 
left join GH_OP_DX_query opdx43 on opdx43.inv_num = c.inv_num      
                       and opdx43.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx43.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx43.Procedure_Code = c.Procedure_Code
                        and  opdx43.line = 43 
left join GH_OP_DX_query opdx44 on opdx44.inv_num = c.inv_num      
                       and opdx44.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx44.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx44.Procedure_Code = c.Procedure_Code
                        and  opdx44.line = 44 
left join GH_OP_DX_query opdx45 on opdx45.inv_num = c.inv_num      
                       and opdx45.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx45.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx45.Procedure_Code = c.Procedure_Code
                        and  opdx45.line = 45 
left join GH_OP_DX_query opdx46 on opdx46.inv_num = c.inv_num      
                       and opdx46.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx46.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx46.Procedure_Code = c.Procedure_Code
                        and  opdx46.line = 46 
left join GH_OP_DX_query opdx47 on opdx47.inv_num = c.inv_num      
                       and opdx47.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx47.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx47.Procedure_Code = c.Procedure_Code
                        and  opdx47.line = 47 
left join GH_OP_DX_query opdx48 on opdx48.inv_num = c.inv_num      
                       and opdx48.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx48.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       and   opdx48.Procedure_Code = c.Procedure_Code
                        and  opdx48.line = 48 
