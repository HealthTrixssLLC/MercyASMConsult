
--drop table GH_main_query1;


create table GH_main_query1 as
select 
to_char(sysdate,'YYYYMMDD') as sent_Date,
'I'  claim_type,
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
EPP.BENEFIT_PLAN_NAME as Health_Plan_Name,
LOC.LOC_NAME  Facility_Name,
cast(null as number) Provider_Name_First,
cv.bil_prov_npi as Provider_NPI,
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
(case 
when ha.acct_basecls_ha_c = 1 then '111' 
else '131' end) as Bill_Type,
to_char(ha.adm_date_time,'MM/DD/YYYY') as Date_of_Service_From,
to_char(ha.disch_date_time,'MM/DD/YYYY') as Date_of_Service_Thru,
replace(edgprim.current_icd10_list,'.','') as DIAGNOSIS_CODE_ADMITTING,
sli.ln_rev_cd Revenue_Code,
cast(null as Number) Procedure_Code_Type,
cast(null as Number) Procedure_Code,
cast(null as Number) Procedure_Modifier,
pos.address_line_1 as Provider_Street_Address_1,
pos.address_line_2  as Provider_Street_Address_2,
pos.city   as Provider_city,
zs.abbr as Provider_state,
(case 	when pos.zip is null then '123459998'
WHEN substr(pos.zip ,6,9) is null then replace(pos.zip, '-','')||'9998'
else replace(pos.zip, '-','') end)  as Provider_zip_code,
pat.add_line_1 as Member_Street_Address_1,
pat.add_line_2 as Member_Street_Address_2,
pat.city as Member_City,
st.abbr as Member_State_Code,
(case when pat.zip is null then '123459998'
 when substr(pat.zip,6,9) is null then replace(pat.zip, '-','')||'9998'
 else replace(pat.zip, '-','') end)as Member_Zip_Code,
'000' Line_Charge,
'DA' Line_Units_Type,
'0' Line_Units,
'Y' Provider_Signature_on_File,
'A' Provider_Accepts_Assignment,
'Y' Benefits_Are_Assigned,
'I' Release_of_Info_Ind,
'2359' Inpatient_Discharge_Time,
'9' Admission_Type_Code,
'9' Admission_Source_Code,
cv2.dischrg_disp Patient_Status_Code,
'000' Patient_Amount_to_Pay,
HA.HSP_ACCOUNT_ID patient_account_number
from clarity.clm_value_record cvr
join clarity.clm_values cv on cvr.record_id = cv.record_id
join clarity.svc_ln_info sli on cvr.record_id = sli.record_id
JOIN HSP_CLAIM_DETAIL2 HCD ON CVR.RECORD_ID = HCD.CLM_EXT_VAL_ID 
 JOIN COVERAGE CVG ON HCD.SG_CVG_ID = CVG.coverage_id
 JOIN clarity.clarity_epp epp on cvg.plan_id = epp.benefit_plan_id
join patient pat on HCD.sg_pat_ID = pat.pat_id
left join zc_state st on st.state_c = pat.state_c
inner join hsp_bucket bkt on hcd.hlb_id=bkt.bucket_id
inner join hsp_account ha on bkt.hsp_account_id = ha.hsp_account_id
--JOIN clarity.clarity_epp epp on cvg.plan_id = epp.benefit_plan_id
JOIN clarity.clarity_loc loc on HCD.SG_loc_id = LOC.LOC_ID
Join clarity.clarity_POS pos on loc.loc_id = pos.pos_id
left join zc_state zs on pos.state_c = zs.state_c
join clarity.clm_values_2 cv2 on cvr.record_id = cv2.record_id
left join bi_clarity.mv_ref_ser refser on  ha.attending_prov_id = refser.prov_id
Left outer join clarity.hsp_acct_admit_dx haad on haad.hsp_account_id = ha.hsp_account_id 
                                and haad.line = 1
left outer join clarity.clarity_edg edgprim on edgprim.dx_id = haad.admit_dx_id

where 1=1
 and cvr.clm_typ_c = 2 ---- Institutional Claim 
