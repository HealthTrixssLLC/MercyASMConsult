--drop table UHC_main_query;


create table UHC_main_query as
select distinct
'DTL' Segment_Type,
ha.hsp_account_id  as REF#,
pat.pat_last_name,
pat.pat_first_name,
cast(null as varchar2(1)) MI,
to_char(pat.birth_date,'MM/DD/YYYY') DOB, 
case
            when length(substr(replace(cvg.subscr_num, ',', ''), 1, 9)) = 7
                then substr(replace(cvg.subscr_num, ',', ''), 1, 9) || '01'
            else substr(replace(cvg.subscr_num, ',', ''), 1, 9)
            end as plan_id,
cast(null as number) RETRIEVAL_NPI ,
case 
when pat.sex_c = 1 then 'F'
when pat.sex_c = 2 then 'M'
else pat.sex_c
end as GENDER,
cast(null as number)  Medicare_STATE_CODE,
regexp_replace(regexp_replace(cvg.medicare_subscr_id,'[- ]',''),'[|]', '')  as "MBI- need either member ID or HIC",
cvg.medicare_subscr_id,
to_char(ha.adm_date_time, 'mm/dd/yyyy') as FDOS,
to_char(ha.disch_date_time, 'mm/dd/yyyy')AS TDOS,
case when ha.acct_basecls_ha_c = 1 then '111' 
else '131' 
end as BILL_TYPE,
cast(null as number)as NU_INDICATOR,
cast(null as number) as PROV_ID,
cv.bil_prov_npi as NPI,
'I' as PROV_TYPE,
LOC.LOC_NAME as FACILITY_NM,
-- refser.prov_last_name as rend_Prov_Last,
--refser.prov_first_name as rend_prov_first,
cv2.att_prov_nam_last,
cv2.att_prov_nam_first,
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
When '00' then '99'
else '99'
end as  CMS_Specialty_Type,
cv.bil_prov_taxid as TAX_ID,
case when ha.acct_basecls_ha_c <> 1
then substr(sli.ln_proc_cd, 1, 5)
else cast(null as varchar2(5))
end as CPT_CODE,
--cast(null as number) CPT_CODE,
sli.ln_rev_cd REV_CODE,
cast(null as date) Service_Detail_DOS_From,
cast(null as date) Service_Detail_DOS_Thru,
cast(null as number) POS,
'0' ICD_INDIC,
'A' Risk_Assessment_Code,
cast(null as number) Chart_Barcode,
cast(null as number) Chart_Encounter_Key,
cast(null as number) Chart_DX_Key,
cast(null as number) Contract_ID,
pat.add_line_1 Member_Street_Address,
pat.add_line_2 member_Address_2,
pat.city Member_City,
st.abbr Member_State,
rpad(pat.zip,5) Member_zip_Code,
'12345' Claim_ID_Patient_Control_Number
from clarity.clm_value_record cvr
join clarity.clm_values cv on cvr.record_id = cv.record_id
join clarity.svc_ln_info sli on cvr.record_id = sli.record_id
JOIN HSP_CLAIM_DETAIL2 HCD ON CVR.RECORD_ID = HCD.CLM_EXT_VAL_ID 
JOIN COVERAGE CVG ON HCD.SG_CVG_ID = CVG.coverage_id
join patient pat on HCD.sg_pat_ID = pat.pat_id
left join zc_state st on st.state_c = pat.state_c
inner join hsp_bucket bkt on hcd.hlb_id=bkt.bucket_id
inner join hsp_account ha on bkt.hsp_account_id = ha.hsp_account_id
--JOIN clarity.clarity_epp epp on cvg.plan_id = epp.benefit_plan_id
JOIN clarity.clarity_loc loc on HCD.SG_loc_id = LOC.LOC_ID
join clarity.clm_values_2 cv2 on cvr.record_id = cv2.record_id
left join bi_clarity.mv_ref_ser refser on  ha.attending_prov_id = refser.prov_id 
where 1=1
 and cvr.clm_typ_c = 2 ---- Institutional Claim 
and (cv.bill_typ_fac_cd in (11, 12, 18) or
(cv.bill_typ_fac_cd in (13, 14, 71, 73, 76, 77, 85) 
 )
)
and sli.line = 1   ------- rev code not needed
and (sli.ln_proc_cd in (select distinct proc_code from lareed4.sweeps_cpt_hcpcs_list_2025)----lareed4.sweeps_cpt_hcpcs_list_2022)
     or sli.ln_proc_cd is null)
