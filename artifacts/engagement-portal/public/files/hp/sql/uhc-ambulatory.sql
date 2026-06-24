--drop table UHC_main_query;

create table UHC_main_query as
select
'DTL' "Segment Type",
loc.loc_id,
txi.tx_id "Tax ID1",
ibi.inv_num "REF#",
pat.pat_last_name,
pat.pat_first_name,
cast(null as varchar2(1))  "MI",
to_char(pat.birth_date,'MM/DD/YYYY') as "DOB",
case
            when length(substr(replace(cvg.subscr_num, ',', ''), 1, 9)) = 7
                then substr(replace(cvg.subscr_num, ',', ''), 1, 9) || '01'
            else substr(replace(cvg.subscr_num, ',', ''), 1, 9)
            end as "Plan ID- need either member ID or MBI/HIC",
cast(null as number) as "RETRIEVAL_NPI",
case 
when pat.sex_c = 1 then 'F'
when pat.sex_c = 2 then 'M'
else pat.sex_c
end as "GENDER",
cast(null as number)  "Member Medicare STATE CODE",
regexp_replace(regexp_replace(cvg.medicare_subscr_id,'[- ]',''),'[|]', '')  as "MBI- need either member ID or HIC",
to_char(arpb.service_date,'MM/DD/YYYY')   AS FDOS,
to_char(arpb.service_date,'MM/DD/YYYY')  AS TDOS,
cast(null as number) "BILL TYPE- Institutional Only",
cast(null as number)  "NU INDICATOR",
cast(null as number)  "PROV ID",
ser2.npi as NPI,
'P' Prov_Type,
cast(null as number) as "Facilty Name",
initcap(SUBSTR(TRIM(SUBSTR(ser.PROV_NAME,1,DECODE(INSTR(ser.PROV_NAME,','),0,30,INSTR(ser.PROV_NAME,',')-1))),1,30)) as PROV_LAST_NAME,
initcap(SUBSTR(REGEXP_SUBSTR(REGEXP_SUBSTR(ser.PROV_NAME,',([ ]|[[:alpha:]])[[:alpha:]]+'),'[[:alpha:]]+'),1,30)) as PROV_FIRST_NAME,
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
end as  CMS_Specialty_Type,
inv.tax_id as  "Tax ID",
arpb.cpt_code as "CPT",
cast(null as number)  "Rev Code",
cast(null as date)  "Service Detail DOS From",
cast(null as date)  "Service Detail DOS Thru",
substr(pos.pos_code,1,20) "POS",
'0' "ICD INDIC",
 case 
when substr(pos.pos_code,1,20) in ('12','13') then 'C' else 'A'  
  end 	as "Risk_Assessment_Code",