--and sli.line = 1
and bkt.bkt_sts_ha_c != 8  --rejected
and ha.adm_date_time >= '01-Jan-25'
and ha.disch_date_time < '01-JAN-26'
--and HA.HSP_ACCOUNT_ID = '53200236409'
and HCD.SG_loc_id in 
(50001, -- PARENT MERCY HOSPITAL HEALDTON   ---OKLA
50003, -- PARENT MERCY HOSPITAL OKLAHOMA CITY
50004, -- PARENT MERCY HOSPITAL ARDMORE
50005, -- PARENT MERCY HOSPITAL TISHOMINGO
50006, -- PARENT MERCY HOSPITAL WATONGA
50007, -- PARENT MERCY HOSPITAL ADA
50009, -- PARENT MERCY HOSPITAL LOGAN COUNTY
50011) -- PARENT MERCY HOSPITAL KINGFISHER
and HCD.SG_plan_id in
(2014501, -- GLOBAL HEALTH MEDICARE HMO 
2014502, -- GENERATIONS HEALTHCARE MCR HMO 
32014501, -- GLOBAL HEALTH MEDICARE HMO CONTRACTED 
32014502, -- GENERATIONS HEALTHCARE MCR HMO CONTRACTED 
42014501, -- GLOBAL HEALTH MEDICARE HMO NON-CONTRACTED 
42014502) -- GENERATIONS HEALTHCARE MCR HMO NON-CONTRACTED

and (cv.bill_typ_fac_cd in (11, 12, 18) or
(cv.bill_typ_fac_cd in (13, 14, 71, 73, 76, 77, 85) 
      )
       )
and sli.line = 1
and (sli.ln_proc_cd in (select distinct proc_code from lareed4.sweeps_cpt_hcpcs_list_2025)
     or sli.ln_proc_cd is null)group by 
sysdate,
HA.HSP_ACCOUNT_ID,
cvg.subscr_num,
cvg.medicare_subscr_id,
pat.pat_last_name ,
pat.pat_first_name,
pat.birth_date,
pat.sex_c ,
EPP.BENEFIT_PLAN_NAME ,
loc.loc_name ,
cv.bil_prov_npi,
cv.bil_prov_taxid,
refser.PROV_SPCLTY_NAME,
ha.acct_basecls_ha_c,
ha.adm_date_time,
ha.disch_date_time,
edgprim.current_icd10_list,
sli.ln_rev_cd ,
pos.address_line_1 ,
pos.address_line_2 ,
pos.city ,
zs.abbr,
pos.zip,
pat.add_line_1 ,
pat.add_line_2 ,
pat.city,
st.abbr,
pat.zip,
cv2.dischrg_disp



__________________________________________________________________________________________________________________________________________________________________________________

--DX Code query grabs all the DX codes from the GH_main_query1

--drop table GH_OP_DX_query;

create table GH_OP_DX_query as
select distinct main.Encounter_ID,
main.Date_of_Service_From,
main.Date_of_Service_Thru,
replace(edg.ref_bill_code,'.','')as dx,
hadx.line
from  GH_main_query1 main 
join hsp_acct_dx_list hadx on main.Encounter_ID = hadx.hsp_account_id
 join clarity_edg edg on hadx.dx_id = edg.dx_id
 where 1=1
 order by hadx.line

______________________________________________________________________________________________________________________________________________________________________________________________________________________________


---Final ouput has the DX codes in the correct format up to 24 dx codes.