and bkt.bkt_sts_ha_c != 8  --rejected
and HCD.SG_loc_id in (40006,    --    PARENT MERCY ST FRANCIS HOSPITAL  ------------------sgf
40001,--    PARENT MERCY HOSPITAL SPRINGFIELD   
40002,--    PARENT MERCY HOSPITAL LEBANON   
40003,--    PARENT MERCY HOSPITAL AURORA   
40004,--    PARENT MERCY HOSPITAL BERRYVILLE   
40005, --    PARENT MERCY HOSPITAL CASSVILLE   
90003,  --PARENT MERCY HOSPITAL CARTHAGE
90001,   -- PARENT MERCY HOSPITAL JOPLIN
90002, --PARENT MERCY HOSPITAL PITTSBURG
90005,---- PARENT MERCY SPECIALTY HOSPITAL SOUTHEAST KANSAS
90004,  --PARENT MERCY MAUDE NORTON HOSPITAL COLUMBUS
50001, --       PARENT MERCY HOSPITAL HEALDTON
50003, --              PARENT MERCY HOSPITAL OKLAHOMA CITY   ---OK
50004, --              PARENT MERCY HOSPITAL ARDMORE
50005, --              PARENT MERCY HOSPITAL TISHOMINGO
50006, --              PARENT MERCY HOSPITAL WATONGA
50007, --              PARENT MERCY HOSPITAL ADA
50009, --              PARENT MERCY HOSPITAL LOGAN COUNTY
50011, --              PARENT MERCY HOSPITAL KINGFISHER
20001, --    PARENT MERCY HOSPITAL ST LOUIS  ------------east
20002, --    PARENT MERCY HOSPITAL WASHINGTON 
20003, --     PARENT MERCY REHABILITATION HOSPITAL ST LOUIS
20008, ---     PARENT MERCY REHABILITATION HOSPITAL SOUTH  
20004, --    PARENT MERCY HOSPITAL JEFFERSON   
20006, --    PARENT MERCY HOSPITAL LINCOLN   
20007,  --PARENT MERCY HOSPITAL SOUTH
20010,  --PARENT MERCY HOSPITAL PERRY
20012,  --PARENT MERCY HOSPITAL SOUTHEAST
80001, ----------NWA 
70001, ---PARENT MERCY HOSPITAL WALDRON (FORT SMITH GROUP)
70002, ---PARENT MERCY HOSPITAL PARIS (FORT SMITH GROUP)
70003, ------PARENT MERCY HOSPITAL OZARK (FORT SMITH GROUP)
70005,   ----PARENT MERCY HOSPITAL BOONEVILLE (FORT SMITH GROUP)
70004) --------------	PARENT MERCY HOSPITAL FORT SMITH  
and HCD.UB_THROUGH_DT >= '01-JAN-25'
and HCD.UB_THROUGH_DT < '01-JAN-26'
and HCD.SG_plan_id in (2039201,	--UBH MEDICARE 87726 
2039801,	--UNITED HEALTHCARE MCR 87726 
2039802,	--UHC DUAL COMPLETE MC HMO SNP 87726 
2039803,	--UNITED HEALTHCARE MCR 87726 
2039804,	--UNITED HEALTHCARE PPO SNP MCR 87726 
32039201,	--UBH MEDICARE 87726 CONTRACTED 
32039801,	--UNITED HEALTHCARE MCR 87726 CONTRACTED 
32039802,	--UHC DUAL COMPLETE MC HMO SNP 87726 CONTRACTED 
32039803,	--UNITED HEALTHCARE MCR 87726 CONTRACTED 
32039804,	--UNITED HEALTHCARE PPO SNP MCR 87726 CONTRACTED 
42039201,	--UBH MEDICARE 87726 NON-CONTRACTED 
42039801,	--UNITED HEALTHCARE MCR 87726 NON-CONTRACTED 
42039802,	--UHC DUAL COMPLETE MC HMO SNP 87726 NON-CONTRACTED 
42039803,	--UNITED HEALTHCARE MCR 87726 NON-CONTRACTED 
42039804)	--UNITED HEALTHCARE PPO SNP MCR 87726 NON-CONTRACTED 
group by 
 ha.hsp_account_Id ,
pat.pat_last_name,
pat.pat_first_name,
pat.birth_date,
cvg.subscr_num ,
pat.sex_c ,
cvg.medicare_subscr_id,
ha.adm_date_time,
ha.disch_date_time,
ha.acct_basecls_ha_c,
cv.bil_prov_npi,
LOC.LOC_NAME ,
cv2.att_prov_nam_last,
cv2.att_prov_nam_first,
cv.bil_prov_taxid ,
sli.ln_proc_cd,
sli.ln_rev_cd,
pat.add_line_1,
pat.add_line_2 ,
pat.city ,
st.abbr ,
pat.zip