cast(null as number)  "Chart Barcode -A/N (100)",
cast(null as number)  "Chart Encounter Key",
cast(null as number)  "Chart DX Key",
cast(null as number)  "Contract ID",
pat.add_line_1 "Member Street Address",
pat.add_line_2 "member Address 2",
pat.city "Member City",
st.abbr "Member State",
rpad(pat.zip,5) "Member Zip Code",
ibi.inv_num "CLAIMID PCN"
from invoice inv
join inv_basic_info ibi on inv.invoice_id = ibi.inv_id
join clarity.svc_ln_info sli on ibi.clm_ext_val_id = SLI.RECORD_ID
JOIN HSP_ACCOUNT HA ON inv.visit_number = HA.HSP_ACCOUNT_ID
join clarity.clarity_loc loc on HA.loc_id = loc.loc_id 
join clarity.clm_values cv on cv.record_id = sli.record_id 
join clarity.clm_values_2 cv2 on sli.record_id = cv2.record_id
join bi_clarity.mv_ref_ser refser on ha.attending_prov_id = refser.prov_id
join coverage cvg on ibi.cvg_id = cvg.coverage_id
join tx_invoices txi on inv.invoice_id = txi.invoice_id
and txi.line = 1
join arpb_transactions arpb on txi.tx_id = arpb.tx_id 
left join patient pat on pat.pat_id = arpb.patient_id
left join zc_state st on st.state_c = pat.state_c
join clarity_ser ser on arpb.serv_provider_id = ser.prov_id 
join clarity_ser_2 ser2 on ser2.prov_id = ser.prov_id 
join clarity_pos pos on pos.pos_id = arpb.pos_id
where 1=1
AND SLI.LINE = 1 
and ibi.inv_status_c not in (4,5,7,8)    ------- Errors, rejected, removes voids and removed claims
--        and loc.loc_id in (40006,    --    PARENT MERCY ST FRANCIS HOSPITAL  ------------------sgf
--40001,--    PARENT MERCY HOSPITAL SPRINGFIELD   
--40002,--    PARENT MERCY HOSPITAL LEBANON   
--40003,--    PARENT MERCY HOSPITAL AURORA   
--40004,--    PARENT MERCY HOSPITAL BERRYVILLE   
--40005, --    PARENT MERCY HOSPITAL CASSVILLE   
--90003,  --PARENT MERCY HOSPITAL CARTHAGE
--90001,   -- PARENT MERCY HOSPITAL JOPLIN
--90002, --PARENT MERCY HOSPITAL PITTSBURG
--90005,---- PARENT MERCY SPECIALTY HOSPITAL SOUTHEAST KANSAS
--90004)  --PARENT MERCY MAUDE NORTON HOSPITAL COLUMBUS
--and loc.loc_id in(50001, --       PARENT MERCY HOSPITAL HEALDTON
--50003, --              PARENT MERCY HOSPITAL OKLAHOMA CITY   ---OK
--50004, --              PARENT MERCY HOSPITAL ARDMORE
--50005, --              PARENT MERCY HOSPITAL TISHOMINGO
--50006, --              PARENT MERCY HOSPITAL WATONGA
--50007, --              PARENT MERCY HOSPITAL ADA
--50009, --              PARENT MERCY HOSPITAL LOGAN COUNTY
--50011) --              PARENT MERCY HOSPITAL KINGFISHER
--and loc.loc_id in (20001, --    PARENT MERCY HOSPITAL ST LOUIS  ------------east
--20002, --    PARENT MERCY HOSPITAL WASHINGTON  
-- 20003, --     PARENT MERCY REHABILITATION HOSPITAL ST LOUIS
-- 20008, ---     PARENT MERCY REHABILITATION HOSPITAL SOUTH
--20004, --    PARENT MERCY HOSPITAL JEFFERSON  
--20006, --    PARENT MERCY HOSPITAL LINCOLN
--20007,  --PARENT MERCY HOSPITAL SOUTH
--20010,  --PARENT MERCY HOSPITAL PERRY
--20012)  --PARENT MERCY HOSPITAL SOUTHEAST
-- and loc.loc_id = '80001' --------------------NWA 
--and loc.loc_id in( '70004', -------------------	PARENT MERCY HOSPITAL FORT SMITH 
--'70001', ---PARENT MERCY HOSPITAL WALDRON
--'70002', ---PARENT MERCY HOSPITAL PARIS
--'70003', ------PARENT MERCY HOSPITAL OZARK
--'70005')   ---PARENT MERCY HOSPITAL BOONEVILLE