with cohert as(

select distinct 
sent_Date,
claim_type,
IDC_Level,
opdx.Encounter_ID,
Risk_Assessment_code,
Member_ID_Health_Plan,
Member_ID_CMS_HICN,
Member_Site_Number,
Member_Name_Last,
Member_Name_First,
Member_Date_of_Birth,
main.Member_Gender,
Health_Plan_Name,
Facility_Name,
Provider_Name_First,
Provider_NPI,
Provider_Tax_ID,
Provider_ID_Statutory,
Provider_ID_Internal,
Provider_Specialty,
Bill_Type,
opdx.Date_of_Service_From,
opdx.Date_of_Service_Thru,
DIAGNOSIS_CODE_ADMITTING,
Revenue_Code,
Procedure_Code_Type,
Procedure_Code,
Procedure_Modifier,
Provider_Street_Address_1,
Provider_Street_Address_2,
Provider_city,
Provider_state,
Provider_zip_code,
Member_Street_Address_1,
Member_Street_Address_2,
Member_City,
Member_State_Code,
Member_Zip_Code,
Line_Charge,
Line_Units_Type,
Line_Units,
Provider_Signature_on_File,
Provider_Accepts_Assignment,
Benefits_Are_Assigned,
Release_of_Info_Ind,
Inpatient_Discharge_Time,
Admission_Type_Code,
Admission_Source_Code,
Patient_Status_Code,
Patient_Amount_to_Pay,
patient_account_number
 from
 GH_OP_DX_query opdx
 join GH_main_query1 main on main.encounter_id = opdx.encounter_id

 where 1=1
) 
select distinct 
c.sent_Date,
c.claim_type,
c.IDC_Level,
c.Encounter_ID,
c.Risk_Assessment_code,
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
c.Bill_Type,
c.Date_of_Service_From,
c.Date_of_Service_Thru,
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
c.Procedure_Code_Type,
c.Procedure_Code,
c.Procedure_Modifier,
c.Provider_Street_Address_1,
c.Provider_Street_Address_2,
c.Provider_city,
c.Provider_state,
c.Provider_zip_code,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
c.Line_Charge,
c. Line_Units_Type,
c. Line_Units,
c.Provider_Signature_on_File,
c.Provider_Accepts_Assignment,
c.Benefits_Are_Assigned,
c.Release_of_Info_Ind,
c.Inpatient_Discharge_Time,
c.Admission_Type_Code,
c.Admission_Source_Code,
c.Patient_Status_Code,
c.Patient_Amount_to_Pay,
c.patient_account_number
      from cohert c
      left join GH_OP_DX_query opdxp on opdxp.encounter_id = c.encounter_id      
                       and opdxp.Date_of_Service_From = c.Date_of_Service_From
                       and  opdxp.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdxp.Procedure_Code = c.Procedure_Code
                        and  opdxp.line = 1    
  left join GH_OP_DX_query opdx1 on opdx1.encounter_id = c.encounter_id      
                       and opdx1.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx1.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx1.Procedure_Code = c.Procedure_Code
                        and  opdx1.line = 1                   
   left join GH_OP_DX_query opdx2 on opdx2.encounter_id = c.encounter_id      
                       and opdx2.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx2.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx2.Procedure_Code = c.Procedure_Code
                        and  opdx2.line = 2                                     
   left join GH_OP_DX_query opdx3 on opdx3.encounter_id = c.encounter_id      
                       and opdx3.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx3.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx3.Procedure_Code = c.Procedure_Code
                        and  opdx3.line = 3   
    left join GH_OP_DX_query opdx4 on opdx4.encounter_id = c.encounter_id      
                       and opdx4.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx4.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx4.Procedure_Code = c.Procedure_Code
                        and  opdx4.line = 4   
   left join GH_OP_DX_query opdx5 on opdx5.encounter_id = c.encounter_id      
                       and opdx5.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx5.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx5.Procedure_Code = c.Procedure_Code
                        and  opdx5.line = 5   
   left join GH_OP_DX_query opdx6 on opdx6.encounter_id = c.encounter_id      
                       and opdx6.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx6.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx6.Procedure_Code = c.Procedure_Code
                        and  opdx6.line = 6   
   left join GH_OP_DX_query opdx7 on opdx7.encounter_id = c.encounter_id      
                       and opdx7.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx7.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx7.Procedure_Code = c.Procedure_Code
                        and  opdx7.line = 7   
   left join GH_OP_DX_query opdx8 on opdx8.encounter_id = c.encounter_id      
                       and opdx8.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx8.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx8.Procedure_Code = c.Procedure_Code
                        and  opdx8.line = 8   
   left join GH_OP_DX_query opdx9 on opdx9.encounter_id = c.encounter_id      
                       and opdx9.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx9.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx9.Procedure_Code = c.Procedure_Code
                        and  opdx9.line = 9   
   left join GH_OP_DX_query opdx10 on opdx10.encounter_id = c.encounter_id      
                       and opdx10.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx10.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx10.Procedure_Code = c.Procedure_Code
                        and  opdx10.line = 10   
   left join GH_OP_DX_query opdx11 on opdx11.encounter_id = c.encounter_id      
                       and opdx11.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx11.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx11.Procedure_Code = c.Procedure_Code
                        and  opdx11.line = 11   
   left join GH_OP_DX_query opdx12 on opdx12.encounter_id = c.encounter_id      
                       and opdx12.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx12.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx12.Procedure_Code = c.Procedure_Code
                        and  opdx12.line = 12   
   left join GH_OP_DX_query opdx13 on opdx13.encounter_id = c.encounter_id      
                       and opdx13.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx13.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx13.Procedure_Code = c.Procedure_Code
                        and  opdx13.line = 13   
   left join GH_OP_DX_query opdx14 on opdx14.encounter_id = c.encounter_id      
                       and opdx14.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx14.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx14.Procedure_Code = c.Procedure_Code
                       and  opdx14.line = 14   
   left join GH_OP_DX_query opdx15 on opdx15.encounter_id = c.encounter_id      
                       and opdx15.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx15.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx15.Procedure_Code = c.Procedure_Code
                        and  opdx15.line = 15   
   left join GH_OP_DX_query opdx16 on opdx16.encounter_id = c.encounter_id      
                       and opdx16.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx16.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx16.Procedure_Code = c.Procedure_Code
                        and  opdx16.line = 16   
    left join GH_OP_DX_query opdx17 on opdx17.encounter_id = c.encounter_id      
                       and opdx17.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx17.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx17.Procedure_Code = c.Procedure_Code
                        and  opdx17.line = 17   
   left join GH_OP_DX_query opdx18 on opdx18.encounter_id = c.encounter_id      
                       and opdx18.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx18.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx18.Procedure_Code = c.Procedure_Code
                        and  opdx18.line = 18   
   left join GH_OP_DX_query opdx19 on opdx19.encounter_id = c.encounter_id      
                       and opdx19.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx19.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx19.Procedure_Code = c.Procedure_Code
                        and  opdx19.line = 19   
   left join GH_OP_DX_query opdx20 on opdx20.encounter_id = c.encounter_id      
                       and opdx20.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx20.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx20.Procedure_Code = c.Procedure_Code
                        and  opdx20.line = 20   
   left join GH_OP_DX_query opdx21 on opdx21.encounter_id = c.encounter_id      
                       and opdx21.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx21.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx21.Procedure_Code = c.Procedure_Code
                        and  opdx21.line = 21   
   left join GH_OP_DX_query opdx22 on opdx22.encounter_id = c.encounter_id      
                       and opdx22.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx22.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx22.Procedure_Code = c.Procedure_Code
                        and  opdx22.line = 22   
   left join GH_OP_DX_query opdx23 on opdx23.encounter_id = c.encounter_id      
                       and opdx23.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx23.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx23.Procedure_Code = c.Procedure_Code
                        and  opdx23.line = 23   
   left join GH_OP_DX_query opdx24 on opdx24.encounter_id = c.encounter_id      
                       and opdx24.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx24.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx24.Procedure_Code = c.Procedure_Code
                        and  opdx24.line = 24   




______________________________________________________________________________________________________________________________________________________________________________________________________________________________



---Final ouput has the DX codes in the correct format 25-48 dx codes.





with cohert as(

select distinct 
sent_Date,
claim_type,
IDC_Level,
opdx.Encounter_ID,
Risk_Assessment_code,
Member_ID_Health_Plan,
Member_ID_CMS_HICN,
Member_Site_Number,
Member_Name_Last,
Member_Name_First,
Member_Date_of_Birth,
main.Member_Gender,
Health_Plan_Name,
Facility_Name,
Provider_Name_First,
Provider_NPI,
Provider_Tax_ID,
Provider_ID_Statutory,
Provider_ID_Internal,
Provider_Specialty,
Bill_Type,
opdx.Date_of_Service_From,
opdx.Date_of_Service_Thru,
--Diagnosis_Code_Primary,
DIAGNOSIS_CODE_ADMITTING,
Revenue_Code,
Procedure_Code_Type,
Procedure_Code,
Procedure_Modifier,
Provider_Street_Address_1,
Provider_Street_Address_2,
Provider_city,
Provider_state,
Provider_zip_code,
Member_Street_Address_1,
Member_Street_Address_2,
Member_City,
Member_State_Code,
Member_Zip_Code,
Line_Charge,
Line_Units_Type,
Line_Units,
Provider_Signature_on_File,
Provider_Accepts_Assignment,
Benefits_Are_Assigned,
Release_of_Info_Ind,
Inpatient_Discharge_Time,
Admission_Type_Code,
Admission_Source_Code,
Patient_Status_Code,
Patient_Amount_to_Pay,
patient_account_number
 from
 GH_OP_DX_query opdx
 join GH_main_query1 main on main.encounter_id = opdx.encounter_id

 where 1=1
 and opdx.line > 24
) 
select distinct 
c.sent_Date,
c.claim_type,
c.IDC_Level,
c.Encounter_ID,
c.Risk_Assessment_code,
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
c.Bill_Type,
c.Date_of_Service_From,
c.Date_of_Service_Thru,
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
c.Procedure_Code_Type,
c.Procedure_Code,
c.Procedure_Modifier,
c.Provider_Street_Address_1,
c.Provider_Street_Address_2,
c.Provider_city,
c.Provider_state,
c.Provider_zip_code,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
c.Line_Charge,
c. Line_Units_Type,
c. Line_Units,
c.Provider_Signature_on_File,
c.Provider_Accepts_Assignment,
c.Benefits_Are_Assigned,
c.Release_of_Info_Ind,
c.Inpatient_Discharge_Time,
c.Admission_Type_Code,
c.Admission_Source_Code,
c.Patient_Status_Code,
c.Patient_Amount_to_Pay,
c.patient_account_number
      from cohert c
      left join GH_OP_DX_query opdxp on opdxp.encounter_id = c.encounter_id      
                       and opdxp.Date_of_Service_From = c.Date_of_Service_From
                       and  opdxp.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdxp.Procedure_Code = c.Procedure_Code
                        and  opdxp.line = 1    
   left join GH_OP_DX_query opdx25 on opdx25.encounter_id = c.encounter_id      
                       and opdx25.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx25.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx25.Procedure_Code = c.Procedure_Code
                        and  opdx25.line = 25  
     left join GH_OP_DX_query opdx26 on opdx26.encounter_id = c.encounter_id      
                       and opdx26.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx26.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx26.Procedure_Code = c.Procedure_Code
                        and  opdx26.line = 26 
   left join GH_OP_DX_query opdx27 on opdx27.encounter_id = c.encounter_id      
                       and opdx27.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx27.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx27.Procedure_Code = c.Procedure_Code
                        and  opdx27.line = 27   
   left join GH_OP_DX_query opdx28 on opdx28.encounter_id = c.encounter_id      
                       and opdx28.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx28.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx28.Procedure_Code = c.Procedure_Code
                        and  opdx28.line = 28   
   left join GH_OP_DX_query opdx29 on opdx29.encounter_id = c.encounter_id      
                       and opdx29.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx29.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx29.Procedure_Code = c.Procedure_Code
                        and  opdx29.line = 29   
   left join GH_OP_DX_query opdx30 on opdx30.encounter_id = c.encounter_id      
                       and opdx30.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx30.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx30.Procedure_Code = c.Procedure_Code
                        and  opdx30.line = 30   
   left join GH_OP_DX_query opdx31 on opdx31.encounter_id = c.encounter_id      
                       and opdx31.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx31.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx31.Procedure_Code = c.Procedure_Code
                        and  opdx31.line = 31   
   left join GH_OP_DX_query opdx32 on opdx32.encounter_id = c.encounter_id      
                       and opdx32.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx32.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx32.Procedure_Code = c.Procedure_Code
                        and  opdx32.line = 32   
   left join GH_OP_DX_query opdx33 on opdx33.encounter_id = c.encounter_id      
                       and opdx33.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx33.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx33.Procedure_Code = c.Procedure_Code
                        and  opdx33.line = 33   
   left join GH_OP_DX_query opdx34 on opdx34.encounter_id = c.encounter_id      
                       and opdx34.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx34.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx34.Procedure_Code = c.Procedure_Code
                        and  opdx34.line = 34   
   left join GH_OP_DX_query opdx35 on opdx35.encounter_id = c.encounter_id      
                       and opdx35.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx35.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx35.Procedure_Code = c.Procedure_Code
                        and  opdx35.line = 35  
 left join GH_OP_DX_query opdx36 on opdx36.encounter_id = c.encounter_id      
                       and opdx36.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx36.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx36.Procedure_Code = c.Procedure_Code
                        and  opdx36.line = 36   
 left join GH_OP_DX_query opdx37 on opdx37.encounter_id = c.encounter_id      
                       and opdx37.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx37.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx37.Procedure_Code = c.Procedure_Code
                        and  opdx37.line = 37   
 left join GH_OP_DX_query opdx38 on opdx38.encounter_id = c.encounter_id      
                       and opdx38.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx38.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx38.Procedure_Code = c.Procedure_Code
                        and  opdx38.line = 38   
 left join GH_OP_DX_query opdx39 on opdx39.encounter_id = c.encounter_id      
                       and opdx39.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx39.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx39.Procedure_Code = c.Procedure_Code
                        and  opdx39.line = 39   
 left join GH_OP_DX_query opdx40 on opdx40.encounter_id = c.encounter_id      
                       and opdx40.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx40.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx40.line = 40 