and ibi.EPP_ID in (2039201,	--UBH MEDICARE 87726 
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
and ibi.to_svc_date  >= '01-JAN-25'
and ibi.to_svc_date  < '01-JAN-26'
and ( cv.bill_typ_fac_cd in (11, 12, 18) or
        ( cv.bill_typ_fac_cd in (13, 14, 71, 73, 76, 77, 85
        , 02, 22 --- added 02,22 on 7/15 due to it eliminating a confidential OV and ECHO identified as needing to be on
        , 19, 21, 23, 31, 33) ------- based off of previously submitted files for Humana
        )
        )
and arpb.cpt_code in (select distinct proc_code from lareed4.sweeps_cpt_hcpcs_list_2025)
group by
txi.tx_id,
loc.loc_id,
ibi.inv_num, 
pat.pat_last_name,
pat.pat_first_name,
pat.birth_date,
CVG.SUBSCR_NUM ,
cv.sub_id ,
pat.sex_c,
CVG.MEDICARE_SUBSCR_ID ,
arpb.service_date,
ser2.npi,
ser.PROV_NAME, 
inv.tax_id,
pat.add_line_1,
pat.add_line_2 ,
pat.city, 
st.abbr, 
pat.zip,
pos.pos_code,
inv.invoice_ID,
arpb.cpt_code






-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--DX Code query grabs all the DX codes from the UHC_main_query

--drop table UHC_OP_DX_query;

create table UHC_OP_DX_query as
select distinct main.ref#,
main.FDOS,
main.TDOS,
replace(vdx.dx_code,'.','') as dx,
DENSE_RANK() OVER (PARTITION BY ref#,cpt,fdos,tdos ORDER BY ref#,fdos,tdos,line ASC) line,
main.cpt
from  UHC_main_query main 
 join v_arpb_coding_dx vdx on main."Tax ID1" = vdx.tx_id
                                  and vdx.source_key = 3
 where 1=1
 --and vdx.dx_code not in (select dx_dec from alpeter2.alp_cancer_dx)--lareed4.cancer_dx_2022) removed by JS 12/13/2024
 and vdx.dx_code is not null
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---Final ouput has the DX codes in the correct format up to 40 dx codes.



with cohert as(

select distinct 'DTL' "Segment Type",
--"Tax ID1",
opdx.REF# "REF#",
pat_last_name,
pat_first_name,
"MI",
DOB,--  'D-M-YYYY','YYYYMMDD'),
"Plan ID- need either member ID or MBI/HIC",
--member_id_check "member_id_check",
"RETRIEVAL_NPI",
GENDER "Gender",
"Member Medicare STATE CODE",
case when length("MBI- need either member ID or HIC") <> 11 then ''
when "MBI- need either member ID or HIC" ='00000000000' then ''
when "MBI- need either member ID or HIC" ='99999999999' then ''
else "MBI- need either member ID or HIC" 
end as "MBI- need either member ID or HIC",
opdx.FDOS "FDOS",
opdx.TDOS "TDOS",
'131' "BILL TYPE- Institutional Only",
"NU INDICATOR",
"PROV ID",
NPI "NPI",
'P' "Prov_Type",
' ' "Facilty Name",
PROV_LAST_NAME,
PROV_FIRST_NAME,
CMS_Specialty_Type "CMS_Specialty_Type",
"Tax ID",                                          
opdx."CPT",
"Rev Code",
"Service Detail DOS From",
"Service Detail DOS Thru",
POS "POS",
'0' "ICD INDIC",
 "Risk_Assessment_Code",
"Chart Barcode -A/N (100)",
"Chart Encounter Key",
"Chart DX Key",
"Contract ID",
"Member Street Address",
"member Address 2",
"Member City",
"Member State",
"Member Zip Code",
"CLAIMID PCN"
 from
 UHC_OP_DX_query opdx
 join UHC_main_query main on main.ref# = opdx.ref#

 where 1=1
) 
select distinct c.*,
opdx1.dx as dx_1,
opdx2.dx as dx_2,
opdx3.dx as dx_3,
opdx4.dx as dx_4,
opdx5.dx as dx_5,
opdx6.dx as dx_6,
opdx7.dx as dx_7,
opdx8.dx as dx_8,
opdx9.dx as dx_9,
opdx10.dx as dx_10,
opdx11.dx as dx_11,
opdx12.dx as dx_12,
opdx13.dx as dx_13,
opdx14.dx as dx_14,
opdx15.dx as dx_15,
opdx16.dx as dx_16,
opdx17.dx as dx_17,
opdx18.dx as dx_18,
opdx19.dx as dx_19,
opdx20.dx as dx_20,
opdx21.dx as dx_21,
opdx22.dx as dx_22,
opdx23.dx as dx_23,
opdx24.dx as dx_24,
opdx25.dx as dx_25,
opdx26.dx as dx_26,
opdx27.dx as dx_27,
opdx28.dx as dx_28,
opdx29.dx as dx_29,
opdx30.dx as dx_30,
opdx31.dx as dx_31,
opdx32.dx as dx_32,
opdx33.dx as dx_33,
opdx34.dx as dx_34,
opdx35.dx as dx_35,
opdx36.dx as dx_36,
opdx37.dx as dx_37,
opdx38.dx as dx_38,
opdx39.dx as dx_39,
opdx40.dx as dx_40
      from cohert c
  left join UHC_OP_DX_query opdx1 on opdx1.ref# = c.ref#      
                       and opdx1.FDOS = c.FDOS
                       and  opdx1.TDOS = c.TDOS  
                       and   opdx1.cpt = c.cpt
                        and  opdx1.line = 1                   
   left join UHC_OP_DX_query opdx2 on opdx2.ref# = c.ref#      
                       and opdx2.FDOS = c.FDOS
                       and  opdx2.TDOS = c.TDOS  
                       and   opdx2.cpt = c.cpt
                        and  opdx2.line = 2                                     
   left join UHC_OP_DX_query opdx3 on opdx3.ref# = c.ref#      
                       and opdx3.FDOS = c.FDOS
                       and  opdx3.TDOS = c.TDOS  
                       and   opdx3.cpt = c.cpt
                        and  opdx3.line = 3   
    left join UHC_OP_DX_query opdx4 on opdx4.ref# = c.ref#      
                       and opdx4.FDOS = c.FDOS
                       and  opdx4.TDOS = c.TDOS  
                       and   opdx4.cpt = c.cpt
                        and  opdx4.line = 4   
   left join UHC_OP_DX_query opdx5 on opdx5.ref# = c.ref#      
                       and opdx5.FDOS = c.FDOS
                       and  opdx5.TDOS = c.TDOS  
                       and   opdx5.cpt = c.cpt
                        and  opdx5.line = 5   
   left join UHC_OP_DX_query opdx6 on opdx6.ref# = c.ref#      
                       and opdx6.FDOS = c.FDOS
                       and  opdx6.TDOS = c.TDOS  
                       and   opdx6.cpt = c.cpt
                        and  opdx6.line = 6   
   left join UHC_OP_DX_query opdx7 on opdx7.ref# = c.ref#      
                       and opdx7.FDOS = c.FDOS
                       and  opdx7.TDOS = c.TDOS  
                       and   opdx7.cpt = c.cpt
                        and  opdx7.line = 7   
   left join UHC_OP_DX_query opdx8 on opdx8.ref# = c.ref#      
                       and opdx8.FDOS = c.FDOS
                       and  opdx8.TDOS = c.TDOS  
                       and   opdx8.cpt = c.cpt
                        and  opdx8.line = 8   
   left join UHC_OP_DX_query opdx9 on opdx9.ref# = c.ref#      
                       and opdx9.FDOS = c.FDOS
                       and  opdx9.TDOS = c.TDOS  
                       and   opdx9.cpt = c.cpt
                        and  opdx9.line = 9   
   left join UHC_OP_DX_query opdx10 on opdx10.ref# = c.ref#      
                       and opdx10.FDOS = c.FDOS
                       and  opdx10.TDOS = c.TDOS  
                       and   opdx10.cpt = c.cpt
                        and  opdx10.line = 10   
   left join UHC_OP_DX_query opdx11 on opdx11.ref# = c.ref#      
                       and opdx11.FDOS = c.FDOS
                       and  opdx11.TDOS = c.TDOS  
                       and   opdx11.cpt = c.cpt
                        and  opdx11.line = 11   
   left join UHC_OP_DX_query opdx12 on opdx12.ref# = c.ref#      
                       and opdx12.FDOS = c.FDOS
                       and  opdx12.TDOS = c.TDOS  
                       and   opdx12.cpt = c.cpt
                        and  opdx12.line = 12   
   left join UHC_OP_DX_query opdx13 on opdx13.ref# = c.ref#      
                       and opdx13.FDOS = c.FDOS
                       and  opdx13.TDOS = c.TDOS  
                       and   opdx13.cpt = c.cpt
                        and  opdx13.line = 13   
   left join UHC_OP_DX_query opdx14 on opdx14.ref# = c.ref#      
                       and opdx14.FDOS = c.FDOS
                       and  opdx14.TDOS = c.TDOS  
                       and   opdx14.cpt = c.cpt
                       and  opdx14.line = 14   
   left join UHC_OP_DX_query opdx15 on opdx15.ref# = c.ref#      
                       and opdx15.FDOS = c.FDOS
                       and  opdx15.TDOS = c.TDOS  
                       and   opdx15.cpt = c.cpt
                        and  opdx15.line = 15   
   left join UHC_OP_DX_query opdx16 on opdx16.ref# = c.ref#      
                       and opdx16.FDOS = c.FDOS
                       and  opdx16.TDOS = c.TDOS  
                       and   opdx16.cpt = c.cpt
                        and  opdx16.line = 16   
    left join UHC_OP_DX_query opdx17 on opdx17.ref# = c.ref#      
                       and opdx17.FDOS = c.FDOS
                       and  opdx17.TDOS = c.TDOS  
                       and   opdx17.cpt = c.cpt
                        and  opdx17.line = 17   
   left join UHC_OP_DX_query opdx18 on opdx18.ref# = c.ref#      
                       and opdx18.FDOS = c.FDOS
                       and  opdx18.TDOS = c.TDOS  
                       and   opdx18.cpt = c.cpt
                        and  opdx18.line = 18   
   left join UHC_OP_DX_query opdx19 on opdx19.ref# = c.ref#      
                       and opdx19.FDOS = c.FDOS
                       and  opdx19.TDOS = c.TDOS  
                       and   opdx19.cpt = c.cpt
                        and  opdx19.line = 19   
   left join UHC_OP_DX_query opdx20 on opdx20.ref# = c.ref#      
                       and opdx20.FDOS = c.FDOS
                       and  opdx20.TDOS = c.TDOS  
                       and   opdx20.cpt = c.cpt
                        and  opdx20.line = 20   
   left join UHC_OP_DX_query opdx21 on opdx21.ref# = c.ref#      
                       and opdx21.FDOS = c.FDOS
                       and  opdx21.TDOS = c.TDOS  
                       and   opdx21.cpt = c.cpt
                        and  opdx21.line = 21   
   left join UHC_OP_DX_query opdx22 on opdx22.ref# = c.ref#      
                       and opdx22.FDOS = c.FDOS
                       and  opdx22.TDOS = c.TDOS  
                       and   opdx22.cpt = c.cpt
                        and  opdx22.line = 22   
   left join UHC_OP_DX_query opdx23 on opdx23.ref# = c.ref#      
                       and opdx23.FDOS = c.FDOS
                       and  opdx23.TDOS = c.TDOS  
                       and   opdx23.cpt = c.cpt
                        and  opdx23.line = 23   
   left join UHC_OP_DX_query opdx24 on opdx24.ref# = c.ref#      
                       and opdx24.FDOS = c.FDOS
                       and  opdx24.TDOS = c.TDOS  
                       and   opdx24.cpt = c.cpt
                        and  opdx24.line = 24   
   left join UHC_OP_DX_query opdx25 on opdx25.ref# = c.ref#      
                       and opdx25.FDOS = c.FDOS
                       and  opdx25.TDOS = c.TDOS  
                       and   opdx25.cpt = c.cpt
                        and  opdx25.line = 25  
     left join UHC_OP_DX_query opdx26 on opdx26.ref# = c.ref#      
                       and opdx26.FDOS = c.FDOS
                       and  opdx26.TDOS = c.TDOS  
                       and   opdx26.cpt = c.cpt
                        and  opdx26.line = 26 
   left join UHC_OP_DX_query opdx27 on opdx27.ref# = c.ref#      
                       and opdx27.FDOS = c.FDOS
                       and  opdx27.TDOS = c.TDOS  
                       and   opdx27.cpt = c.cpt
                        and  opdx27.line = 27   
   left join UHC_OP_DX_query opdx28 on opdx28.ref# = c.ref#      
                       and opdx28.FDOS = c.FDOS
                       and  opdx28.TDOS = c.TDOS  
                       and   opdx28.cpt = c.cpt
                        and  opdx28.line = 28   
   left join UHC_OP_DX_query opdx29 on opdx29.ref# = c.ref#      
                       and opdx29.FDOS = c.FDOS
                       and  opdx29.TDOS = c.TDOS  
                       and   opdx29.cpt = c.cpt
                        and  opdx29.line = 29   
   left join UHC_OP_DX_query opdx30 on opdx30.ref# = c.ref#      
                       and opdx30.FDOS = c.FDOS
                       and  opdx30.TDOS = c.TDOS  
                       and   opdx30.cpt = c.cpt
                        and  opdx30.line = 30   
   left join UHC_OP_DX_query opdx31 on opdx31.ref# = c.ref#      
                       and opdx31.FDOS = c.FDOS
                       and  opdx31.TDOS = c.TDOS  
                       and   opdx31.cpt = c.cpt
                        and  opdx31.line = 31   
   left join UHC_OP_DX_query opdx32 on opdx32.ref# = c.ref#      
                       and opdx32.FDOS = c.FDOS
                       and  opdx32.TDOS = c.TDOS  
                       and   opdx32.cpt = c.cpt
                        and  opdx32.line = 32   
   left join UHC_OP_DX_query opdx33 on opdx33.ref# = c.ref#      
                       and opdx33.FDOS = c.FDOS
                       and  opdx33.TDOS = c.TDOS  
                       and   opdx33.cpt = c.cpt
                        and  opdx33.line = 33   
   left join UHC_OP_DX_query opdx34 on opdx34.ref# = c.ref#      
                       and opdx34.FDOS = c.FDOS
                       and  opdx34.TDOS = c.TDOS  
                       and   opdx34.cpt = c.cpt
                        and  opdx34.line = 34   
   left join UHC_OP_DX_query opdx35 on opdx35.ref# = c.ref#      
                       and opdx35.FDOS = c.FDOS
                       and  opdx35.TDOS = c.TDOS  
                       and   opdx35.cpt = c.cpt
                        and  opdx35.line = 35  
 left join UHC_OP_DX_query opdx36 on opdx36.ref# = c.ref#      
                       and opdx36.FDOS = c.FDOS
                       and  opdx36.TDOS = c.TDOS  
                       and   opdx36.cpt = c.cpt
                        and  opdx36.line = 36   
 left join UHC_OP_DX_query opdx37 on opdx37.ref# = c.ref#      
                       and opdx37.FDOS = c.FDOS
                       and  opdx37.TDOS = c.TDOS  
                       and   opdx37.cpt = c.cpt
                        and  opdx37.line = 37   
 left join UHC_OP_DX_query opdx38 on opdx38.ref# = c.ref#      
                       and opdx38.FDOS = c.FDOS
                       and  opdx38.TDOS = c.TDOS  
                       and   opdx38.cpt = c.cpt
                        and  opdx38.line = 38   
 left join UHC_OP_DX_query opdx39 on opdx39.ref# = c.ref#      
                       and opdx39.FDOS = c.FDOS
                       and  opdx39.TDOS = c.TDOS  
                       and   opdx39.cpt = c.cpt
                        and  opdx39.line = 39   
 left join UHC_OP_DX_query opdx40 on opdx40.ref# = c.ref#      
                       and opdx40.FDOS = c.FDOS
                       and  opdx40.TDOS = c.TDOS  
                       and   opdx40.cpt = c.cpt
                        and  opdx40.line = 40 
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