left join GH_OP_DX_query opdx41 on opdx41.encounter_id = c.encounter_id      
                       and opdx41.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx41.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx41.line = 41 
left join GH_OP_DX_query opdx42 on opdx42.encounter_id = c.encounter_id      
                       and opdx42.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx42.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx42.line = 42 
left join GH_OP_DX_query opdx43 on opdx43.encounter_id = c.encounter_id      
                       and opdx43.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx43.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx43.line = 43 
left join GH_OP_DX_query opdx44 on opdx44.encounter_id = c.encounter_id      
                       and opdx44.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx44.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx44.line = 44 
left join GH_OP_DX_query opdx45 on opdx45.encounter_id = c.encounter_id      
                       and opdx45.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx45.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx45.line = 45 
left join GH_OP_DX_query opdx46 on opdx46.encounter_id = c.encounter_id      
                       and opdx46.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx46.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx46.line = 46 
left join GH_OP_DX_query opdx47 on opdx47.encounter_id = c.encounter_id      
                       and opdx47.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx47.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx47.line = 47
left join GH_OP_DX_query opdx48 on opdx48.encounter_id = c.encounter_id      
                       and opdx48.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx48.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx48.line = 48 







____________________________________________________________________________________________________________________________________________________________________________________________________________________________


---Final ouput has the DX codes in the correct format 49-72 dx codes.