---Final ouput has the DX codes in the correct format 41-80 dx codes.  Just add these to the first 40 dx codes excel sheet and I sort my ref# to review

with cohert as(
select distinct 'DTL' "Segment Type",
--"Tax ID1",
opdx.REF# "REF#",
pat_last_name,
pat_first_name,
"MI",
DOB,--  'D-M-YYYY','YYYYMMDD'),
"Plan ID- need either member ID or MBI/HIC",
--member_id_check "member_id_check",
"RETRIEVAL_NPI",
GENDER "Gender",
"Member Medicare STATE CODE",
case when length("MBI- need either member ID or HIC") <> 11 then ''
when "MBI- need either member ID or HIC" ='00000000000' then ''
when "MBI- need either member ID or HIC" ='99999999999' then ''
else "MBI- need either member ID or HIC" 
end as "MBI- need either member ID or HIC",
opdx.FDOS "FDOS",
opdx.TDOS "TDOS",
cast(null as number) "BILL TYPE- Institutional Only",
"NU INDICATOR",
"PROV ID",
NPI "NPI",
'P' "Prov_Type",
' ' "Facilty Name",
PROV_LAST_NAME,
PROV_FIRST_NAME,
CMS_Specialty_Type "CMS_Specialty_Type",
"Tax ID",                                          
opdx."CPT",
"Rev Code",
"Service Detail DOS From",
"Service Detail DOS Thru",
POS "POS",
'0' "ICD INDIC",
 "Risk_Assessment_Code",