with cohert as(

select distinct 
sent_Date,
claim_type,
IDC_Level,
opdx.Encounter_ID,
Risk_Assessment_code,
Member_ID_Health_Plan,
Member_ID_CMS_HICN,
Member_Site_Number,
Member_Name_Last,
Member_Name_First,
Member_Date_of_Birth,
main.Member_Gender,
Health_Plan_Name,
Facility_Name,
Provider_Name_First,
Provider_NPI,
Provider_Tax_ID,
Provider_ID_Statutory,
Provider_ID_Internal,
Provider_Specialty,
Bill_Type,
opdx.Date_of_Service_From,
opdx.Date_of_Service_Thru,
--Diagnosis_Code_Primary,
DIAGNOSIS_CODE_ADMITTING,
Revenue_Code,
Procedure_Code_Type,
Procedure_Code,
Procedure_Modifier,
Provider_Street_Address_1,
Provider_Street_Address_2,
Provider_city,
Provider_state,
Provider_zip_code,
Member_Street_Address_1,
Member_Street_Address_2,
Member_City,
Member_State_Code,
Member_Zip_Code,
Line_Charge,
Line_Units_Type,
Line_Units,
Provider_Signature_on_File,
Provider_Accepts_Assignment,
Benefits_Are_Assigned,
Release_of_Info_Ind,
Inpatient_Discharge_Time,
Admission_Type_Code,
Admission_Source_Code,
Patient_Status_Code,
Patient_Amount_to_Pay,
patient_account_number
 from
 GH_OP_DX_query opdx
 join GH_main_query1 main on main.encounter_id = opdx.encounter_id

 where 1=1
 and opdx.line > 49
) 
select distinct 
c.sent_Date,
c.claim_type,
c.IDC_Level,
c.Encounter_ID,
c.Risk_Assessment_code,
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
c.Bill_Type,
c.Date_of_Service_From,
c.Date_of_Service_Thru,
opdxp.dx as Diagnosis_Code_Primary,
c.DIAGNOSIS_CODE_ADMITTING,
opdx49.dx as Diagnosis_Code_1,
opdx50.dx as Diagnosis_Code_2,
opdx51.dx as Diagnosis_Code_3,
opdx52.dx as Diagnosis_Code_4,
opdx53.dx as Diagnosis_Code_5,
opdx54.dx as Diagnosis_Code_6,
opdx55.dx as Diagnosis_Code_7,
opdx56.dx as Diagnosis_Code_8,
opdx57.dx as Diagnosis_Code_9,
opdx58.dx as Diagnosis_Code_10,
opdx59.dx as Diagnosis_Code_11,
opdx60.dx as Diagnosis_Code_12,
opdx61.dx as Diagnosis_Code_13,
opdx62.dx as Diagnosis_Code_14,
opdx63.dx as Diagnosis_Code_15,
opdx64.dx as Diagnosis_Code_16,
opdx65.dx as Diagnosis_Code_17,
opdx66.dx as Diagnosis_Code_18,
opdx67.dx as Diagnosis_Code_19,
opdx68.dx as Diagnosis_Code_20,
opdx69.dx as Diagnosis_Code_21,
opdx70.dx as Diagnosis_Code_22,
opdx71.dx as Diagnosis_Code_23,
opdx72.dx as Diagnosis_Code_24,
c.Revenue_Code,
c.Procedure_Code_Type,
c.Procedure_Code,
c.Procedure_Modifier,
c.Provider_Street_Address_1,
c.Provider_Street_Address_2,
c.Provider_city,
c.Provider_state,
c.Provider_zip_code,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
c.Line_Charge,
c. Line_Units_Type,
c. Line_Units,
c.Provider_Signature_on_File,
c.Provider_Accepts_Assignment,
c.Benefits_Are_Assigned,
c.Release_of_Info_Ind,
c.Inpatient_Discharge_Time,
c.Admission_Type_Code,
c.Admission_Source_Code,
c.Patient_Status_Code,
c.Patient_Amount_to_Pay,
c.patient_account_number
      from cohert c
      left join GH_OP_DX_query opdxp on opdxp.encounter_id = c.encounter_id      
                       and opdxp.Date_of_Service_From = c.Date_of_Service_From
                       and  opdxp.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdxp.Procedure_Code = c.Procedure_Code
                        and  opdxp.line = 1    
   left join GH_OP_DX_query opdx49 on opdx49.encounter_id = c.encounter_id      
                       and opdx49.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx49.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx25.Procedure_Code = c.Procedure_Code
                        and  opdx49.line = 49  
     left join GH_OP_DX_query opdx50 on opdx50.encounter_id = c.encounter_id      
                       and opdx50.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx50.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx26.Procedure_Code = c.Procedure_Code
                        and  opdx50.line = 50 
   left join GH_OP_DX_query opdx51 on opdx51.encounter_id = c.encounter_id      
                       and opdx51.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx51.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx27.Procedure_Code = c.Procedure_Code
                        and  opdx51.line = 51   
   left join GH_OP_DX_query opdx52 on opdx52.encounter_id = c.encounter_id      
                       and opdx52.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx52.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx28.Procedure_Code = c.Procedure_Code
                        and  opdx52.line = 52   
   left join GH_OP_DX_query opdx53 on opdx53.encounter_id = c.encounter_id      
                       and opdx53.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx53.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx29.Procedure_Code = c.Procedure_Code
                        and  opdx53.line = 53   
   left join GH_OP_DX_query opdx54 on opdx54.encounter_id = c.encounter_id      
                       and opdx54.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx54.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx30.Procedure_Code = c.Procedure_Code
                        and  opdx54.line = 54   
   left join GH_OP_DX_query opdx55 on opdx55.encounter_id = c.encounter_id      
                       and opdx55.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx55.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx31.Procedure_Code = c.Procedure_Code
                        and  opdx55.line = 55   
   left join GH_OP_DX_query opdx56 on opdx56.encounter_id = c.encounter_id      
                       and opdx56.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx56.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx32.Procedure_Code = c.Procedure_Code
                        and  opdx56.line = 56   
   left join GH_OP_DX_query opdx57 on opdx57.encounter_id = c.encounter_id      
                       and opdx57.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx57.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx33.Procedure_Code = c.Procedure_Code
                        and  opdx57.line = 57   
   left join GH_OP_DX_query opdx58 on opdx58.encounter_id = c.encounter_id      
                       and opdx58.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx58.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx34.Procedure_Code = c.Procedure_Code
                        and  opdx58.line = 58   
   left join GH_OP_DX_query opdx59 on opdx59.encounter_id = c.encounter_id      
                       and opdx59.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx59.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx35.Procedure_Code = c.Procedure_Code
                        and  opdx59.line = 59 
 left join GH_OP_DX_query opdx60 on opdx60.encounter_id = c.encounter_id      
                       and opdx60.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx60.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx36.Procedure_Code = c.Procedure_Code
                        and  opdx60.line = 60   
 left join GH_OP_DX_query opdx61 on opdx61.encounter_id = c.encounter_id      
                       and opdx61.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx61.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx37.Procedure_Code = c.Procedure_Code
                        and  opdx61.line = 61   
 left join GH_OP_DX_query opdx62 on opdx62.encounter_id = c.encounter_id      
                       and opdx62.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx62.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx38.Procedure_Code = c.Procedure_Code
                        and  opdx62.line = 62   
 left join GH_OP_DX_query opdx63 on opdx63.encounter_id = c.encounter_id      
                       and opdx63.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx63.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx39.Procedure_Code = c.Procedure_Code
                        and  opdx63.line = 63   
 left join GH_OP_DX_query opdx64 on opdx64.encounter_id = c.encounter_id      
                       and opdx64.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx64.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx64.line = 64 
left join GH_OP_DX_query opdx65 on opdx65.encounter_id = c.encounter_id      
                       and opdx65.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx65.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx65.line = 65 
left join GH_OP_DX_query opdx66 on opdx66.encounter_id = c.encounter_id      
                       and opdx66.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx66.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx66.line = 66 
left join GH_OP_DX_query opdx67 on opdx67.encounter_id = c.encounter_id      
                       and opdx67.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx67.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx67.line = 67 
left join GH_OP_DX_query opdx68 on opdx68.encounter_id = c.encounter_id      
                       and opdx68.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx68.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx68.line = 68 
left join GH_OP_DX_query opdx69 on opdx69.encounter_id = c.encounter_id      
                       and opdx69.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx69.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx69.line = 69 
left join GH_OP_DX_query opdx70 on opdx70.encounter_id = c.encounter_id      
                       and opdx70.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx70.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx70.line = 70 
left join GH_OP_DX_query opdx71 on opdx71.encounter_id = c.encounter_id      
                       and opdx71.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx71.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx71.line = 71
left join GH_OP_DX_query opdx72 on opdx72.encounter_id = c.encounter_id      
                       and opdx72.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx72.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx72.line = 72 