"Chart Barcode -A/N (100)",
"Chart Encounter Key",
"Chart DX Key",
"Contract ID",
"Member Street Address",
"member Address 2",
"Member City",
"Member State",
"Member Zip Code",
"CLAIMID PCN"
 from
 UHC_OP_DX_query opdx
 join UHC_main_query main on main.ref# = opdx.ref#
--join v_arpb_coding_dx vdx on txi.tx_id = vdx.tx_id
--JOIN HSP_ACCOUNT HA ON inv.visit_number = HA.HSP_ACCOUNT_ID

 where 1=1
 --and opdx.ref# = 'PSL1331481061'
 and opdx.line > 40
--and opdx.ref# = 'PSL1331916171'--in ('PSL1323303760','PSL1331481061')
) 
select distinct c.*,
opdx41.dx as dx_1,
opdx42.dx as dx_2,
opdx43.dx as dx_3,
opdx44.dx as dx_4,
opdx45.dx as dx_5,
opdx46.dx as dx_6,
opdx47.dx as dx_7,
opdx48.dx as dx_8,
opdx49.dx as dx_9,
opdx50.dx as dx_10,
opdx51.dx as dx_11,
opdx52.dx as dx_12,
opdx53.dx as dx_13,
opdx54.dx as dx_14,
opdx55.dx as dx_15,
opdx56.dx as dx_16,
opdx57.dx as dx_17,
opdx58.dx as dx_18,
opdx59.dx as dx_19,
opdx60.dx as dx_20,
opdx61.dx as dx_21,
opdx62.dx as dx_22,
opdx63.dx as dx_23,
opdx64.dx as dx_24,
opdx65.dx as dx_25,
opdx66.dx as dx_26,
opdx67.dx as dx_27,
opdx68.dx as dx_28,
opdx69.dx as dx_29,
opdx70.dx as dx_30,
opdx71.dx as dx_31,
opdx72.dx as dx_32,
opdx73.dx as dx_33,
opdx74.dx as dx_34,
opdx75.dx as dx_35,
opdx76.dx as dx_36,
opdx77.dx as dx_37,
opdx78.dx as dx_38,
opdx79.dx as dx_39,
opdx80.dx as dx_40
      from cohert c
  left join UHC_OP_DX_query opdx41 on opdx41.ref# = c.ref#      
                       and opdx41.FDOS = c.FDOS
                       and  opdx41.TDOS = c.TDOS  
                       and   opdx41.cpt = c.cpt
                        and  opdx41.line = 41                   
   left join UHC_OP_DX_query opdx42 on opdx42.ref# = c.ref#      
                       and opdx42.FDOS = c.FDOS
                       and  opdx42.TDOS = c.TDOS  
                       and   opdx42.cpt = c.cpt
                        and  opdx42.line = 42                                     
   left join UHC_OP_DX_query opdx43 on opdx43.ref# = c.ref#      
                       and opdx43.FDOS = c.FDOS
                       and  opdx43.TDOS = c.TDOS  
                       and   opdx43.cpt = c.cpt
                        and  opdx43.line = 43   
    left join UHC_OP_DX_query opdx44 on opdx44.ref# = c.ref#      
                       and opdx44.FDOS = c.FDOS
                       and  opdx44.TDOS = c.TDOS  
                       and   opdx44.cpt = c.cpt
                        and  opdx44.line = 44   
   left join UHC_OP_DX_query opdx45 on opdx45.ref# = c.ref#      
                       and opdx45.FDOS = c.FDOS
                       and  opdx45.TDOS = c.TDOS  
                       and   opdx45.cpt = c.cpt
                        and  opdx45.line = 45   
   left join UHC_OP_DX_query opdx46 on opdx46.ref# = c.ref#      
                       and opdx46.FDOS = c.FDOS
                       and  opdx46.TDOS = c.TDOS  
                       and   opdx46.cpt = c.cpt
                        and  opdx46.line = 46   
   left join UHC_OP_DX_query opdx47 on opdx47.ref# = c.ref#      
                       and opdx47.FDOS = c.FDOS
                       and  opdx47.TDOS = c.TDOS  
                       and   opdx47.cpt = c.cpt
                        and  opdx47.line = 47   
   left join UHC_OP_DX_query opdx48 on opdx48.ref# = c.ref#      
                       and opdx48.FDOS = c.FDOS
                       and  opdx48.TDOS = c.TDOS  
                       and   opdx48.cpt = c.cpt
                        and  opdx48.line = 48   
   left join UHC_OP_DX_query opdx49 on opdx49.ref# = c.ref#      
                       and opdx49.FDOS = c.FDOS
                       and  opdx49.TDOS = c.TDOS  
                       and   opdx49.cpt = c.cpt
                        and  opdx49.line = 49   
   left join UHC_OP_DX_query opdx50 on opdx50.ref# = c.ref#      
                       and opdx50.FDOS = c.FDOS
                       and  opdx50.TDOS = c.TDOS  
                       and   opdx50.cpt = c.cpt
                        and  opdx50.line = 50   
   left join UHC_OP_DX_query opdx51 on opdx51.ref# = c.ref#      
                       and opdx51.FDOS = c.FDOS
                       and  opdx51.TDOS = c.TDOS  
                       and   opdx51.cpt = c.cpt
                        and  opdx51.line = 51   
   left join UHC_OP_DX_query opdx52 on opdx52.ref# = c.ref#      
                       and opdx52.FDOS = c.FDOS
                       and  opdx52.TDOS = c.TDOS  
                       and   opdx52.cpt = c.cpt
                        and  opdx52.line = 52   
   left join UHC_OP_DX_query opdx53 on opdx53.ref# = c.ref#      
                       and opdx53.FDOS = c.FDOS
                       and  opdx53.TDOS = c.TDOS  
                       and   opdx53.cpt = c.cpt
                        and  opdx53.line = 53   
   left join UHC_OP_DX_query opdx54 on opdx54.ref# = c.ref#      
                       and opdx54.FDOS = c.FDOS
                       and  opdx54.TDOS = c.TDOS  
                       and   opdx54.cpt = c.cpt
                        and  opdx54.line = 54   
   left join UHC_OP_DX_query opdx55 on opdx55.ref# = c.ref#      
                       and opdx55.FDOS = c.FDOS
                       and  opdx55.TDOS = c.TDOS  
                       and   opdx55.cpt = c.cpt
                        and  opdx55.line = 55   
   left join UHC_OP_DX_query opdx56 on opdx56.ref# = c.ref#      
                       and opdx56.FDOS = c.FDOS
                       and  opdx56.TDOS = c.TDOS  
                       and   opdx56.cpt = c.cpt
                        and  opdx56.line = 56   
   left join UHC_OP_DX_query opdx57 on opdx57.ref# = c.ref#      
                       and opdx57.FDOS = c.FDOS
                       and  opdx57.TDOS = c.TDOS  
                       and   opdx57.cpt = c.cpt
                        and  opdx57.line = 57   
   left join UHC_OP_DX_query opdx58 on opdx58.ref# = c.ref#      
                       and opdx58.FDOS = c.FDOS
                       and  opdx58.TDOS = c.TDOS  
                       and   opdx58.cpt = c.cpt
                        and  opdx58.line = 58   
   left join UHC_OP_DX_query opdx59 on opdx59.ref# = c.ref#      
                       and opdx59.FDOS = c.FDOS
                       and  opdx59.TDOS = c.TDOS  
                       and   opdx59.cpt = c.cpt
                        and  opdx59.line = 59   
   left join UHC_OP_DX_query opdx60 on opdx60.ref# = c.ref#      
                       and opdx60.FDOS = c.FDOS
                       and  opdx60.TDOS = c.TDOS  
                       and   opdx60.cpt = c.cpt
                        and  opdx60.line = 60   
   left join UHC_OP_DX_query opdx61 on opdx61.ref# = c.ref#      
                       and opdx61.FDOS = c.FDOS
                       and  opdx61.TDOS = c.TDOS  
                       and   opdx61.cpt = c.cpt
                        and  opdx61.line = 61   
   left join UHC_OP_DX_query opdx62 on opdx62.ref# = c.ref#      
                       and opdx62.FDOS = c.FDOS
                       and  opdx62.TDOS = c.TDOS  
                       and   opdx62.cpt = c.cpt
                        and  opdx62.line = 62   
   left join UHC_OP_DX_query opdx63 on opdx63.ref# = c.ref#      
                       and opdx63.FDOS = c.FDOS
                       and  opdx63.TDOS = c.TDOS  
                       and   opdx63.cpt = c.cpt
                        and  opdx63.line = 63   
   left join UHC_OP_DX_query opdx64 on opdx64.ref# = c.ref#      
                       and opdx64.FDOS = c.FDOS
                       and  opdx64.TDOS = c.TDOS  
                       and   opdx64.cpt = c.cpt
                        and  opdx64.line = 64   
   left join UHC_OP_DX_query opdx65 on opdx65.ref# = c.ref#      
                       and opdx65.FDOS = c.FDOS
                       and  opdx65.TDOS = c.TDOS  
                       and   opdx65.cpt = c.cpt
                        and  opdx65.line = 65  
     left join UHC_OP_DX_query opdx66 on opdx66.ref# = c.ref#      
                       and opdx66.FDOS = c.FDOS
                       and  opdx66.TDOS = c.TDOS  
                       and   opdx66.cpt = c.cpt
                        and  opdx66.line = 66 
   left join UHC_OP_DX_query opdx67 on opdx67.ref# = c.ref#      
                       and opdx67.FDOS = c.FDOS
                       and  opdx67.TDOS = c.TDOS  
                       and   opdx67.cpt = c.cpt
                        and  opdx67.line = 67   
   left join UHC_OP_DX_query opdx68 on opdx68.ref# = c.ref#      
                       and opdx68.FDOS = c.FDOS
                       and  opdx68.TDOS = c.TDOS  
                       and   opdx68.cpt = c.cpt
                        and  opdx68.line = 68   
   left join UHC_OP_DX_query opdx69 on opdx69.ref# = c.ref#      
                       and opdx69.FDOS = c.FDOS
                       and  opdx69.TDOS = c.TDOS  
                       and   opdx69.cpt = c.cpt
                        and  opdx69.line = 69   
   left join UHC_OP_DX_query opdx70 on opdx70.ref# = c.ref#      
                       and opdx70.FDOS = c.FDOS
                       and  opdx70.TDOS = c.TDOS  
                       and   opdx70.cpt = c.cpt
                        and  opdx70.line = 70   
   left join UHC_OP_DX_query opdx71 on opdx71.ref# = c.ref#      
                       and opdx71.FDOS = c.FDOS
                       and  opdx71.TDOS = c.TDOS  
                       and   opdx71.cpt = c.cpt
                        and  opdx71.line = 71   
   left join UHC_OP_DX_query opdx72 on opdx72.ref# = c.ref#      
                       and opdx72.FDOS = c.FDOS
                       and  opdx72.TDOS = c.TDOS  
                       and   opdx72.cpt = c.cpt
                        and  opdx72.line = 72   
   left join UHC_OP_DX_query opdx73 on opdx73.ref# = c.ref#      
                       and opdx73.FDOS = c.FDOS
                       and  opdx73.TDOS = c.TDOS  
                       and   opdx73.cpt = c.cpt
                        and  opdx73.line = 73   
   left join UHC_OP_DX_query opdx74 on opdx74.ref# = c.ref#      
                       and opdx74.FDOS = c.FDOS
                       and  opdx74.TDOS = c.TDOS  
                       and   opdx74.cpt = c.cpt
                        and  opdx74.line = 74   
   left join UHC_OP_DX_query opdx75 on opdx75.ref# = c.ref#      
                       and opdx75.FDOS = c.FDOS
                       and  opdx75.TDOS = c.TDOS  
                       and   opdx75.cpt = c.cpt
                        and  opdx75.line = 75  
 left join UHC_OP_DX_query opdx76 on opdx76.ref# = c.ref#      
                       and opdx76.FDOS = c.FDOS
                       and  opdx76.TDOS = c.TDOS  
                       and   opdx76.cpt = c.cpt
                        and  opdx76.line = 76   
 left join UHC_OP_DX_query opdx77 on opdx77.ref# = c.ref#      
                       and opdx77.FDOS = c.FDOS
                       and  opdx77.TDOS = c.TDOS  
                       and   opdx77.cpt = c.cpt
                        and  opdx77.line = 77   
 left join UHC_OP_DX_query opdx78 on opdx78.ref# = c.ref#      
                       and opdx78.FDOS = c.FDOS
                       and  opdx78.TDOS = c.TDOS  
                       and   opdx78.cpt = c.cpt
                        and  opdx78.line = 78   
 left join UHC_OP_DX_query opdx79 on opdx79.ref# = c.ref#      
                       and opdx79.FDOS = c.FDOS
                       and  opdx79.TDOS = c.TDOS  
                       and   opdx79.cpt = c.cpt
                        and  opdx79.line = 79   
 left join UHC_OP_DX_query opdx80 on opdx80.ref# = c.ref#      
                       and opdx80.FDOS = c.FDOS
                       and  opdx80.TDOS = c.TDOS  
                       and   opdx80.cpt = c.cpt
                        and  opdx80.line = 80 